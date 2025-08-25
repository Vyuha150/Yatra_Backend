const ServiceRequest = require("../models/ServiceRequest");

exports.createRequest = async (req, res, next) => {
  try {
    const request = new ServiceRequest(req.body);
    await request.save();
    res.status(201).json({ message: "Service request submitted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getAllRequests = async (req, res, next) => {
  try {
    const requests = await ServiceRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    next(err);
  }
};

exports.updateRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await ServiceRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Service request not found" });
    }

    res.json(request);
  } catch (err) {
    next(err);
  }
};

exports.deleteRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const request = await ServiceRequest.findByIdAndDelete(id);

    if (!request) {
      return res.status(404).json({ message: "Service request not found" });
    }

    res.json({ message: "Service request deleted successfully" });
  } catch (err) {
    next(err);
  }
};
