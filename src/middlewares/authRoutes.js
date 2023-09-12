import jwt from "jsonwebtoken";

const authRoutes = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid Token" });
      req.role = decoded.role;
      req.userId = decoded.userId;
      next();
    });
  } else {
    res.status(401).json({ message: "You are not authenticated" });
  }
};

export default authRoutes;
