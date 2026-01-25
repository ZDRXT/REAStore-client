import paymentService from "@/services/payment"
import { NextResponse } from "next/server"
import emailService from "@/services/email"

import path from "path"
import { writeFile, readFile } from "fs/promises"

const ordersPath = path.join(process.cwd(), "data", "orders.json")

export async function POST(req) {
    try {
        const { orderId } = await req.json()
        if (!orderId) return NextResponse.json({ message: "invalid orderId" }, { status: 400 })

        const exOrders = await getOrders()
        const orderIndex = exOrders.findIndex(element => element.order_id === orderId)

        if (orderIndex === -1) return NextResponse.json({ message: "invalid exOrder" }, { status: 400 })
        const exOrder = exOrders[orderIndex]
        if (exOrder.status === "success") return NextResponse.json({ message: "success exOrder", status: "success", orderId })

        const orderData = await paymentService.getPaymentStatus(orderId)
        console.log(orderData)

        if (orderData.payment_id !== exOrder.payment_id) return NextResponse.json({ message: "invalid id" }, { status: 400 })
        if (orderData.status !== "success") return NextResponse.json({ message: "pending order" }, { status: 400 })
        if (orderData.amount !== exOrder.amount) return NextResponse.json({ message: "invalid amount" }, { status: 400 })

        exOrders.orderIndex.status = "success"

        await saveOrders(exOrders)
        return NextResponse.json({
            message: "success exOrder",
            status: "success",
            orderId
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

async function getOrders() {
    try {
        const data = await readFile(ordersPath)

        console.log(data)
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

async function saveOrders(orders) {
    await writeFile(ordersPath, JSON.stringify(orders, null, 2))
}