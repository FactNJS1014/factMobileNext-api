const {PrismaClient} = require("../generated/prisma");
const dotenv = require("dotenv");
const prisma = new PrismaClient();

dotenv.config();

const ProductController = {
    create: async (req, res) => {
        
        try {
            await prisma.product.create({
              data:{
                serial: req.body.serial,
                name: req.body.name,
                color: req.body.color,
                price: req.body.price,
                customerName: req.body.customerName,
                customerPhone: req.body.customerPhone,
                customerAddress: req.body.customerAddress,
                remark: req.body.remark ?? '',
                release: req.body.release,

              }
            });
            res.json({message: "Product created successfully"});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create product" });
        }
    },
    
}

module.exports = ProductController;
