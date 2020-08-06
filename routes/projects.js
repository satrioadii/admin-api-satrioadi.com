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

// Get project list and Create a project
router
	.route("/")
	.get(
		advancedResults(Project, null, { select: "name description image" }),
		getProjects
	)
	.post(createProject);

// Get project detail, update a project, delete a project
router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);

module.exports = router;
