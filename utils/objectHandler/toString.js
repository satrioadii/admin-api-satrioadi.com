const objToString = (obj, target) => {
	target.forEach((key) => {
		obj[key] = JSON.stringify(obj[key]);
	});

	return obj;
};

module.exports = objToString;
