const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Project = require("../models/Project");

// @desc	Get all project
// @route	GET /api/v1/project
// @access	public
exports.getProjects = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// @desc	Get a project
// @route	GET /api/v1/project/:id
// @access	public
exports.getProject = asyncHandler(async (req, res, next) => {
	// Select these fields only
	const fields =
		"modalImage category description organizationImage tools links";

	// Find Project
	let project = await Project.findOne({ _id: req.params.id })
		.select(fields)
		.populate({ path: "tools" });

	if (!project) {
		return next(new ErrorResponse(`Project not found`, 404));
	}

	res.status(200).json({
		success: true,
		data: project,
	});
});

// @desc	Create a project
// @route	POST /api/v1/project
// @access	private
exports.createProject = asyncHandler(async (req, res, next) => {
	// Create a project
	const project = await Project.create(req.body);

	res.status(201).json({
		success: true,
		data: project,
	});
});

// @desc	Update a project data
// @route	PUT /api/v1/project/:id
// @access	private
exports.updateProject = asyncHandler(async (req, res, next) => {
	let project = await Project.findById(req.params.id);

	if (!project) {
		return next(new ErrorResponse(`Project not found`, 404));
	}

	project = await Project.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({ success: true, data: project });
});

// @desc	Delete a project
// @route	DELETE /api/v1/project/:id
// @access	private
exports.deleteProject = asyncHandler(async (req, res, next) => {
	const project = await Project.findById(req.params.id);

	if (!project) {
		return next(new ErrorResponse(`Project not found`, 404));
	}

	project.remove();
	res.status(200).json({ success: true, data: {} });
});
