const { PrismaClient } = require("../generated/prisma");
const dotenv = require("dotenv");
const prisma = new PrismaClient();

dotenv.config();

const SellController = {
  create: async (req, res) => {
    try {
      const serial = req.body.serial;
      const product = await prisma.product.findFirst({
        where: {
          serial: serial,
          status: "instock",
        },
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      await prisma.sell.create({
        data: {
          productId: product.id,
          price: req.body.price,
          payDate: new Date(),
        },
      });

      res.json({ message: "Sell created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create sell" });
    }
  },
  list: async (req, res) => {
    try {
      const sells = await prisma.sell.findMany({
        where: {
          status: "pending",
        },
        orderBy: {
          id: "desc",
        },

        select: {
          product: {
            select: {
              name: true,
              serial: true,
            },
          },
          id: true,
          price: true,
        },
      });
      res.json(sells);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  remove: async (req, res) => {
    try {
      const id = req.params.id;
      await prisma.sell.delete({
        where: {
          id: id,
        },
      });
      res.json({ message: "Sell deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  confirm: async (req, res) => {
    try {
      const sells = await prisma.sell.findMany({
        where: {
          status: "pending",
        },
      });

      for (let i = 0; i < sells.length; i++) {
        const sell = sells[i];
        await prisma.product.update({
          where: {
            id: sell.productId,
          },
          data: {
            status: "sold",
          },
        });
      }
      await prisma.sell.updateMany({
        where: {
          status: "pending",
        },
        data: {
          status: "paid",
          payDate: new Date(),
        },
      });
      res.json({ message: "Sell confirmed successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = SellController;
