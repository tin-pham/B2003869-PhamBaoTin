const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// password 1231331
const createAccessToken = (user) =>
  jwt.sign(user, "IqJ2xwfJ57sV^y3e", { expiresIn: "2 days" });
const createRefreshToken = (user) =>
  jwt.sign(user, "IqJ2xwfJ57sV^y3e", { expiresIn: "4 days" });

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exist." });
      }

      if (!name) {
        return res.status(400).json({ msg: "Fill your name." });
      }

      if (!email) {
        return res.status(400).json({ msg: "Fill your email." });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters" });
      }

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: passwordHash,
      });

      // Save user to mongoose database
      await newUser.save();

      const accessToken = createAccessToken({ id: newUser._id }); // eslint-disable-line no-param-reassign, no-underscore-dangle
      const refreshToken = createRefreshToken({ id: newUser._id }); // eslint-disable-line no-param-reassign, no-underscore-dangle

      // store token to cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      return res.json({ accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "User is not exist." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect Password." });
      }

      // if Login success, create access_token and refresh_token
      //  then create jsonwebtoken to authentication
      const accessToken = createAccessToken({ id: user._id }); // eslint-disable-line no-param-reassign, no-underscore-dangle
      const refreshToken = createRefreshToken({ id: user._id }); // eslint-disable-line no-param-reassign, no-underscore-dangle

      // store token to cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });
      return res.json({ accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", { path: "/user/refresh_token" });
      return res.json({ msg: "logout success." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rfToken = req.cookies.refreshToken;
      if (!rfToken) {
        return res.status(400).json({ msg: "please Login or Register" });
      }

      return jwt.verify(
        rfToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          // throw err when token wrong
          if (err) {
            return res.status(400).json({ msg: "please Login or Register" });
          }

          const accessToken = createAccessToken({ id: user.id });

          // check user
          return res.json({ accessToken });
        },
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(400).json({ msg: "please Login or Register" });
      }
      const id = jwt.verify(token, "IqJ2xwfJ57sV^y3e");
      const user = await User.findById(id.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User not found" });
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addCart: async (req, res) => {
    try {
      const { userId, quantity, product } = req.body;
      const userDB = await User.findById(userId);
      const { cart } = userDB;

      for (let i = 0; i < cart.length; i++) {
        if (cart[i].item.product_id === product.product_id) {
          return res.status(400).json({ msg: "Product already exist" });
        }
      }

      userDB.cart.push({
        item: product,
        number: quantity,
      });

      if (quantity <= 0) {
        return res
          .status(400)
          .json({ msg: "Quantity must be greater than zero" });
      }

      await User.findOneAndUpdate({ _id: userId }, { cart: userDB.cart });
      return res.json({ msg: "Add product success" });
    } catch (err) {
      // Return error response with error message
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteItem: async (req, res) => {
    try {
      const { userId, productId } = req.body;
      const userDB = await User.findById(userId);
      const { cart } = userDB;

      for (let i = 0; i < cart.length; i++) {
        if (cart[i].item.product_id === productId) {
          cart.splice(i, 1);
        }
      }

      // // Update user's cart in database
      await User.findOneAndUpdate({ _id: userId }, { cart });

      // Return success response with updated user data
      return res.json(cart);
    } catch (err) {
      // Return error response with error message
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteAllItem: async (req, res) => {
    try {
      const { userId } = req.body;
      const userDB = await User.findById(userId);
      const { cart } = userDB;

      if (cart.length === 0) {
        return res.status(400).json({ msg: "Don't have any item" });
      }
      // // Update user's cart in database
      await User.findOneAndUpdate({ _id: userId }, { cart: [] });

      // Return success response with updated user data
      return res.json([]);
    } catch (err) {
      // Return error response with error message
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userController;
