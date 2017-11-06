/*
	JavaScript Methods polyfills.
*	This will ensure the following mehods should be available in all browsers.
*/
if (typeof String.prototype.startsWith !== 'function') {
	String.prototype.startsWith = function(subStr) {
		if (this.indexOf(subStr) === 0) {
			return true;
		}
		return false;
	};
}

if (typeof String.prototype.endsWith !== 'function') {
	String.prototype.endsWith = function(subStr) {
		if (this.indexOf(subStr) === (this.length - subStr.length - 1)) {
			return true;
		}
		return false;
	};
}

if (typeof String.prototype.includes !== 'function') {
	String.prototype.includes = function(subStr) {
		if (this.indexOf(subStr) >= 0) {
			return true;
		}
		return false;
	};
}