'use strict';
/*
*	DropZone
*	Description
*	DropZone is DropZone Container
*/

(function() {
	var DropZone = function() {
		function DropZone(raw) {
			if (raw instanceof Object) {
				for(var key in raw) {
					this[key] = raw[key];
				}
			} else {
				this.dropZoneId = 0;
				this.allowed = [];
				this.sections=[];
				this.align = '';
				this.width = '';
				this.forceBreak = false;
			}
		}

		DropZone.prototype = {

		};
		return DropZone;
	};

	DropZone.$inject = [];
	module.exports = DropZone;
})();
