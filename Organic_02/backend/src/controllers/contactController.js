const Contact = require('../models/Contact');

const submitContactMessage = async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'name, email and message are required' });
    }

    const contact = await Contact.create({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      subject: subject != null ? String(subject).trim() : '',
      message: String(message).trim(),
    });

    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitContactMessage };