const PartnerApplication = require("../models/PartnerApplication");

exports.createApplication = async (req, res, next) => {
  try {
    const application = new PartnerApplication(req.body);
    await application.save();
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getAllApplications = async (req, res, next) => {
  try {
    const applications = await PartnerApplication.find().sort({
      createdAt: -1,
    });
    res.json(applications);
  } catch (err) {
    next(err);
  }
};

exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await PartnerApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (err) {
    next(err);
  }
};

exports.deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    const application = await PartnerApplication.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    next(err);
  }
};
