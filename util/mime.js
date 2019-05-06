const mime = (path) => {
	return path.substring(path.lastIndexOf('.') + 1, path.length);
}

module.exports = mime;