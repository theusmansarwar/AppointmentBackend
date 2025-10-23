// const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_SECRET || "yoursecret";

// exports.authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token) return res.status(401).json({ error: "No token, authorization denied" });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; // {id, role}
//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Token invalid" });
//   }
// };

// exports.roleMiddleware = (roles) => (req, res, next) => {
//   if (!roles.includes(req.user.role)) {
//     return res.status(403).json({ error: "Access denied" });
//   }
//   next();
// };
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const verifyAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};
