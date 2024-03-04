const jwt = require("jsonwebtoken");

export const generateToken = (userData) => {
  console.log(userData)
  const token = jwt.sign(userData, process.env.JWT_SECRET.toString("utf-8"), {
    expiresIn: "1h",
  });
  return token;
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.log("error: " + error);
    return null;
  }
};
