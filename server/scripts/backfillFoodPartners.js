require('dotenv').config();
const mongoose = require('mongoose');
const foodModel = require('../src/models/food.model');
const foodPartnerModel = require('../src/models/foodpartner.model');

async function main() {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('MONGODB_URI not set in .env');
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for backfill');

  try {
    const foods = await foodModel.find({}).lean();
    let updated = 0;

    for (const f of foods) {
      if (f.foodPartner) continue; // already set

      const restaurantName = f.restaurantName || (f.foodPartner && f.foodPartner.restaurantName);
      if (!restaurantName) continue;

      // try to find a partner with same restaurantName (case-insensitive)
      const partner = await foodPartnerModel.findOne({
        restaurantName: { $regex: new RegExp(`^${restaurantName}$`, 'i') }
      });

      if (partner) {
        await foodModel.updateOne({ _id: f._id }, { $set: { foodPartner: partner._id } });
        updated++;
        console.log(`Updated food ${f._id} -> partner ${partner._id} (${partner.restaurantName})`);
      }
    }

    console.log(`Backfill complete. ${updated} documents updated.`);
  } catch (err) {
    console.error('Backfill error', err);
  } finally {
    mongoose.disconnect();
  }
}

main();
