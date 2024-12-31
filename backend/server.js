import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Pet from './models/pet_model.js';
import User from './models/user_model.js'
dotenv.config();

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
    next();
});
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
    next();
});
app.use(express.json());
app.use(cors({
    origin: true, // Frontend URL
    credentials: true,           
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.listen(process.env.PORT, () => {
    connectDB();
    console.log("Server Started");
})

app.post("/pets" , async (req, res) => {

    const { name, species, age, location, contact,petid } = req.body;

    if (!name || !species || !age || !location || !petid ||!contact) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    // let imageUrl = '';
    // if (req.file) {
    //     try {
    //         const result = await cloudinary.v2.uploader.upload(req.file.path);
    //         imageUrl = result.secure_url;
    //     } catch (error) {
    //         petID
    //         console.error("Error uploading image:", error);
    //         return res.status(500).json({ success: false, message: "Error uploading image" });
    //     }
    // }
    const newPet = new Pet({
        name,
        species,
        age,
        location,
        contact,
        petid,
    });
    try {
        await newPet.save();
        res.status(200).json({ success: true, date: newPet });
    } catch (error) {
        console.error("Error adding pet:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.get("/pets", async (req, res) => {
    try {
        const pets = await Pet.find(); // Fetch all pets from the database
        res.status(200).json(pets); // Send pet details as JSON response
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//signup 
app.post("/users", async (req, res) => {
    const { name, email, pass } = req.body;
    if (!name || !email || !pass ) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    // const saltRounds = 10;
    // const hashedPass = await bcrypt.hash(pass, saltRounds);
    const newuser = new User({ name, email, pass});

    try {
        await newuser.save();
        console.log(newuser);
        
        res.status(200).json({ success: true, date: newuser });
    } catch (error) {
        console.error("Error adding user", error.message)
        res.status(500).json({ success: false, message: "server error" });
    }
});

//login
app.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    if (!email || !pass) {
        return res.status(400).json({ success: false, message: "Please provide both email and password" });
    }
    try {
        const user = await User.findOne({ email }); // Find the user by email
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
       
        req.session.user = {
            name: user.name,
            email: user.email,
        };
        console.log("Login successful");
        
        res.status(200).json({ success: true, message: "Login successful", user });

    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
})