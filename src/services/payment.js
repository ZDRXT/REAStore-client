import crypto from "crypto"

class Payment {
    constructor() {
        this.url = "https://www.liqpay.ua/api/"
        this.result_url = "http://localhost:3000/"
        this.public_key = process.env.LIQPAY_PUBLIC
        this.private_key = process.env.LIQPAY_PRIVATE
        this.version = 3
    }

    _generateSignature(entryData) {
        const json = JSON.stringify(entryData)
        const data = Buffer.from(json).toString('base64');
        const signString = this.private_key + data + this.private_key;
        const signature = crypto
            .createHash('sha1')
            .update(signString)
            .digest('base64');
        return {signature, data}
    }

    generatePaymentLink(amount, descr) {
        const order_id = `order_${Date.now()}_${Math.floor(Math.random() * 100000)}`

        const paymentData = {
            version: this.version,
            public_key: this.public_key,
            action: 'pay',
            amount: amount,
            currency: 'UAH',
            description: descr,
            order_id: order_id,
            result_url: this.result_url
        }

        const {signature, data} = this._generateSignature(paymentData)
        
        const directUrl = `${this.url}3/checkout?data=${encodeURIComponent(data)}&signature=${encodeURIComponent(signature)}`;

        return {
            directUrl,
            order_id,
            paymentData
        }
    }

    async getPaymentStatus(order_id) {
        try {
            console.log("=== LiqPay getPaymentStatus START ===")
            console.log("order_id:", order_id)
    
            const statusData = {
                version: this.version,
                public_key: this.public_key,
                action: 'status',
                order_id: order_id,
            }
    
            console.log("statusData:", statusData)
    
            const { signature, data } = this._generateSignature(statusData)
    
            console.log("generated data:", data)
            console.log("generated signature:", signature)
    
            const url = `${this.url}request`
            console.log("LiqPay URL:", url)
    
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({ data, signature })
            })
    
            console.log("HTTP status:", res.status, res.statusText)
    
            if (!res.ok) {
                const errText = await res.text()
                console.log("❌ LiqPay error body:", errText)
                throw new Error(`liqpay error: ${res.statusText}`)
            }
    
            const resData = await res.json()
            console.log("Raw LiqPay response:", resData)
    
            const result = {
                status: resData.status,
                order_id: resData.order_id,
                amount: resData.amount
            }
    
            console.log("Mapped result:", result)
            console.log("=== LiqPay getPaymentStatus END ===")
    
            return result
        } catch (error) {
            console.log("🔥 GetPaymentStatus ERROR")
            console.log(error)
            throw error
        }
    }    
}

const paymentService = new Payment()

export default paymentService