const connectDB = require("../config/db");
const User = require("../models/User");

const seed = async () => {
  await connectDB();

  const mobileNumber = "+919999999999";
  const user = await User.findOneAndUpdate(
    { mobileNumber },
    {
      name: "Demo User",
      mobileNumber,
      email: "demo@burger.local",
      profileImage: "",
      isVerified: true,
      lastLogin: new Date(),
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  console.log("Seeded user:", user.toJSON());
  process.exit(0);
};

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
