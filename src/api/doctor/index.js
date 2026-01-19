import { connect } from '../../lib/mongoose';

export default async function handler(req, res) {
  const { method } = req;

  try {
    await connect();
    if (method === 'GET') {
      const doctors = await Doctor.find().lean().sort({ createdAt: -1 }).exec();
      return res.status(200).json({ success: true, data: doctors });
    }

    if (method === 'POST') {
      const { name, email, phone, specialization, experience } = req.body;
      if (!name || !email || !phone || !specialization) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }
      const doc = new Doctor({ name, email, phone, specialization, experience });
      await doc.save();
      return res.status(201).json({ success: true, data: doc });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (err) {
    console.error('API /api/doctor error', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
