import paymentService from "@/services/payment"
import { NextResponse } from "next/server"

import path from "path"
import { writeFile, readFile } from "fs/promises"

const ordersPath = path.join(process.cwd(), "data", "orders.json")

export async function POST(req) {
    try {
        const {amount, descr} = await req.json()
        if (!amount || amount<=0) return NextResponse.json({message: "invalid amount"}, {status: 400})

        const data = paymentService.generatePaymentLink(amount, descr)
        const exOrders = await getOrders()

        exOrders.push({amount, orderId: data.order_id, status: "pending"})
        
        await saveOrders(exOrders)

        return NextResponse.json({
            ...data
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: error.message}, {status: 500})
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