const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please add a name"],
		trim: true,
	},
	description: {
		type: String,
		required: [true, "Please add a short description"],
		maxlength: [256, "Description can not be more than 256 caracters"],
	},
	image: {
		type: String,
		required: [true, "Please add a image url"],
	},
	detail: {
		image: { type: String, required: [true, "Please add a detail image"] },
		category: { type: String, required: [true, "Please add a category"] },
		description: {
			type: String,
			required: [true, "Please add a description"],
			maxlength: [2200, "Desctiption can not be more than 1000 characters"],
		},
		organizationImage: {
			type: String,
			required: [true, "Please add the organization image"],
		},
		tools: [
			{
				label: { type: String, required: [true, "Please add the tools label"] },
				color: {
					type: String,
					required: [true, "Please add the color type (primary or secondary)"],
					enum: ["primary", "secondary"],
				},
				link: { type: String },
				variant: { type: String },
			},
		],
		links: [
			{
				label: { type: String, required: [true, "Please add the tools label"] },
				color: {
					type: String,
					required: [true, "Please add the color type (primary or secondary)"],
					enum: ["primary", "secondary"],
				},
				link: { type: String },
				variant: { type: String },
			},
		],
	},
});

module.exports = mongoose.model("Project", ProjectSchema);
