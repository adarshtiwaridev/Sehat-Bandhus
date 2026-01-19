import razorpay from "@/lib/razorpay";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

    const { amount, currency, receipt } = req.body;

    try {
        const options = {
            amount: amount * 100, // amount in paise
            currency: currency || "INR",
            receipt: receipt || `receipt_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
}
