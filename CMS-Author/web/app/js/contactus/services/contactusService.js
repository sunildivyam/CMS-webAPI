'use strict';
/*
*	contactusService
*	Description
*	contactusService fetches the contactus Page Level Data.
*/

(function() {
	var contactusService = function($q, $http) {
		var url = 'https://gsaims.d2.sc.omtrdc.net/b/ss/gsaimsdev/1/H.24.2/s17668884763761?';
		var queryString = [
			"AQB=1",
			"ndh=1",
			"t=31%2F8%2F2016%2010%3A43%3A5%204%20-330",
			"ce=UTF-8",
			"ns=gsaims",
			"pageName=US%3AAIMS%3ASOLUTIONS%3AABOUT%20AIMS%3AABOUT%20AIMSSSSSSSS",
			"g=https%3A%2F%2Fqa.gscio.com%2Fcontent%2Faims%2Fen%2Fsite%2Fsolutions%2Faims%2Fasset-classes%2Fglobal%2Faboutaims%2Faboutaims.html%23%2Fpage%3Furl%3D%252Fcontent%252Faims%252Fen%252Fsite%252Fsolutions%252Faims%252Fasset-classes%252Fglobal%252Faboutaims%252Faboutaims",
			"r=https%3A%2F%2Fqa.gscio.com%2Fcontent%2Faims%2Fen%2Fsite%2Fmyworkspace%2Foverview.html",
			"cc=USD",
			"ch=AIMS",
			"server=US",
			"events=event2%2Cevent7",
			"c1=SOLUTIONS",
			"v1=SOLUTIONS",
			"c2=ABOUT%20AIMSSSSSSSS",
			"v2=ABOUT%20AIMSSSSSSSS",
			"c4=ARTICLE",
			"v4=ARTICLE",
			"c6=NO%20VALUE",
			"v6=INTERNAL",
			"c8=INTERNAL",
			"v8=US",
			"v9=AIMS",
			"c10=2015-05-12T03%3A52%3A00.000%2B06%3A30",
			"v10=US%3AAIMS%3ASOLUTIONS%3AABOUT%20AIMS%3AABOUT%20AIMSSSSSSSS",
			"c13=0.000016666666666666667",
			"v15=2015-05-12T03%3A52%3A00.000%2B06%3A30",
			"c20=FLASH%2022",
			"c21=SILVERLIGHT%20NOT%20DETECTED",
			"c29=LESS%20THAN%201%20DAY",
			"v29=LESS%20THAN%201%20DAY",
			"c30=REPEAT",
			"v30=REPEAT",
			"c31=3",
			"v31=3",
			"v38=FLASH%2022",
			"v39=SILVERLIGHT%20NOT%20DETECTED",
			"v45=NO%20VALUE",
			"c55=2B44448CG4BD52GFBB03F0EDGFG91D68",
			"v55=2B44448CG4BD52GFBB03F0EDGFG91D68",
			"v66=THURSDAY",
			"v67=12%3A00AM",
			"v68=WEEKDAY",
			"c72=THURSDAY",
			"c73=12%3A00AM",
			"c74=WEEKDAY",
			"h1=US%7CAIMS%7CSOLUTIONS",
			"h2=US%7CAIMS%7CSOLUTIONS%7CABOUT%20AIMSSSSSSSS",
			"s=1366x768",
			"c=24",
			"j=1.6",
			"v=N",
			"k=Y",
			"bw=1366",
			"bh=325",
			"p=Widevine%20Content%20Decryption%20Module%3BChrome%20PDF%20Viewer%3BShockwave%20Flash%3BNative%20Client%3B",
			"AQE=1"
		].join('&');

		function getTechnologies() {
			return $http({
				'method': 'get',
				'url': url + queryString
			});
		}

		return {
			getTechnologies: getTechnologies
		};
	};

	contactusService.$inject = ['$q', '$http'];
	module.exports = contactusService;
})();
