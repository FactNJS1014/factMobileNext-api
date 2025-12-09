const { PrismaClient } = require("../generated/prisma");
const dotenv = require("dotenv");
const prisma = new PrismaClient();

dotenv.config();

const ServiceController = {
  create: async (req, res) => {
    try {
      await prisma.service.create({
        data: {
          name: req.body.name,
          price: req.body.price,
          remark: req.body.remark,
          payDate: new Date(),
        },
      });
      res.status(200).json({ message: "Service created successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  list: async (req, res) => {
    try {
      const services = await prisma.service.findMany({
        orderBy: {
          payDate: "desc",
        },
      });
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      await prisma.service.update({
        where: {
          id: req.params.id,
        },
        data: {
          name: req.body.name,
          price: req.body.price,
          remark: req.body.remark,
        },
      });
      res.status(200).json({ message: "Service updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  remove: async (req, res) => {
    try {
      await prisma.service.delete({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ServiceController;
