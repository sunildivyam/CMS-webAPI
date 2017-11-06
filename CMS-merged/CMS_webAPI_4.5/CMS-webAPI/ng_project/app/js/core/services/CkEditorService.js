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
		function updateMathJax(elm) {
			var element = $(elm);
			if (MathJax && MathJax.Hub) {
				if (MathJax.Hub.config) {
					MathJax.Hub.config.showMathMenu = false;
					if (MathJax.Hub.config.menuSettings) {
						MathJax.Hub.config.menuSettings.zoom = "Click";
					}
				}
				if (MathJax.Hub.Queue) {
					if (element && element.length) {
						MathJax.Hub.Reprocess(element[0], function() {							
							MathJax.Hub.Queue(["Typeset",MathJax.Hub], element[0]);
						});						
					} else {
						MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
					}
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
		//window.opener.CKEDITOR.tools.callFunction(CkEditorImageBrowser.ckFunctionNum, $(this).data('url'));
		//window.close();

		function getUrlFromImageBrowser(ckFunctionNumber, url) {
			if (window && window.opener && window.opener['CKEDITOR'] && typeof ckFunctionNumber !== 'undefined') {
				window.opener.CKEDITOR.tools.callFunction(ckFunctionNumber, url);
				window.close();
			}
		}

		return {
			updateMathJax: updateMathJax,
			updateCodeHighlight: updateCodeHighlight,
			getUrlFromImageBrowser: getUrlFromImageBrowser
		};
	};

	CkEditorService.$inject = [];
	module.exports = CkEditorService;
})();