const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

const products = [
  {
  
    title: "Passenger Elevators",
    description: "Yatra's Passenger Elevators are contemplatively designed to provide serene, calm and most significant vertical mobility in a diverse architectural environment to deliver smooth, safe, and energy efficient vertical mobility for residential and commercial buildings alike. Established with user attractive design, stylistic appeal, appearance standards and we envisioned the  long term journey carried in our minds.",
    features: [
      "Advanced technology integration",
      "Noise-optimized systems",
      "Customizable cabin finishes",
      "Safety protocols",
      "Hygiene standards",
      "Streamlined interiors"
    ],
    image: "src/assets/Passenger Elevators.png",
    link: "/passenger-elevators",
  
  },
  {
    
    title: "Home/Residential Elevators",
    description: "Yatra's Elevators promote jubilant, elegant and enhancing incredible environments into your residence. These are fabricated with cutting-edge technology and modern stylish appearance versatility, these elevators smoothly get adjusted  into villas, duplexes and multi story residences. Yatra's offerings are capacity monitoring, high tech mobility solutions, backup system, and pathogen resistance.",
    features: [
      "Capacity monitoring",
      "High tech mobility solutions",
      "Backup system",
      "Pathogen resistance",
      "Compact design",
      "Cutting-edge technology"
    ],
    image: "src/assets/Residential Elevators.png",
    link: "/home-elevators",
    
  },
  {
    
    title: "Hospital/Bed Elevators",
    description: "Yatra’s Hospital/Bed Elevators Instituted with quiet, controlled acoustic environments, structural integrity, and advanced medical equipment and accommodations that prioritizes patient convenience and safety and security. Designed with meticulous determination to patient needs, these elevators provide whisper-quiet operation and exceptional stability rather than insecure mobility, enabling that every journey is as cozy and assuring as possible for patients and their families.",
    features: [
      "Whisper-quiet operation",
      "Emergency power bank",
      "Touchless control systems",
      "Medical equipment compatibility",
      "Enhanced hygiene protocols",
      "Customisable for users"
    ],
    image: "src/assets/Bed Elevators.png",
    link: "/hospital-elevators",
    
  },
  {

    title: "Freight and services",
    description: "Yatra’s Freight and Service Elevators are designed for maximum potential, solidity and firmness, and flawless performance in rigorous environments. Specifically engineered for heavy-duty commercial use, these elevators cope with substantial loads, bulky advanced equipment, and meticulously prolonged operation, significant for motels, warehouses, hotels, hospitals, astonishing balcony residences, shopping centres, and professional architectures buildings where performance and reliability are essential",
    features: [
      "Designed for maximum potential",
      "Advanced safety operations",
      "Energy effective capability",
      "enable magnanimous vertical transport ",
      "Fortified cabins",
      "Advanced equipment"
    ],
    image: "src/assets/Service Elevators.png",
    link: "/freight-elevators",
  
  },
  {
   
    title: "Capsule Elevators (Panoramic)",
    description: "Yatra's Capsule Elevators are a meritorious blend of scintillating and elegance, constructed to elevate both momentum and across all architectural beauty. Significant for advanced residential high-towers, premiere hotels, malls, and commercial areas, these comprehensive elevators put forward a 360-degree angle bird-eye view, accelerating the visual experience for passengers and people while appreciating the architectural beauty",
    features: [
      "360-degree panoramic views",
      "Advanced safety operations",
      "Energy effective capability",
      "Architectural integration",
      "Visual experience enhancement",
      "Advanced equipment"
    ],
    image: "src/assets/Capsule Elevators (Panoramic).png",
    link: "/glass-elevators",
    
  },
  {
    
    title: "MRL Elevators",
    description: "Yatra’s Machine-Room Less (MRL) Elevators are developed with advanced, sophisticated infrastructure where the space consumption is minimized. Designed in such a way that without the necessity of a traditional mechanical room, these elevators provide strong installation, reduced consumption. ",
    features: [
      "Sophisticated infrastructure ",
      "Strong installation",
      "Reduced consumption",
      "Enhanced architectural flexibility",
      "Facilitating control systems",
      "Advanced technology"
    ],
    image: "src/assets/Machine-Room Less (MRL) Elevators.png",
    link: "/mrl",
  
  },
  {
    
    title: "Hydraulic Elevators",
    description: "Yatra’s Hydraulic Elevators are developed for positioning them as the perfect choice of residence with uncluttered and expansive optimisation. These are engineered with perfect energy optimisation and compact home space area. Safety and Impenetrable security , tamper-proof protection, uncompromisable protection which is absolutely Suitable for residential complexes, building, and business properties.",
    features: [
      "Developed for positioning",
      "Uncluttered and expansive optimisation",
      "Safety and Impenetrable security ",
      "Tamper-proof protection",
      "Uncompromisable protection ",
      "Advanced technology"
    ],
    image: "src/assets/Hydraulic Elevators.png",
    link: "/hydraulic",
    
  },
  {
    
    title: "Commercial Escalators",
    description: "Yatra’s Commercial Escalators designed for people and users where those deal with high Standards visuals and uncompromisable Security Systems. Developed for malls, office complexes, convention centres, and public spaces, our elevators and escalators",
    features: [
      "High Standards visuals ",
      "Uncompromisable Security Systems",
      "Safety and Impenetrable security ",
      "Durability and lift mobility",
      "Advanced Sensors ",
      "Customizable  finishes"
    ],
    image: "src/assets/Commercial Escalators.png",
    link: "/commercial",
    
  },
  {
    
    title: "Public Transport Escalators",
    description: "yatra’s public transport Escalators are reliable, moreover, It has high energy efficient resources to strive for innovation, with customizable speed ranges (up to 2.5 m/s), intelligent door operation, and superior leveling accuracy developed for malls, office complexes, convention centres, and public spaces.",
    features: [
      "Heavy passenger load handling",
      "Energy-efficient drives",
      "Anti-slip steps and safety features",
      "Low-noise operation",
      "Durable construction",
      "Continuous duty design"
    ],
    image: "src/assets/Public Transport Escalators.png",
    link: "/public-transport-escalators",
   
  },
  {
    
    title: "Moving Walk Way Escalators",
    description: "Yatra’s Travelators, which are also known as moving walkways, are created to provide perfect horizontal transportation across large spaces such as airports, malls, transit hubs, and exhibition centers. Designed with user friendly and safety in mind, these systems offer smooth and energy-efficient movement for pedestrians, luggage carts, and trolleys, reducing walking stress and improving traffic flow",
    features: [
      "Transportation across large spaces ",
      "Designed with user friendly ",
      "Conglomerate strength",
      "Cutting-edge technology ",
      "Sleek aesthetics",
      "Comfortable and futuristic"
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
