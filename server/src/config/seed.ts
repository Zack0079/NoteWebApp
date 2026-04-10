import User from '../models/User.js';

export const seedDefaultData = async () => {
  try {
    const userCount = await User.countDocuments();

    if (userCount === 0) {
      console.log("No users found. Inserting default admin...");
      
      await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: "securepassword123", // In a real app, hash this first!
        role: "admin"
      });

      console.log("Default data seeded successfully.");
    } else {
      console.log("info: Database already has data. Skipping seed.");
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};