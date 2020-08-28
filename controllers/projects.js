const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Project = require("../models/Project");
const FileUploader = require("../utils/fileUploader");
const stringToObj = require("../utils/objectHandler/toObject");
const FileRemover = require("../utils/fileRemover");
const removeThis = require("../utils/objectHandler/removeThis");

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
		"modalImage category descriptionDetail organizationImage tools links";

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
	// Convert string to object
	let newData = Object.assign({}, req.body);
	newData = stringToObj(newData, ["links", "tools"]);

	// Check files
	if (!req.files) {
		return next(new ErrorResponse(`Please upload a file`, 400));
	}

	const keyImage = ["image", "modalImage", "organizationImage"];
	let imageUrl = [];
	// imageHandler -> Check for images
	keyImage.forEach(async (key, index) => {
		if (
			typeof req.files[key] === "string" ||
			typeof req.files[key] === "undefined"
		) {
			// SKIP
			return;
		} else {
			// UPLOAD NEW IMAGE
			const newImage = req.files[key];
			newImage.name = `project_${req.body.title}_${key}${
				path.parse(newImage.name).ext
			}`;
			FileUploader(req.files[key], "project");
			imageUrl.push({ [key]: `project/${newImage.name}` });
		}
	});

	const toCreateData = Object.assign({}, newData, ...imageUrl);
	const project = await Project.create(toCreateData);

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

	// Convert string to object
	let newData = Object.assign({}, req.body);
	newData = stringToObj(newData, ["links", "tools"]);

	// Clean unnecesary data
	const keyImage = ["image", "modalImage", "organizationImage"];
	newData = removeThis(newData, keyImage);
	let imageUrl = [];

	// imageHandler -> Check for images
	if (req.files) {
		keyImage.forEach(async (key, index) => {
			if (
				typeof req.files[key] === "string" ||
				typeof req.files[key] === "undefined"
			) {
				// SKIP
				return;
			} else {
				// UPLOAD NEW IMAGE
				const newImage = req.files[key];
				newImage.name = `project_${key}_${req.body.title}${
					path.parse(newImage.name).ext
				}`;
				FileUploader(req.files[key], "project");
				imageUrl.push({ [key]: `project/${newImage.name}` });
			}
		});
	}

	const toUpdateData = Object.assign({}, newData, ...imageUrl);

	project = await Project.findByIdAndUpdate(req.params.id, toUpdateData, {
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

	// Find the Image and Remove
	const key = ["image", "modalImage", "organizationImage"];
	FileRemover(key, project);

	// Remove from db
	project.remove();

	res.status(200).json({ success: true, data: project });
});
