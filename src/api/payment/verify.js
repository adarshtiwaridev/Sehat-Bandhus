import crypto from "crypto";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest === req.headers["x-razorpay-signature"]) {
        console.log("Webhook verified:", req.body);
        // You can update appointment status in DB here
        return res.status(200).json({ success: true });
    } else {
        return res.status(400).json({ success: false, message: "Invalid signature" });
    }
}
