const fs = require("fs");
const asyncHandler = require("../middleware/async");

const FileRemover = asyncHandler(async (files, data) => {
	// imageHandler -> remove file from fileserver (internally)
	const fileServerDirectory = `../${process.env.FILE_UPLOAD_PATH}/public`;

	// Check file existances
	files.forEach((key) => {
		const fileExist = fs.existsSync(`${fileServerDirectory}/${data[key]}`);
		if (fileExist) {
			// Remove file
			try {
				fs.unlinkSync(`${fileServerDirectory}/${data[key]}`);
				console.log(`${data[key]} removed`);
			} catch (error) {
				console.log(error);
			}
		}
	});
});

module.exports = FileRemover;
