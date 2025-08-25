const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "super_admin", "showroom_employee", "bulk_buyer"],
    default: "user",
  },
  profile: {
    avatar: {
      type: String,
    },
    company: {
      type: String,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      pincode: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
        default: "India",
      },
    },
  },
  preferences: {
    notifications: {
      type: Boolean,
      default: true,
    },
    newsletter: {
      type: Boolean,
      default: true,
    },
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  emailVerificationOTP: {
    type: String,
  },
  emailVerificationExpires: {
    type: Date,
  },
  passwordResetOTP: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update timestamp on save
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET || "fallback-secret",
    { expiresIn: "24h" }
  );
};

// Generate OTP for email verification
userSchema.methods.generateEmailVerificationOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.emailVerificationOTP = otp;
  this.emailVerificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  return otp;
};

// Generate OTP for password reset
userSchema.methods.generatePasswordResetOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.passwordResetOTP = otp;
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  return otp;
};

// Verify email OTP
userSchema.methods.verifyEmailOTP = function (otp) {
  return (
    this.emailVerificationOTP === otp &&
    this.emailVerificationExpires > new Date()
  );
};

// Verify password reset OTP
userSchema.methods.verifyPasswordResetOTP = function (otp) {
  return (
    this.passwordResetOTP === otp && this.passwordResetExpires > new Date()
  );
};

// Clear email verification OTP
userSchema.methods.clearEmailVerificationOTP = function () {
  this.emailVerificationOTP = undefined;
  this.emailVerificationExpires = undefined;
  this.isEmailVerified = true;
};

// Clear password reset OTP
userSchema.methods.clearPasswordResetOTP = function () {
  this.passwordResetOTP = undefined;
  this.passwordResetExpires = undefined;
};

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are serialized
userSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.emailVerificationOTP;
    delete ret.emailVerificationExpires;
    delete ret.passwordResetOTP;
    delete ret.passwordResetExpires;
    return ret;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
