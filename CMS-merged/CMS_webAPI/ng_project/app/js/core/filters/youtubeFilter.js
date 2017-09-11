'use strict';
/*
*   youtubeFilter
*   Description
*   youtubeFilter 
*  
*/

(function() {
    var youtubeFilter = function($sce, $sanitize) {
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


        return function(text) {
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
        };
    };

    youtubeFilter.$inject = ['$sce', '$sanitize'];
    module.exports = youtubeFilter;
})();