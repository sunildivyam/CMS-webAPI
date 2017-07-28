'use strict';
/*
* @ngdoc controller
* @name raiweb.account.controller:profileController
* @description
*	The account controller provides the scope methods for following:
*	1) Registering User
*	2) Loging User
*	3) For other user account specific operations, methods will be added.
* @requires $rootScope
* @requires $scope
* @requires $state
* @requires appService
*/

(function() {
	var profileController = function($rootScope, $scope, $state, appService, accountService, User, EntityMapper, modalService, Utils) {
		$scope.changePasswordModel = {};	// model to hold oldPW,newPW and confirmPw
		$scope.userRolesViewModel = {
			userName: undefined,
			roles: []
		};

		var dpRangeOptions = Utils.getDateRangePicker();
		$scope.usersViewModel = {
			dateRange: {
				startDate: dpRangeOptions.startDate,
				endDate: dpRangeOptions.endDate
			},
			users: new EntityMapper('User').toEntities(),
			rangeOptions: dpRangeOptions
		};
		$scope.selectedCachedkey = {
			name: ''
		};

		function setProfileData() {
			var curentUser = accountService.getLoggedInUser();			
			$scope.curentUserRoles = curentUser && curentUser.roles;	
			$scope.toolbarButtons = Utils.getListConfigOf('profileActions');					
		}

		$scope.changePasswordClick = function(event) {
			event.preventDefault();
			$scope.isChangingPassword = true;
			accountService.changePassword($scope.changePasswordModel).then(function() {
				$scope.isChangingPassword = false;
				// On successful Password Change. user should logout and relogin.
				accountService.logout().then(function() {
					reLogin();
				}, function() {
					reLogin();
				});
			}, function(rejection){
				$scope.isChangingPassword = false;
				modalService.alert('md',
					'Password Change Failed',
					'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
					'Try again');
			});

			function reLogin() {
				var successModal = modalService.alert('md',
					'Password Change Success',
					'Your Password has been changed Successfully. Please Re-login',
					'Re-login');
				successModal.result.then(function() {
					$state.go('login');
				}, function() {
					$state.go('login');
				});
			}
		};

		$scope.onToolbarClick = function(event, button) {
			if (!button) {
				return;
			}

			switch(button.id) {
				case 'myProfile':
				case 'changePassword':
				case 'adminPanel':
					$state.go('author.profile.' + button.id.toLowerCase());
					break;
				case 'myDashboard':
					$state.go('author.dashboard');
					break;
			}
		};

		$scope.getUsersByDate = function() {
			$scope.isUsersLoading = true;
			accountService.getUsersByDate($scope.usersViewModel.dateRange).then(function(response) {
				$scope.usersViewModel.users = new EntityMapper(User).toEntities(response && response.data);
				$scope.isUsersLoading = false;
			}, function() {
				$scope.usersViewModel.users = new EntityMapper(User).toEntities();
				$scope.isUsersLoading = false;
			});
		}

		function getUserInfo() {
			$scope.isUserInfoLoading = true;
			accountService.getUserInfo().then(function(response) {
				$scope.myProfile = new User(response && response.data);
				$scope.isUserInfoLoading = false;
				setThumbnailUrl();
			}, function() {
				$scope.myProfile = new User();
				$scope.isUserInfoLoading = false;
				setThumbnailUrl();
			});
		}

		function getUserInfoByName(userName) {

			/*
			*	This should be used and implemented, if Admin requires a user's Detailed Info.
			* 	Its back end API and its AJAX are pre-implemented.
			*/

			// $scope.isUserInfoLoading = true;
			// accountService.getUserInfoByName(userName).then(function(response) {
			// 	$scope.myProfile = new User(response && response.data);
			// 	$scope.isUserInfoLoading = false;
			// }, function() {
			// 	$scope.myProfile = new User();
			// 	$scope.isUserInfoLoading = false;
			// });
		}

		$scope.updateProfileClick = function() {
			$scope.isUserInfoLoading = true;
			accountService.setUserInfo($scope.myProfile).then(function(response) {
				modalService.alert('md',
				'Profile Update',
				'Your profile is Updated, successfully',
				'Ok');
				$scope.isUserInfoLoading = false;
			}, function() {
				modalService.alert('md',
				'Profile Update',
				'Profile Update FAILED.',
				'Try Again');
				$scope.isUserInfoLoading = false;
			});
		}

		$scope.getUserRoles = function(event) {			
			$scope.isUserRolesProcessing = true;
			accountService.getUserRoles($scope.userRolesViewModel.userName).then(function(response) {
				$scope.userRolesViewModel.roles = response && response.data || [];
				$scope.isUserRolesProcessing = false;
			}, function() {
				$scope.userRolesViewModel.roles = [];
				modalService.alert('md',
				'User Roles Loading Failed',
				'User Not Found or some unknown error occured',
				'Try Again');
				$scope.isUserRolesProcessing = false;
			});
		};

		$scope.setUserRoles = function() {
			$scope.isUserRolesProcessing = true;
			accountService.setUserRoles($scope.userRolesViewModel).then(function() {
				$scope.userRolesViewModel = {
					userName: undefined,
					roles: []
				};
				$scope.isUserRolesProcessing = false;
			}, function() {
				modalService.alert('md',
				'User Roles Assignment Failed',
				'Please verify User Name and Roles. User Not Found or Invalid Role/s. Or some unknown error has occured',
				'Try Again');
				$scope.isUserRolesProcessing = false;
			});
		};

		function getAvaliableRoles() {
			$scope.isUserRolesProcessing = true;
			accountService.getRoles().then(function(response) {
				$scope.availableRoles = response && response.data || [];
				$scope.isUserRolesProcessing = false;
			}, function() {
				$scope.availableRoles = [];
				$scope.isUserRolesProcessing = false;
			});
		}

		function getCachedRequests() {
			$scope.isCacheProcessing = true;
			accountService.getCachedRequests().then(function(response) {
				$scope.cachedRequestKeys = response && response.data || [];
				$scope.isCacheProcessing = false;
			}, function() {
				$scope.cachedRequestKeys = [];
				$scope.isCacheProcessing = false;
			});
		}

		$scope.clearCache = function() {
			if (!$scope.selectedCachedkey.name) {
				return;
			}
			$scope.isCacheProcessing = true;
			accountService.clearCache($scope.selectedCachedkey.name).then(function() {
				var index = $scope.cachedRequestKeys.indexOf($scope.selectedCachedkey.name);
				if (index > -1) {
					$scope.cachedRequestKeys.splice(index, 1);
				}
				$scope.selectedCachedkey.name = '';
				$scope.isCacheProcessing = false;
			}, function() {
				modalService.alert('md',
				'Clearing cache Failed',
				'Key Not Found or some unknown error occured',
				'Try Again');
				$scope.isCacheProcessing = false;
			});
		};

		$scope.clearCacheAll = function() {
			$scope.isCacheProcessing = true;
			accountService.clearCacheAll().then(function() {
				$scope.cachedRequestKeys= [];
				$scope.isCacheProcessing = false;
				$scope.selectedCachedkey.name = '';
			}, function() {
				modalService.alert('md',
				'Clearing cache Failed',
				'some unknown error occured',
				'Try Again');
				$scope.isCacheProcessing = false;
			});
		};

		function thumbnailUpload(event, resourceData, completeCallback) {
            if (resourceData && $scope.myProfile && $scope.myProfile.userName) {
                accountService.uploadUserThumbnail(resourceData).then(function() {
                    if (typeof completeCallback === 'function') {
                        completeCallback(true);
                    }
                }, function(rejection) {
                    if (typeof completeCallback === 'function') {
                        completeCallback(false, rejection && rejection.data && rejection.data.Message);
                    }
                });
            } else {
                completeCallback(false, 'Image data or User Name Missing.');
            }
        }

		$scope.addUserThumbnail = function() {
            setThumbnailUrl(false);
            modalService.showUploadResourceModal(thumbnailUpload, 'md').result.then(function() {
                setThumbnailUrl();
            }, function() {
                setThumbnailUrl();
            });
        };

		function setThumbnailUrl(url) {
            if (url === false) {
                $scope.userThumbnailUrl = '';
            } else if($scope.myProfile && $scope.myProfile.userName){
                $scope.userThumbnailUrl = [appService.getUserImagesUrl(), $scope.myProfile.userName + '?cb=' + (new Date()).getTime()].join('/');
            } else {
            	$scope.userThumbnailUrl = '';
            }
        }

        $scope.reloadAppConfig = function() {
        	if ($scope.appConfigSection && $scope.appConfigSection.appConfigFormatted) {
	        	modalService.alert('md',
					'Reload Application Configuration',
					'This will discard any changes you made, and reloads a fresh copy of Application Configuration',
					'Continue', 'Back').result
	        	.then(function() {
					$scope.appConfigSection = $scope.appConfigSection || {};
	        		$scope.appConfigSection.appConfigFormatted = JSON.stringify(window._appConfig || {}, null, "\t");
				}, function() {
					//
				});   
			} else {
				$scope.appConfigSection = $scope.appConfigSection || {};
        		$scope.appConfigSection.appConfigFormatted = JSON.stringify(window._appConfig || {}, null, "\t");
			}   	
        }

		$scope.updateAppConfig = function() {
        	modalService.alert('md',
				'Save Application Configuration',
				'This will Overwrite the Application\'s original Configuration and can not be undone.',
				'Save and Overwrite', 'Back').result
        	.then(function() {
				saveApplicationConfig($scope.appConfigSection.appConfigFormatted);
			}, function() {
				//
			});  
        }

        function saveApplicationConfig(appConfigFormatted) {
        	try {
        		$scope.isAppConfigSaving = true;        		
        		accountService.saveApplicationConfig(appConfigFormatted).then(function(response) {
        			$scope.isAppConfigSaving = false;
        			
        			if (response && response.data && response.data.appConfigJsonString) {	        			
	        			modalService.alert('md',
						'Saved Successfully',
						'Application Configuration JSON has been saved successfully. You need to Reload the Page to Take new Configs in Effect.',
						'Ok');
	        		} else {
	        			$scope.isAppConfigSaving = false;
	        			modalService.alert('md',
						'Save Failure',
						'Application Configuration JSON has Failed Saving',
						'Try again');
	        		}
        		}, function(rejection) {
        			$scope.isAppConfigSaving = false;
        			modalService.alert('md',
					'Save Failure',
					'Application Configuration JSON has Failed Saving',
					'Try again');
        		});
        	} catch(ex) {
        		$scope.isAppConfigSaving = false;
        		modalService.alert('md',
				'Invalid JSON:' + ex && ex.name,
				'Application Configuration JSON is not valid. Please verify again</br><strong>ERROR:</strong> </br>' + (ex && ex.message),
				'Go Back');
        	}
        }

        $scope.onAppConfigMaximizeSection = function(event, parentEl, element) {
        	var $textArea = $(parentEl.find('#app-config-json'));
        	$scope.originalTextAreaStyle = $textArea.attr('style') || '';
        	$textArea.css({
        		position: 'absolute'
        	});
        	$textArea.animate({
        		top: '0px',
        		left: '0px',
        		width: '100%',
        		height: '100%'
        	}, 100);
        };

        $scope.onAppConfigRestoreSection = function(event, parentEl, element) {
        	var $textArea = $(parentEl.find('#app-config-json'));
        	$textArea.attr('style', $scope.originalTextAreaStyle);
        };

		$scope.$on('$stateChangeSuccess', function(event, toState /*, fromState , fromParams*/) {
			if (toState && toState.name) {
				if (toState.name === 'author.profile') {
					event.preventDefault();
					$state.go('author.profile.myprofile');
				}

				Utils.getListConfigs().then(function() {
					setProfileData();
					if (toState.name === 'author.profile.myprofile') {
						getUserInfo();
					}
				});

				if (toState.name === 'author.profile.adminpanel') {
					getAvaliableRoles();
					getCachedRequests();
				}

			} else {
				//
			}
		});
	};

	profileController.$inject = ['$rootScope', '$scope', '$state', 'appService', 'accountService', 'User', 'EntityMapper', 'modalService', 'Utils'];
	module.exports = profileController;
})();
