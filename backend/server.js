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
  galleries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
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

const ImageSchema = new mongoose.Schema({
  imageName: {
    type: String,
    // required: true,
  },
  imageUrl: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    enum: ["dresses", "tops", "Jackets/Coats", "sweatshirts", "pants"],
  },
});

const User = mongoose.model("User", UserSchema);

const Image = mongoose.model("Image", ImageSchema);

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
    } else {
      res.status(401).json({
        response: {
          message: "Please, log in",
        },
        success: false,
      });
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

app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const gueriedUser = await User.findById(userId).populate("galleries");
    if (queriedUser) {
      res.status(200).json({ response: queriedUser, success: true });
    } else {
      res.status(404).json({ response: "User not found", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.get("/user/:userId/images", async (req, res) => {
  const { userId } = req.params;

  try {
    const queriedUser = await User.findById(userId).populate("galleries");
    if (queriedUser) {
      res.status(200).json({ response: queriedUser.galleries, success: true });
    } else {
      res.status(404).json({ response: "User not found", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ response: error, success: false });
  }
});

// user not found

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
          name: user.name,
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

app.post("/gallery", async (req, res) => {
  const { description } = req.body;
  try {
    const newGallery = await new Gallery({ description }).save();
    res.status(201).json({ response: newGallery, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post("/upload/:userId", parser.single("image"), async (req, res) => {
  const { userId } = req.params;
  console.log(req.body);
  try {
    const image = await new Image({
      imageName: req.body.filename,
      imageUrl: req.file.path,
      //category needs to be saved here?

      category: req.body.category,
    }).save();

    const user = await User.findById(userId);
    if (user) {
      await User.findByIdAndUpdate(userId, {
        $push: {
          galleries: image,
        },
      });
      res.status(200).json({
        response: image,
        success: true,
      });
    } else {
      res.status(404).json({ response: "User not found", success: false });
    }
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
});

app.post("/fleemarketwardrob", parser.single("image"), async (req, res) => {
  res.json({
    imageUrl: req.file.path,
    imageId: req.file.filename,
  });
});

app.post("/fleemarketwardrob", parser.single("image"), async (req, res) => {
  try {
    const image = await new Image({
      imagName: req.body.filename,
      imageUrl: req.file.path,
    }).save();
    res.json(image);
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
});

// ------------ START SERVER --------------------------------------
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
