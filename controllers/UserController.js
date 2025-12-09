const { PrismaClient } = require("../generated/prisma");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const prisma = new PrismaClient();

dotenv.config();

const UserController = {
  signIn: async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const user = await prisma.user.findFirst({
        where: {
          username: username,
          password: password,
          status: "active",
        },
      });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      res.json({ token: token, level: user.level });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  info: async (req, res) => {
    try {
      const headers = req.headers.authorization;
      const token = headers.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await prisma.user.findFirst({
        where: {
          id: decoded.id,
        },
        select: {
          name: true,
          level: true,
          username: true,
        },
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const headers = req.headers.authorization;
      const token = headers.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      const OldUser = await prisma.user.findFirst({
        where: {
          id: decoded.id,
        },
      });

      const newPassword =
        req.body.password === "" ? OldUser.password : req.body.password;

      //   const data = {
      //     name: req.body.name,
      //     username: req.body.username,
      //     password: newPassword,
      //   };

      await prisma.user.update({
        where: {
          id: decoded.id,
        },
        data: {
          name: req.body.name,
          username: req.body.username,
          password: newPassword,
        },
      });
      res.json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  list: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          status: "active",
        },
        orderBy: {
          id: "desc",
        },
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const user = await prisma.user.create({
        data: {
          name: req.body.name,
          username: req.body.username,
          password: req.body.password,
          level: req.body.level,
        },
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateRow: async (req, res) => {
    try {
      const olduser = await prisma.user.findFirst({
        where: {
          id: req.params.id,
        },
      });
      const newPassword =
        req.body.password === "" ? olduser.password : req.body.password;
      await prisma.user.update({
        where: {
          id: req.params.id,
        },
        data: {
          name: req.body.name,
          username: req.body.username,
          password: newPassword,
          level: req.body.level,
        },
      });
      res.json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  remove: async (req, res) => {
    try {
      await prisma.user.update({
        where: {
          id: req.params.id,
        },
        data: {
          status: "inactive",
        },
      });
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = UserController;
