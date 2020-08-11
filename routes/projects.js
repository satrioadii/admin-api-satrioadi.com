const express = require("express");
const {
	getProjects,
	getProject,
	createProject,
	deleteProject,
	updateProject,
} = require("../controllers/projects");

const Project = require("../models/Project");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

// Get project list and Create a project
router
	.route("/")
	.get(
		advancedResults(Project, null, { select: "name description image" }),
		getProjects
	)
	.post(protect, authorize("Admin"), createProject);

// Get project detail, update a project, delete a project
router
	.route("/:id")
	.get(getProject)
	.put(protect, authorize("Admin"), updateProject)
	.delete(protect, authorize("Admin"), deleteProject);

module.exports = router;
