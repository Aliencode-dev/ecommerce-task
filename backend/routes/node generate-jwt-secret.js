const fs = require("fs");
const crypto = require("crypto");

// Generate a new JWT secret
const newSecret = crypto.randomBytes(64).toString("hex");

// Update or create the .env file
fs.writeFileSync(".env", `JWT_SECRET=${newSecret}\n`);
console.log("JWT secret updated in .env file");
