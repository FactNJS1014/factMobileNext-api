const {PrismaClient} = require("../generated/prisma");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const prisma = new PrismaClient();

dotenv.config();


const UserController =  {
    signIn: (req, res) => {
       try {
        const username = req.body.username;
        const password = req.body.password;

        const user = prisma.user.findUnique({
            where: {
                username: username,
                password: password,
                status:'active'
            }
        });

        if (!user) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: '1m'});
        res.json({token: token});
        
       } catch (error) {
        res.status(500).json({message: error.message});
       }
    },
    
}

module.exports = UserController;
