exports.areChildren = function areChildren(instance) {
	return instance.constructor === Array;
};

exports.isChild = function isChild(instance) {
	return instance.constructor === Object;
};

exports.isRaw = function isRaw(instance) {
	return (instance.constructor === String || instance.constructor === Number);
};
