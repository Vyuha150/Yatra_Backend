const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

const products = [
  {
    title: "Home Elevators",
    description:
      "Whether it's for receiving guests or day-to-day accessibility, our premium home elevators allow you to move between floors within your residence with ease and comfort.",
    features: [
      "Compact Design",
      "Energy Efficient",
      "Silent Operation",
      "Custom Interiors",
    ],
    image: "/cabin5.jpeg",
    link: "/home-elevators",
  },
  {
    title: "Capsule Elevators",
    description:
      "Transparent glass elevators that offer scenic views while ensuring safety and reliability. Perfect for hotels, malls, and premium residential buildings.",
    features: [
      "360° Views",
      "Weather Resistant",
      "LED Lighting",
      "Premium Finish",
    ],
    image: "/cabin4.jpeg",
    link: "/glass-elevators",
  },
  {
    title: "Hospital Elevators",
    description:
      "Specially designed for medical facilities with stretcher compatibility, smooth operation, and infection control features for patient safety.",
    features: [
      "Stretcher Compatible",
      "Infection Control",
      "Emergency Backup",
      "Silent Operation",
    ],
    image: "/WhatsApp Image 2025-08-19 at 11.00.21 AM.jpeg",
    link: "/hospital-elevators",
  },
  {
    title: "Passenger Elevators",
    description:
      "Modern and comfortable passenger elevators built for residential and commercial spaces, ensuring smooth travel and enhanced safety.",
    features: [
      "Smooth Ride Experience",
      "Energy Efficient",
      "Advanced Safety Features",
      "Stylish Cabin Designs",
    ],
    image: "/WhatsApp Image 2025-08-19 at 10.59.55 AM.jpeg",
    link: "/passenger-elevators",
  },
  {
    title: "Escalators",
    description:
      "Modern escalator systems for shopping malls, airports, and commercial complexes with advanced safety features.",
    features: [
      "Smart Controls",
      "Energy Saving",
      "Safety Sensors",
      "Weather Protection",
    ],
    image: "src/assets/Public Transport Escalators.png",
    link: "/public-transport-escalators",
  },
  {
    title: "Moving Walkways",
    description:
      "Reliable moving walkways designed for airports, shopping centers, and large public spaces to ensure smooth passenger flow and convenience.",
    features: [
      "Heavy-Duty Design",
      "Energy Efficient",
      "Smooth Ride",
      "Low Maintenance",
    ],
    image: "src/assets/Moving Walkways.png",
    link: "/moving-walkways-escalators",
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Products seeded!");
  mongoose.disconnect();
}

seed();
