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

// Get tool list and create a tool
router
	.route("/")
	.get(advancedResults(Tool, null, {}), getTools)
	.post(createTool);

// Get tool detail, update a tool, delete a tool
router.route("/:id").get(getTool).put(updateTool).delete(deleteTool);

module.exports = router;
