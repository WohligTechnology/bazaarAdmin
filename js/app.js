// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ngRoute',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice'
]);

firstapp.config(
    function($routeProvider, uiSelectConfig) {

        //        uiSelectConfig.theme = 'bootstrap';
        //        uiSelectConfig.resetSearchInput = true;
        //        uiSelectConfig.appendToBody = true;


        $routeProvider.
        when('/login', {
            templateUrl: 'views/template.html',
            controller: 'login'
        }).
        when('/home', {
            templateUrl: 'views/template.html',
            controller: 'home'
        }).
        when('/user', {
                templateUrl: 'views/template.html',
                controller: 'UserCtrl'
            }).when('/createuser', {
                templateUrl: 'views/template.html',
                controller: 'createUserCtrl'
            }).when('/edituser/:id', {
                templateUrl: 'views/template.html',
                controller: 'editUserCtrl'
            }).when('/category', {
                templateUrl: 'views/template.html',
                controller: 'CategoryCtrl'
            }).when('/createcategory', {
                templateUrl: 'views/template.html',
                controller: 'createCategoryCtrl'
            }).when('/editcategory/:id', {
                templateUrl: 'views/template.html',
                controller: 'editCategoryCtrl'
            }).when('/product', {
                templateUrl: 'views/template.html',
                controller: 'ProductCtrl'
            }).when('/createproduct', {
                templateUrl: 'views/template.html',
                controller: 'createProductCtrl'
            }).when('/editproduct/:id', {
                templateUrl: 'views/template.html',
                controller: 'editProductCtrl'
            }).when('/attribute', {
                templateUrl: 'views/template.html',
                controller: 'AttributeCtrl'
            }).when('/createattribute', {
                templateUrl: 'views/template.html',
                controller: 'createAttributeCtrl'
            }).when('/editattribute/:id', {
                templateUrl: 'views/template.html',
                controller: 'editAttributeCtrl'
            }).when('/order', {
                templateUrl: 'views/template.html',
                controller: 'OrderCtrl'
            }).when('/createorder', {
                templateUrl: 'views/template.html',
                controller: 'createOrderCtrl'
            }).when('/editorder/:id', {
                templateUrl: 'views/template.html',
                controller: 'editOrderCtrl'
            }).when('/discountcoupon', {
                templateUrl: 'views/template.html',
                controller: 'DiscountCouponCtrl'
            }).when('/creatediscountcoupon', {
                templateUrl: 'views/template.html',
                controller: 'createDiscountCouponCtrl'
            }).when('/editdiscountcoupon/:id', {
                templateUrl: 'views/template.html',
                controller: 'editDiscountCouponCtrl'
            }).when('/affilliate', {
                templateUrl: 'views/template.html',
                controller: 'AffilliateCtrl'
            }).when('/createaffilliate', {
                templateUrl: 'views/template.html',
                controller: 'createAffilliateCtrl'
            }).when('/editaffilliate/:id', {
                templateUrl: 'views/template.html',
                controller: 'editAffilliateCtrl'
            }).when('/slider', {
                templateUrl: 'views/template.html',
                controller: 'SliderCtrl'
            }).when('/createslider', {
                templateUrl: 'views/template.html',
                controller: 'createSliderCtrl'
            }).when('/editslider/:id', {
                templateUrl: 'views/template.html',
                controller: 'editSliderCtrl'
            }).when('/pages', {
                templateUrl: 'views/template.html',
                controller: 'PagesCtrl'
            }).when('/createpages', {
                templateUrl: 'views/template.html',
                controller: 'createPagesCtrl'
            }).when('/editpages/:id', {
                templateUrl: 'views/template.html',
                controller: 'editPagesCtrl'
            }).when('/blocks', {
                templateUrl: 'views/template.html',
                controller: 'BlocksCtrl'
            }).when('/createblocks', {
                templateUrl: 'views/template.html',
                controller: 'createBlocksCtrl'
            }).when('/editblocks/:id', {
                templateUrl: 'views/template.html',
                controller: 'editBlocksCtrl'
            }).when('/deal', {
                templateUrl: 'views/template.html',
                controller: 'DealCtrl'
            }).when('/createdeal', {
                templateUrl: 'views/template.html',
                controller: 'createDealCtrl'
            }).when('/editdeal/:id', {
                templateUrl: 'views/template.html',
                controller: 'editDealCtrl'
            }).when('/dealoftheday', {
                templateUrl: 'views/template.html',
                controller: 'DealofthedayCtrl'
            }).when('/createdealoftheday', {
                templateUrl: 'views/template.html',
                controller: 'createDealofthedayCtrl'
            }).when('/editdealoftheday/:id', {
                templateUrl: 'views/template.html',
                controller: 'editDealofthedayCtrl'
            }).when('/brand', {
                templateUrl: 'views/template.html',
                controller: 'BrandCtrl'
            }).when('/createbrand', {
                templateUrl: 'views/template.html',
                controller: 'createBrandCtrl'
            }).when('/editbrand/:id', {
                templateUrl: 'views/template.html',
                controller: 'editBrandCtrl'
            }).when('/faq', {
                templateUrl: 'views/template.html',
                controller: 'FaqCtrl'
            }).when('/createfaq', {
                templateUrl: 'views/template.html',
                controller: 'createFaqCtrl'
            }).when('/editfaq/:id', {
                templateUrl: 'views/template.html',
                controller: 'editFaqCtrl'
            }).when('/enquiry', {
                templateUrl: 'views/template.html',
                controller: 'EnquiryCtrl'
            }).when('/createenquiry', {
                templateUrl: 'views/template.html',
                controller: 'createEnquiryCtrl'
            }).when('/editenquiry/:id', {
                templateUrl: 'views/template.html',
                controller: 'editEnquiryCtrl'
            }). //Add New Path

        otherwise({
            redirectTo: '/login'
        });
    });
firstapp.filter('uploadpath', function() {
    return function(input) {
        return adminurl + "uploadfile/resize?file=" + input;
        // return adminurl + "user/resize?file=" + input + "width=800";
    };
});

firstapp.directive('array', function() {
    return {
        restrict: 'EA',
        scope: {
            GalleryStructure: "=objval",
            EditVal: "=editval",
            ModelObj: "=modelobj"
        },
        replace: false,
        templateUrl: "views/directive/array.html",
        link: function($scope, element, attr) {
            console.log($scope.EditVal);
            var GalleryStructure = $scope.GalleryStructure;
            var EditVal = $scope.EditVal;
            $scope.label = attr.label;
            $scope.GalleryStrucObj = {};
            $scope.GalleryStrucObj.keyOf = _.pluck(GalleryStructure, "name");
            $scope.GalleryStrucObj.structure = GalleryStructure;
            $scope.GalleryStrucObj.valuesOf = [];
            $scope.GalleryStrucObj.valuesOf = EditVal;
            $scope.GalleryStrucObj.nullObj = {};
            _.each($scope.GalleryStrucObj.keyOf, function(n, key) {
                $scope.GalleryStrucObj.nullObj[n] = "";
            });
            $scope.GalleryStrucObj.add = function() {
                $scope.GalleryStrucObj.valuesOf.push(_.clone($scope.GalleryStrucObj.nullObj, true));
            };
            $scope.GalleryStrucObj.remove = function(obj) {
                var objkey = _.remove($scope.GalleryStrucObj.valuesOf, obj);
            };
            $scope.EditVal = $scope.GalleryStrucObj.valuesOf;
        }
    }
});

firstapp.directive('createovalidation', function() {
    return {
        restrict: 'EA',
        replace: false,
        link: function($scope, element, attr) {
            $element = $(element);
            var validation = $scope[attr.createovalidation].structure[attr.objkey].validation;
            _.each(validation, function(n) {
                var m = n.split("=");
                if (!m[1]) {
                    m[1] = "";
                }
                $element.attr(m[0], m[1]);
            });
        }
    }
});


firstapp.directive('capitalizeFirst', function($parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            var capitalize = function(inputValue) {
                if (inputValue === undefined) {
                    inputValue = '';
                }
                var capitalized = inputValue.charAt(0).toUpperCase() +
                    inputValue.substring(1);
                if (capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
        }
    };
});
firstapp.filter('touppercase', function() {
    return function(input) {
        var firstletter = input.substr(0, 1);
        var remaining = input.substr(1);
        return firstletter.toUpperCase() + remaining;
    };
});
firstapp.directive('onlyDigits', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
