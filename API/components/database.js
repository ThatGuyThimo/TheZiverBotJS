import mongoose from 'mongoose';
const dbUri = process.env.DBURI

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  color: { type: String, required: true },
  transmission: { type: String, required: true },
  engine: { type: String, required: true },
  fuelType: { type: String, required: true },
  price: { type: String, required: true },
});

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Car = mongoose.model('Car', carSchema);
const Brand = mongoose.model('Brand', brandSchema);
const User = mongoose.model('User', userSchema);

dbConnect()

async function dbConnect() {
  await mongoose.connect(dbUri);
}

export {Car, Brand, User}