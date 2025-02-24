const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// function to connect to database

const connectDb = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("Database connection established ✅");
  } catch (error) {
    console.log("Database connection error", error);
  }
};

const UserSchema = new Schema({
  _id: { type: ObjectId },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
});

const AdminSchema = new Schema({
  _id: { type: ObjectId },
  email: { type: String, unique: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
});

const CourseSchema = new Schema({
  _id: { typ: ObjectId },
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  imageUrl: { type: String },
  creatorId: { type: ObjectId },
});

const PurchaseSchema = new Schema({
  _id: { type: ObjectId },
  courseId: { type: ObjectId },
  userId: { type: ObjectId },
});

const userModel = mongoose.model("user", UserSchema);
const adminModel = mongoose.model("admin", AdminSchema);
const courseModel = mongoose.model("course", CourseSchema);
const purchaseModel = mongoose.model("purchase", PurchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
  connectDb,
};
