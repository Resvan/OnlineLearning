import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from "../models/User.js";



/* REGISTER USER */
export const register = async (req, res) => {
    try {
        console.log('hii');
        const {
            username,
            email,
            phone,
            password

        } = req.body;
        const userExist = await User.findOne({ email: email });
        if (userExist) return res.status(400).json({ msg: "Email already used. " });
        const salt = await bcrypt.genSalt();

        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            phone
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist. " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        delete user.password;
        
        res.status(200).json({ token, user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });

    }
};