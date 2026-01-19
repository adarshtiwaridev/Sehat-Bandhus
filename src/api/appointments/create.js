import connectDB from "@/lib/dbConnect";
import Appointment from "@/models/Appointment";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

    await connectDB();
    const data = req.body || {};

    // Basic required-field checks before attempting to create the document
    const required = ['patientName', 'patientAge', 'patientGender', 'appointmentDay', 'appointmentDate', 'appointmentTimeSlot'];
    const missing = required.filter((k) => !data[k]);
    if (missing.length) return res.status(400).json({ success: false, error: `Missing required fields: ${missing.join(', ')}` });

    // Normalize appointmentDate: accept yyyy-mm-dd (ISO) or dd/mm/yyyy and convert to dd/mm/yyyy
    let date = data.appointmentDate;
    // If ISO format (2025-10-19), convert to dd/mm/yyyy
    const isoMatch = /^\d{4}-\d{2}-\d{2}$/.test(date);
    if (isoMatch) {
        const [y, m, d] = date.split('-');
        date = `${d}/${m}/${y}`;
    }
    // basic dd/mm/yyyy validation
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
        return res.status(400).json({ success: false, error: 'appointmentDate must be in dd/mm/yyyy or yyyy-mm-dd format' });
    }

    // Ensure appointmentTimeSlot is one of allowed slots (optional extra validation)
    const allowedSlots = Appointment.TIME_SLOTS || Appointment.schema?.paths?.appointmentTimeSlot?.enumValues || [];
    if (allowedSlots.length && !allowedSlots.includes(data.appointmentTimeSlot)) {
        return res.status(400).json({ success: false, error: `Invalid appointmentTimeSlot. Allowed values: ${allowedSlots.join(', ')}` });
    }

    // Build document data with normalized date
    const doc = { ...data, appointmentDate: date };

    try {
        const appointment = await Appointment.create(doc);
        res.status(201).json({ success: true, appointment });
    } catch (error) {
        console.error(error);
        // If Mongoose validation error, return details to client
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).map(k => ({ field: k, message: error.errors[k].message }));
            return res.status(400).json({ success: false, error: error.message, errors });
        }
        res.status(500).json({ success: false, error: error.message });
    }
}
