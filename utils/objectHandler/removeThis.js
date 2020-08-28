const removeThis = (obj, target) => {
	target.forEach((key) => {
		delete obj[key];
	});

	return obj;
};

module.exports = removeThis;
