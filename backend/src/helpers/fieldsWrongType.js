module.exports = function fieldsWrongType (title, content, image) {
	if(	typeof title === "undefined" ||
		typeof title !== "string" ||
		typeof content === "undefined" ||
		typeof content !== "string" ||
		typeof image === "undefined" ||
		typeof image !== "string" ||
		!image.match(/[^/]+(jpg|png|gif)$/) ||
		typeof category === "undefined" ||
		typeof category !== "string") {
			return true;
		}
}