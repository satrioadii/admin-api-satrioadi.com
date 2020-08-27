const stringToObj = (obj, target) => {
	target.forEach((key) => {
		obj[key] = JSON.parse(obj[key]);
	});

	return obj;
};

module.exports = stringToObj;
