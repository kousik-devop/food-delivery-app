const userModel = require("../models/user.model")
const foodPartnerModel = require("../models/foodpartner.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {

    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    // Hash the password before storing
    const saltRounds = 10;
    const hashedPassword = password ? await bcrypt.hash(password, saltRounds) : undefined;

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Cookie settings: httpOnly, secure=false for localhost, sameSite=Lax, path='/', maxAge=1 day
        // Use SameSite=None so the cookie can be sent from the dev client (different port).
    // Keep secure=true only in production.
    res.cookie("user_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "None",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

async function loginUser(req, res) {
    try {
        // DEBUG: log incoming body for troubleshooting
        console.log("[DEBUG] loginUser - headers:", req.headers);
        console.log("[DEBUG] loginUser - body:", req.body);

        if (!req.body) {
            return res.status(400).json({ message: "Missing request body" });
        }
        const { email, password } = req.body;

        // 1️⃣ Input validation
        if (!email || !password) {
            console.warn("[DEBUG] loginUser - missing fields", { email, password });
            return res.status(400).json({ message: "Email and password are required" });
        }

        // 2️⃣ Check user existence
        const user = await userModel.findOne({ email });
        console.log("[DEBUG] loginUser - user found:", user);
        if (!user) {
            console.warn("[DEBUG] loginUser - user not found for email", email);
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // 3️⃣ Verify password
        // Support both older bcrypt-hashed passwords and plain-text passwords stored for testing.
        // Support both older bcrypt-hashed passwords and plain-text passwords stored for testing.
        let isPasswordValid = false;
        try {
            if (user.password && user.password.startsWith('$2')) {
                // bcrypt hash
                isPasswordValid = await bcrypt.compare(password, user.password);
            } else {
                // plain-text
                isPasswordValid = password === user.password;
            }
        } catch (e) {
            console.error('Password verification error:', e);
            isPasswordValid = false;
        }

        if (!isPasswordValid) {
            console.warn("[DEBUG] loginUser - invalid password for user", user._id);
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // 4️⃣ Create JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // 5️⃣ Set cookie securely
            // For cross-origin requests from the dev client (different port), set SameSite=None
        // and make secure true in production. Browsers require SameSite=None for cookies to
        // be sent on XHR/fetch from another origin.
        res.cookie("user_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: "None",
          path: "/",
          maxAge: 24 * 60 * 60 * 1000
        });


        // 6️⃣ Send response
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



function logoutUser(req, res) {
    res.clearCookie("user_token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}


async function registerFoodPartner(req, res) {

    const { ownerName, restaurantName, phone, address, email, password } = req.body;

    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email
    })

    if (isAccountAlreadyExists) {
        return res.status(400).json({
            message: "Food partner account already exists"
        })
    }

    // Hash food partner password before storing
    const saltRounds = 10;
    const hashedPassword = password ? await bcrypt.hash(password, saltRounds) : undefined;
    // Create the food partner record
    const foodPartner = await foodPartnerModel.create({
        ownerName,
        restaurantName,
        phone,
        address,
        email,
        password: hashedPassword,
    });

    // Create JWT token for partner
    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Set auth cookie for partner
    res.cookie("partner_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "None",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({
        message: "Food partner registered successfully",
        foodPartner: {
            _id: foodPartner._id,
            ownerName: foodPartner.ownerName,
            restaurantName: foodPartner.restaurantName,
            phone: foodPartner.phone,
            address: foodPartner.address,
            email: foodPartner.email
        }
    })

}

async function loginFoodPartner(req, res) {

    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if (!foodPartner) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie("partner_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "None",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: "Food partner logged in successfully",
        foodPartner: {
            _id: foodPartner._id,
            ownerName: foodPartner.ownerName,
            restaurantName: foodPartner.restaurantName,
            phone: foodPartner.phone,
            address: foodPartner.address,
            email: foodPartner.email
        }
    })
}

function logoutFoodPartner(req, res) {
    res.clearCookie("partner_token");
    res.status(200).json({
        message: "Food partner logged out successfully"
    });
}

async function getFoodPartnerProfile(req, res) {
    try {
        // The authFoodPartnerMiddleware should have attached the partner to the request
        if (!req.foodPartner) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        // Create a copy and remove password before sending
        const partner = { ...req.foodPartner.toObject() };
        delete partner.password;
        res.status(200).json({ partner });
    } catch (error) {
        console.error("Error fetching food partner profile:", error);
        res.status(500).json({ message: "Server error" });
    }
}

async function getUserProfile(req, res) {
    try {
        const token = req.cookies.user_token;
        console.log("Token:", token);
        if (!token) return res.status(401).json({ message: "Not authenticated" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ user });
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
    getFoodPartnerProfile,
    getUserProfile,
    createTestUser
}

// Development helper: create a test user with known credentials (dev-only)
async function createTestUser(req, res) {
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({ message: 'Not allowed in production' });
    }

    try {
        const { email = 'test@example.com', password = 'password123', fullName = 'Test User' } = req.body || {};
        const existing = await userModel.findOne({ email });
        if (existing) {
            return res.status(200).json({ message: 'Test user already exists', user: { _id: existing._id, email: existing.email } });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await userModel.create({ fullName, email, password: hashedPassword });

        return res.status(201).json({ message: 'Test user created', user: { _id: user._id, email: user.email }, credentials: { email, password } });
    } catch (err) {
        console.error('createTestUser error', err);
        return res.status(500).json({ message: 'Failed to create test user' });
    }
}