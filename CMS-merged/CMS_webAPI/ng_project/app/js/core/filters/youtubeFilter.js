'use strict';
/*
*   youtubeFilter
*   Description
*   youtubeFilter 
*  
*/

(function() {
    var youtubeFilter = function($sce, $sanitize) {

    	/*
		*	This method, parses the youtube iframe by following few steps:
		*	1) Finds all youtube Iframes and replaces them with temporary string "///YOUTUBE_IFRAME///"
		*	2) Sanitizes the truncated text.
		*	3) Replaces back all youtube instances with the iframe code.
		*	Commenting out as of now, because CKEditor itself uses out of the box Sanitization.
    	*/
    /*
    	function pasrseForYoutube(text, cb) {				
			var foundIndex = text.indexOf('<iframe');
			var str = text;
			while(foundIndex>=0) {  	
				var lastIndex = str.indexOf('</iframe');
				var foundVideo = str.substring(foundIndex,lastIndex + 9);
				var isYoutubeIframe = foundVideo.indexOf("https://www.youtube.com/");
				var name = '///YOUTUBE_IFRAME_' + foundIndex + '///';
				if (isYoutubeIframe > 0) {
					if (typeof cb === 'function') {
						cb(foundVideo, name);
					}
					text = text.replace(foundVideo, name);
				}				
				str = str.substring(lastIndex + 10);
				foundIndex = str.indexOf('<iframe');     
			}
			return text;
		}

	*/
        return function(text) {
    	/*
	        if (text) {        	
	        	var foundYoutubeVideos = []; 
	        	text = pasrseForYoutube(text, function(foundYoutubeVideoIframe, name) {
	        		foundYoutubeVideos.push({iframe: foundYoutubeVideoIframe, name: name});
	        	});
	        	
	        	text =  $sanitize(text);

	        	if (foundYoutubeVideos.length) {
	        		foundYoutubeVideos.filter(function(videoIframe) {
	        			text = text.replace(videoIframe.name,videoIframe.iframe);
	        		});
	        	}

	            return $sce.trustAsHtml(text);
	        }
	        return text;
        */
        	return $sce.trustAsHtml(text);	// This allows all CKEditor inline styling and all Tags which are included in toolbar.
        	
        };
    };

    youtubeFilter.$inject = ['$sce', '$sanitize'];
    module.exports = youtubeFilter;
})();