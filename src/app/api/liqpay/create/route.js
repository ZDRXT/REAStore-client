import paymentService from "@/services/payment"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const {amount, descr} = await req.json()
        if (!amount || amount<=0) return NextResponse.json({message: "invalid amount"}, {status: 400})

        const data = paymentService.generatePaymentLink(amount, descr)

        return NextResponse.json({
            ...data
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: error.message}, {status: 500})
    }
}