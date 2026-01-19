import { connect } from '../../lib/mongoose';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    await connect();

    if (method === 'GET') {
      const doc = await Doctor.findById(id).lean().exec();
      if (!doc) return res.status(404).json({ success: false, message: 'Doctor not found' });
      return res.status(200).json({ success: true, data: doc });
    }

    if (method === 'PUT') {
      const updates = req.body;
      const updated = await Doctor.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).exec();
      if (!updated) return res.status(404).json({ success: false, message: 'Doctor not found' });
      return res.status(200).json({ success: true, data: updated });
    }

    if (method === 'DELETE') {
      const deleted = await Doctor.findByIdAndDelete(id).exec();
      if (!deleted) return res.status(404).json({ success: false, message: 'Doctor not found' });
      return res.status(200).json({ success: true, data: deleted });
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (err) {
    console.error('API /api/doctor/[id] error', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
