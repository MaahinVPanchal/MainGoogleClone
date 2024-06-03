const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Add this line

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

// Routes

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        res.send({ message: "Login successful", user });
      } else {
        res.redirect("/login?error=invalid_password");
      }
    } else {
      res.redirect("/login?error=user_not_found");
    }
  } catch (err) {
    console.error("Error logging in user:", err.stack);
    res.redirect("/login?error=internal_server_error");
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.send({ message: "User already registered" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Use the hashed password
    });
    await newUser.save();
    res.send({ message: "Successfully registered" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.send({ message: "Internal server error" });
  }
});

app.listen(9002, () => {
  console.log("BE started at port 9002");
});
