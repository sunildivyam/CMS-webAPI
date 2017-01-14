'use strict';
/**
* @ngdoc service
* @name raiweb.core.service:CkEditorService
* @description
*	CkEditorService provides CK EDITOR Helper functions
*
*/

(function() {
	var CkEditorService = function() {
		// Re Scans the Page for Equation Processing,
		// updates if finds any modified but unprocessed equations
		// It does not reprocess already processed equations
		function updateMathJax() {
			if (MathJax && MathJax.Hub) {
				if (MathJax.Hub.config) {
					MathJax.Hub.config.showMathMenu = false;
					if (MathJax.Hub.config.menuSettings) {
						MathJax.Hub.config.menuSettings.zoom = "Click";
					}
				}
				if (MathJax.Hub.Queue) {
					MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
				}
			}
		}

		function updateCodeHighlight(parentElement) {
			if (hljs && hljs.highlightBlock && parentElement) {
				parentElement.find('pre code')
				.each(function(i, block) {
					hljs.highlightBlock(block);
				});
			}
		}

		return {
			updateMathJax: updateMathJax,
			updateCodeHighlight: updateCodeHighlight
		};
	};

	CkEditorService.$inject = [];
	module.exports = CkEditorService;
})();