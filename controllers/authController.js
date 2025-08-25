const User = require("../models/User");
const jwt = require("jsonwebtoken");
const emailService = require("../services/emailService");

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phone, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      role,
    });
    const otp = user.generateEmailVerificationOTP();
    await user.save();
    // Send OTP via email
    await emailService.sendEmail({
      to: user.email,
      subject: "Yatra Email Verification OTP",
      text: `Your OTP for email verification is: ${otp}`,
      html: `<p>Your OTP for email verification is: <b>${otp}</b></p>`,
    });
    res
      .status(201)
      .json({ message: "User registered. Please verify your email." });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (!user.isEmailVerified) {
      return res.status(403).json({ error: "Email not verified" });
    }
    const token = user.generateAuthToken();
    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.verifyEmailOTP(otp)) {
      user.clearEmailVerificationOTP();
      await user.save();
      return res.json({ message: "Email verified successfully" });
    }
    res.status(400).json({ error: "Invalid or expired OTP" });
  } catch (err) {
    next(err);
  }
};

exports.resendEmailOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const otp = user.generateEmailVerificationOTP();
    await user.save();
    // Send OTP via email
    await emailService.sendEmail({
      to: user.email,
      subject: "Yatra Email Verification OTP",
      text: `Your OTP for email verification is: ${otp}`,
      html: `<p>Your OTP for email verification is: <b>${otp}</b></p>`,
    });
    res.json({ message: "OTP resent" });
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const otp = user.generatePasswordResetOTP();
    await user.save();
    // Send OTP via email
    await emailService.sendEmail({
      to: user.email,
      subject: "Yatra Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
      html: `<p>Your OTP for password reset is: <b>${otp}</b></p>`,
    });
    res.json({ message: "Password reset OTP sent" });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.verifyPasswordResetOTP(otp)) {
      user.password = newPassword;
      user.clearPasswordResetOTP();
      await user.save();
      return res.json({ message: "Password reset successful" });
    }
    res.status(400).json({ error: "Invalid or expired OTP" });
  } catch (err) {
    next(err);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updates = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Only allow updating certain fields
    user.firstName = updates.firstName ?? user.firstName;
    user.lastName = updates.lastName ?? user.lastName;
    user.phone = updates.phone ?? user.phone;
    if (updates.profile) {
      user.profile = {
        ...user.profile,
        ...updates.profile,
        address: {
          ...user.profile?.address,
          ...updates.profile.address,
        },
      };
    }
    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
};
