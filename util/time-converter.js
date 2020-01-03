const moment = require("moment");
moment.locale("ko");

let transform = function (array, propertyName, format) {
	let defaultFormat = "YYYY[년] MMMM Do a h:mm:ss";

	if (!format) {
		for (let i = 0; i < array.length; i++) {
			array[i][propertyName] = moment(array[i][propertyName]).format(
				defaultFormat
			);
		}
	} else {
		for (let i = 0; i < array.length; i++) {
			array[i][propertyName] = moment(array[i][propertyName]).format(format);
		}
	}
	return array;
};

module.exports = transform;
