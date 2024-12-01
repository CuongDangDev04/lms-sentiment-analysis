const Feedback = require("../models/feedback");

exports.createFeedback = async (req, res) => {
  try {
    const { personName, email, message } = req.body;
    if (!message || !personName) {
      return res
        .status(400)
        .json({ error: "Both personName and message are required." });
    }

    const feedback = await Feedback.create({ personName, email, message });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
exports.getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByPk(id);

    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
