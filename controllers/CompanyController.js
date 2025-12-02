const {PrismaClient} = require("../generated/prisma");
const dotenv = require("dotenv");
const prisma = new PrismaClient();

dotenv.config();

const CompanyController = {
    create: async (req, res) => {
        try {
            const oldCompany = await prisma.company.findFirst();
            const payload = {
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email ?? '',
                taxcode: req.body.taxcode
            }
            if (oldCompany) {
                await prisma.company.update({
                    where: {
                        id: oldCompany.id
                    },
                    data: payload
                });
            }else{
                await prisma.company.create({
                    data: payload
                });
            }
            res.status(200).json({message: "Company created successfully"});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    list: async (req, res) => {
        try {
            const company = await prisma.company.findFirst();
            res.status(200).json(company);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = CompanyController;
