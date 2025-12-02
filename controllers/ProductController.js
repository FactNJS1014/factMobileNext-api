const { PrismaClient } = require("../generated/prisma");
const dotenv = require("dotenv");
const prisma = new PrismaClient();

dotenv.config();

const ProductController = {
  create: async (req, res) => {
    try {
      if (req.body.qty > 1000) {
        return res
          .status(400)
          .json({ error: "Quantity must be less than 1000" });
      }
      for (let i = 0; i < req.body.qty; i++) {
        await prisma.product.create({
          data: {
            serial: req.body.serial,
            name: req.body.name,
            color: req.body.color,
            price: req.body.price,
            customerName: req.body.customerName,
            customerPhone: req.body.customerPhone,
            customerAddress: req.body.customerAddress,
            remark: req.body.remark ?? "",
            release: req.body.release,
          },
        });
      }
      res.json({ message: "Product created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create product" });
    }
  },
  list: async (req, res) => {
    try {
      const products = await prisma.product.findMany({
        orderBy: {
          id: "desc",
        },
        where: {
          status: {
            not: "deleted",
          },
        },
      });
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  },
  update: async (req, res) => {
    try {
      await prisma.product.update({
        where: {
          id: req.params.id,
        },
        data: {
          release: req.body.release,
          name: req.body.name,
          color: req.body.color,
          price: req.body.price,
          customerName: req.body.customerName,
          customerPhone: req.body.customerPhone,
          customerAddress: req.body.customerAddress,
          remark: req.body.remark ?? "",
          serial: req.body.serial,
        },
      });
      res.json({ message: "Product updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update product" });
    }
  },
  remove: async (req, res) => {
    try {
      //   await prisma.product.delete({
      //     where: {
      //       id: req.params.id,
      //     },
      //   });
      await prisma.product.update({
        where: {
          id: req.params.id,
        },
        data: {
          status: "deleted",
        },
      });
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  },
};

module.exports = ProductController;
