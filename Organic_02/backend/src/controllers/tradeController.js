const Trade = require('../models/Trade');
const { sendTradeRequestMail } = require('../utils/mailer');

const submitTradeRequest = async (req, res) => {
  try {
    const { name, email, contact, product, quantity, legalName, gst, message } = req.body;

    if (!name || !email || !contact || !product || quantity == null || !legalName || !gst) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const parsedQuantity = Number(quantity);
    if (!Number.isFinite(parsedQuantity) || parsedQuantity < 100) {
      return res.status(400).json({ message: 'Minimum quantity is 100 KGs' });
    }

    const cleanedMessage = String(message || '').trim();
    if (cleanedMessage.length > 200) {
      return res.status(400).json({ message: 'Message must be under 200 characters' });
    }

    const trade = await Trade.create({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      contact: String(contact).trim(),
      product: String(product).trim(),
      quantity: parsedQuantity,
      legalName: String(legalName).trim(),
      gst: String(gst).trim(),
      message: cleanedMessage,
    });

    const emailSent = await sendTradeRequestMail(trade).catch(() => false);
    return res.status(201).json({
      message: 'Trade request submitted successfully',
      trade,
      emailSent,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { submitTradeRequest };
