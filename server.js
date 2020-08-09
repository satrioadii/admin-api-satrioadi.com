const dotnev = require("dotenv");

const path = require("path");

const express = require("express");
const morgan = require("morgan");

// SECURITY
// NO-SQL INJECTION PREVENT
const mongoSanitize = require("express-mongo-sanitize");

// SECURITY HEADERS
const helmet = require("helmet");

// XSS-PROTECTION
const xss = require("xss-clean");

// RATE-LIMIT
const rateLimit = require("express-rate-limit");

// HPP
const hpp = require("hpp");

// CORS
const cors = require("cors");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

const colors = require("colors");
colors.enable();

const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

// ROUTE FILE
const auth = require("./routes/auth");
const users = require("./routes/users");
const projects = require("./routes/projects");
const tools = require("./routes/tools");

// LOAD ENV
dotnev.config({ path: "./config/config.env" });

// CONNECT DB
connectDB();

const app = express();
// Body parser
app.use(express.json());
// Cookie parser
app.use(cookieParser());
// Log Middleware in Dev
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
// File upload
app.use(fileUpload());
// Sanitiza data
app.use(mongoSanitize());
// Set security headers
app.use(helmet());
// Prevent XSS attacks
app.use(xss());
// Prevent https param pollution
app.use(hpp());
// Enable cors
app.use(cors());

// Mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/project", projects);
app.use("/api/v1/tool", tools);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	// Close server & exit process
	// server.close(() => process.exit(1));
});
