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
};

module.exports = SellController;
