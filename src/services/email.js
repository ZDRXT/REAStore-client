class EmailService {
    constructor() {
        this.url = "https://api.brevo.com/v3/smtp/email"
        this.apiKey = process.env.BREVO_API_KEY || "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"
    }

    async sendEmail({ params, client, templateId }) {
        console.log({ params, client, templateId })
        try {
            const res = await fetch(this.url, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "api-key": this.apiKey
                },
                body: JSON.stringify({
                    "params": params,
                    "to": [ client ],
                    "templateId": templateId
                })
            })

            const data = await res.json()
            
            console.log(data, process.env.BREVO_API_KEY
            )

            if (!data.messageId) throw new Error ("Щось пішло не так... Зверніться у підтримку")
            
            return data
        } catch (error) {
            throw error
        }
    }
}

const emailService = new EmailService()

export default emailService