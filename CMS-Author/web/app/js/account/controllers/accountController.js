'use strict';
/*
* @ngdoc controller
* @name raiweb.account.controller:accountController
* @description
*   The account controller provides the scope methods for following:
*   1) Registering User
*   2) Loging User
*   3) For other user account specific operations, methods will be added.
* @requires $rootScope
* @requires $scope
* @requires $state
* @requires appService
*/

(function() {
    var accountController = function($rootScope, $scope, $state, appService, accountService, User, modalService, Utils) {
        $scope.newUser = new User();
        $scope.loginInfo = {};
        $scope.resetPasswordModel = {};

        $scope.retry = function() {
            $scope.success = false;
        };

        $scope.registerSubmit = function() {
            $scope.isRegistering = true;
            accountService.register($scope.newUser).then(function(response) {
                var userName = $scope.newUser.Email;
                $scope.newUser = new User();
                $scope.isRegistering = false;
                if (response && response.data && response.data.code === 'email_not_sent') {
                    var emailSendFailed = modalService.alert('md',
                        'Thanks for joining us.',
                        'You have been successfully registered with us. But Confirmation Mail sending failed. </br>Please Re-send Confirmation Email.',
                        'Re-send Confirmation Email');
                    emailSendFailed.result.then(function() {
                        $state.go('resendverifyemail', {
                            id : userName
                        });
                    }, function() {
                        $state.go('resendverifyemail', {
                            id : userName
                        });
                    });
                } else {
                    var successModal = modalService.alert('md',
                        'Thanks for joining us.',
                        'You have been successfully registered with us. Please go to your mail inbox and verify your Email. Then Sign In.',
                        'Sign In');
                    successModal.result.then(function() {
                        $state.go('login');
                    });
                }
            }, function(rejection){
                $scope.isRegistering = false;
                modalService.alert('md',
                    'Registeration Failed',
                    'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
                    'Try again');
            });
        };

        $scope.loginSubmit = function() {
            $scope.isSigningIn = true;
            accountService.login($scope.loginInfo).then(function() {
                $rootScope.currentUser = accountService.getLoggedInUser();
                $scope.isSigningIn = false;
                modalService.alert('sm', 'Login Successful', 'You are successfully logged in.', 'View Dashboard');
                $state.go('author.dashboard');
            }, function(rejection){
                $rootScope.currentUser = accountService.getLoggedInUser();
                $scope.isSigningIn = false;

                if (rejection && rejection.data && rejection.data.error === 'email_not_verified') {
                    modalService.alert('sm',
                    'Login Failed',
                    rejection && rejection.data && rejection.data.error_description +
                    "</br> Please Go to your mail Inbox and verify your email by clicking the link there" +
                    "</br> Or Resend the Verification Code to your registered Email Id",
                    'Resend Code')
                    .result.then(function() {
                        $state.go('resendverifyemail', {
                            id : $scope.loginInfo.userName
                        });
                    }, function() {
                        $state.go('resendverifyemail', {
                            id : $scope.loginInfo.userName
                        });
                    });
                } else {
                    modalService.alert('sm',
                    'Login Failed',
                    rejection && rejection.data && rejection.data.error_description,
                    'Try again');
                }
            });
        };

        $scope.resendVerifyEmail = function() {
            $scope.isSendingEmail = true;
            accountService.resendVerifyEmail($scope.userName).then(function() {
                modalService.alert('md',
                    'Confirmation E-mail Sent',
                    'Confirmation E-mail has been sent successfully to your registered E-mail. Please click verify link from there.',
                    'Ok');
                $scope.isSendingEmail = false;
            }, function() {
                modalService.alert('md',
                    'Confirmation E-mail Sending Failed',
                    'Confirmation E-mail Sending Failed due to some unknown reason. Please try again.',
                    'try again');
                $scope.isSendingEmail = false;
            });
        };

        function verifyEmail(userName, code) {
            $scope.isVerifying = true;
            accountService.verifyEmail(userName, code).then(function() {
                $scope.isVerified = true;
                $scope.isVerifying = false;
            }, function() {
                $scope.isVerified = false;
                $scope.isVerifying = false;
            });
        }

        $scope.sendResetPasswordEmail = function() {
            $scope.isSendingEmail = true;
            accountService.sendResetPasswordEmail($scope.userName).then(function() {
                modalService.alert('md',
                    'Password Reset E-mail Sent',
                    'An Email has been sent to your registered Email. Please click the link there and follow the instructions to reset your password.',
                    'Ok');
                $scope.isSendingEmail = false;
            }, function() {
                modalService.alert('md',
                    'Password Reset Email Sending - Failed',
                    'Invalid UserName or Email Id. Or an unknown error occured. Please try again.',
                    'try again');
                $scope.isSendingEmail = false;
            });
        };

        $scope.resetPassword = function() {
            $scope.isVerifying = true;
            accountService.resetPassword($scope.resetPasswordModel).then(function() {
                modalService.alert('md',
                    'Password Reset Success',
                    'Your password has been successfully reset. Please login',
                    'Login').result.then(function() {
                        $state.go('login');
                    });
                $scope.isVerifying = false;
            }, function() {
                modalService.alert('md',
                    'Password Reset Failed',
                    'Invalid User Id or Verification Code. Or an unknown error has occured. Pleae try again',
                    'Try Again',
                    'Cancel');
                $scope.isVerifying = false;
            });
        };

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams /*, fromState , fromParams*/) {
            if (toState) {
                // Sets Meta information for Page
                Utils.setMetaInfo(toState.title);
            }

            if (toState && (toState.name === 'verifyemail' || toState.name === 'resetpassword')) {
                var userName = toParams && toParams.id;
                var code = toParams && toParams.code;

                if (toState.name === 'verifyemail') {
                    verifyEmail(userName, code);
                }

                if (toState.name === 'resetpassword') {
                    $scope.resetPasswordModel.userId = userName;
                    $scope.resetPasswordModel.resetPasswordToken = code;
                }
            }

            if (toState && toState.name === 'resendverifyemail') {
                $scope.userName = toParams && toParams.id;
            }
        });
    };

    accountController.$inject = ['$rootScope', '$scope', '$state', 'appService', 'accountService', 'User', 'modalService', 'Utils'];
    module.exports = accountController;
})();
