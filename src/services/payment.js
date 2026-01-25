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
        const statusData = {
            version: this.version,
            public_key: this.public_key,
            action: 'status',
            order_id: order_id,
        }

        const {signature, data} = this._generateSignature(statusData)
        const url = `${this.url}request`
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({data, signature})
        })
        if (!res.ok) throw new Error(`liqpay error: ${res.statusText}`)
        const resData = await res.json()

        return {
            status: resData.status,
            payment_id: resData.payment_id,
            amount: resData.amount
        }
    }
}

const paymentService = new Payment()

export default paymentService