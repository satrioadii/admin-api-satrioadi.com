const asyncHandler = require("../middleware/async");

const FileUploader = asyncHandler(async (file, directory) => {
	// imageHandler -> upload to fileserver (internally)
	file.mv(
		`../${process.env.FILE_UPLOAD_PATH}/public/${directory}/${file.name}`,
		async (err) => {
			if (err) {
				console.error(err);
				return err;
			}
		}
	);
});

module.exports = FileUploader;
