import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import listEndpoints from "express-list-endpoints";

import dotenv from "dotenv";
import cloudinaryFramework from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = Promise;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const User = mongoose.model("User", UserSchema);
const RoleSchema = mongoose.Schema({
  description: String,
});

const Role = mongoose.model("Role", RoleSchema);

const Wardrobe = mongoose.model("Wardrobe", {
  name: String,
  imageUrl: String,
});

const port = process.env.PORT || 8080;
const app = express();

// -------------- MIDDLEWEARES ----------------------------

app.use(cors()); // here we can choose a specific domain
app.use(express.json());

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");

  try {
    const user = await user.findOne({ accessToken });
    if (user) {
      next();
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

const cloudinary = cloudinaryFramework.v2;
cloudinary.config({
  cloud_name: "final-project-cam-lotta",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "wardrobe",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});
const parser = multer({ storage });

//------ROUTES-----------------------------------------------------

app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});

app.post("/signup", async (req, res) => {
  const { name, username, password, email } = req.body;

  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 7) {
      throw " Password must be at least 7 characters";
    }
    const newUser = await new User({
      name,
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    }).save();

    res.status(201).json({
      response: {
        userId: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        accessToken: newUser.accessToken,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
        },
        success: true,
      });
    } else {
      res.status(404).json({
        response: "Username or password doesn't match",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post("/role", async (req, res) => {
  const { description } = req.body;
  try {
    const newRole = await new Role({ description }).save();
    res.status(201).json({ response: newRole, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post("/user", async (req, res) => {
  const { name, role } = req.body;
  try {
    const specificRole = await Role.findById(role);
    const newUser = await new User({ name, role: specificRole }).save();
    res.status(201).json({ response: newUser, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.get("/user/userId", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate("role");
  res.status(200).json({ response: user, success: true });
});

// app.post("/wardrobe", parser.single("image"), async (req, res) => {
//   res.json({ imageUrl: req.file.path, imageId: req.file.filename });
// });

app.post("/wardrobe", parser.single("image"), async (req, res) => {
  try {
    const wardrobe = await new Wardrobe({
      name: req.body.filename,
      imageUrl: req.file.path,
    }).save();
    res.json(wardrobe);
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
});

// ------------ START SERVER --------------------------------------
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
