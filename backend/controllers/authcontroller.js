// import npm file
import bcrypt from "bcryptjs";

// import all coding file
import User from "../models/usermodel.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password do not match!" });
    }

    const user = await User.findOne({ username });
    const Email = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
    if (Email) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // avatar
    const profilePic = `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(
      username
    )}`;

    // presave: make a spesific data before save
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePic,
    });

    if (newUser) {
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("-- Error in signup controller: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isEmailValid = await User.findOne({ email });

    if (isEmailValid) {
      // Email is found by database
      const isPasswordValid = await bcrypt.compare(
        password,
        isEmailValid?.password || ""
      );

      if (isPasswordValid) {
        // Generate JWT token
        generateTokenAndSetCookie(isEmailValid._id, res);

        res.status(200).json({
          _id: isEmailValid._id,
          username: isEmailValid.username,
          profilePic: isEmailValid.profilePic,
          content: isEmailValid.content,
        });
      } else {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }
    } else {
      return res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.log("--Error in login controller: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logged out successfully  " });
  } catch (error) {
    console.log("Error in logout controller: ", error.message);
    res.status(500).json({ message: error.message });
  }
};
