idParamIsNaN = (id) => {
	const idToNumber = +id;

	return isNaN(idToNumber);
}

module.exports = idParamIsNaN;