const express = require("express");

const Tool = require("../models/Tool");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const {
	getTool,
	getTools,
	createTool,
	updateTool,
	deleteTool,
} = require("../controllers/tools");
const { protect, authorize } = require("../middleware/auth");

// Get tool list and create a tool
router
	.route("/")
	.get(advancedResults(Tool, null, {}), getTools)
	.post(protect, authorize("Admin"), createTool);

// Get tool detail, update a tool, delete a tool
router
	.route("/:id")
	.get(getTool)
	.put(protect, authorize("Admin"), updateTool)
	.delete(protect, authorize("Admin"), deleteTool);

module.exports = router;
