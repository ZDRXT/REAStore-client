import paymentService from "@/services/payment"
import { NextResponse } from "next/server"
import emailService from "@/services/email"

import path from "path"
import { writeFile, readFile } from "fs/promises"

const ordersPath = path.join(process.cwd(), "data", "orders.json")

export async function POST(req) {
    try {
        console.log("=== /api/liqpay/check START ===")

        const body = await req.json()
        console.log("Request body:", body)

        const { orderId, emailData } = body
        console.log("route", emailData)
        if (!orderId) {
            console.log("❌ No orderId")
            return NextResponse.json({ message: "invalid orderId" }, { status: 400 })
        }

        const exOrders = await getOrders()
        console.log("Loaded orders:", exOrders.length)

        const orderIndex = exOrders.findIndex(e => e.orderId === orderId)
        console.log("Found orderIndex:", orderIndex)

        if (orderIndex === -1) {
            console.log("❌ Order not found:", orderId)
            return NextResponse.json({ message: "invalid exOrder" }, { status: 400 })
        }

        const exOrder = exOrders[orderIndex]
        console.log("Existing order:", exOrder)

        if (exOrder.status === "success") {
            console.log("⚠️ Order already success")
            return NextResponse.json({ message: "success exOrder", status: "success", orderId })
        }

        console.log("→ Requesting payment status from LiqPay...")
        let orderData = await paymentService.getPaymentStatus(orderId)

        console.log("Raw orderData:", orderData)
        console.log("orderData type:", typeof orderData)

        // якщо раптом LiqPay вернув string
        if (typeof orderData === "string") {
            try {
                const parsed = JSON.parse(orderData)
                console.log("Parsed orderData:", parsed)
                orderData = parsed
            } catch (e) {
                console.log("❌ Cannot parse orderData string")
            }
        }
        if (orderData.status === "error") {
            return NextResponse.json({ message: "order not found" }, { status: 400 })
        }

        console.log("Comparing fields:", orderData)
        console.log("payment_id:", orderData.order_id, "vs", exOrder.orderId)
        console.log("status:", orderData.status)
        console.log("amount:", orderData.amount, "vs", exOrder.amount)

        if (orderData.order_id !== exOrder.orderId) {
            console.log("❌ payment_id mismatch")
            return NextResponse.json({ message: "invalid id" }, { status: 400 })
        }

        if (orderData.status !== "success") {
            console.log("⏳ Payment not success yet:", orderData.status)
            return NextResponse.json({ message: "pending order" }, { status: 400 })
        }

        if (orderData.amount !== exOrder.amount) {
            console.log("❌ Amount mismatch")
            return NextResponse.json({ message: "invalid amount" }, { status: 400 })
        }

        console.log("✅ All checks passed, updating order status...")
        exOrders[orderIndex].status = "success"

        await saveOrders(exOrders)
        console.log("💾 Orders saved")

        console.log("=== /api/liqpay/check END SUCCESS ===")
        console.log(emailData)
        const emailRes = await emailService.sendEmail( emailData )
        console.log(emailRes)

        return NextResponse.json({
            message: "success exOrder",
            status: "success",
            orderId
        })

    } catch (error) {
        console.log("🔥 RouteCheck ERROR")
        console.log(error)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}


async function getOrders() {
    try {
        const data = await readFile(ordersPath, "utf-8")

        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

async function saveOrders(orders) {
    await writeFile(ordersPath, JSON.stringify(orders, null, 2))
}