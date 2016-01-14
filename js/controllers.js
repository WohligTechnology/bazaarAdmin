var uploadres = [];
var selectedData = [];
var abc = {};
var phonecatControllers = angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ngDialog', 'angularFileUpload', 'ui.select', 'ngSanitize']);

window.uploadUrl = 'http://tagboss.wohlig.com/uploadfile/upload';

phonecatControllers.controller('home', function ($scope, TemplateService, NavigationService, $routeParams, $location) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive("Dashboard");
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = "";
	TemplateService.content = "views/dashboard.html";
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	//  NavigationService.countUser(function(data, status) {
	//    $scope.user = data;
	//  });
});
phonecatControllers.controller('login', function ($scope, TemplateService, NavigationService, $routeParams, $location) {
	$scope.template = TemplateService;
	TemplateService.content = "views/login.html";
	TemplateService.list = 3;

	$scope.navigation = NavigationService.getnav();
	$.jStorage.flush();
	$scope.isValidLogin = 1;
	$scope.login = {};
	$scope.verifylogin = function () {
		console.log($scope.login);
		if ($scope.login.email && $scope.login.password) {
			NavigationService.adminLogin($scope.login, function (data, status) {
				if (data.value == "false") {
					$scope.isValidLogin = 0;
				} else {
					$scope.isValidLogin = 1;
					$.jStorage.set("adminuser", data);
					$location.url("/home");
				}
			})
		} else {
			console.log("blank login");
			$scope.isValidLogin = 0;
		}

	}
});
phonecatControllers.controller('headerctrl', function ($scope, TemplateService, $location, $routeParams, NavigationService) {
	$scope.template = TemplateService;
	 if (!$.jStorage.get("adminuser")) {
	   $location.url("/login");
	
	 }
});

phonecatControllers.controller('createorder', function ($scope, TemplateService, NavigationService, ngDialog, $routeParams, $location) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive("Orders");
	TemplateService.title = $scope.menutitle;
	TemplateService.list = 2;
	TemplateService.content = "views/createorder.html";
	$scope.navigation = NavigationService.getnav();
	console.log($routeParams.id);

	$scope.order = {};

	$scope.submitForm = function () {
		console.log($scope.order);
		NavigationService.saveOrder($scope.order, function (data, status) {
			console.log(data);
			$location.url("/order");
		});
	};


	$scope.order.tag = [];
	$scope.ismatch = function (data, select) {
		abc.select = select;
		_.each(data, function (n, key) {
			if (typeof n == 'string') {
				var item = {
					_id: _.now(),
					name: _.capitalize(n),
					category: $scope.artwork.type
				};
				NavigationService.saveTag(item, function (data, status) {
					if (data.value == true) {
						item._id = data.id;
					}
				});
				select.selected = _.without(select.selected, n);
				select.selected.push(item);
				$scope.order.tag = select.selected;
			}
		});
		console.log($scope.artwork.tag);
	}


	$scope.refreshOrder = function (search) {
		$scope.tag = [];
		if (search) {
			NavigationService.findArtMedium(search, $scope.order.tag, function (data, status) {
				$scope.tag = data;
			});
		}
	};

	$scope.GalleryStructure = [{
		"name": "name",
		"type": "text",
		"validation": [
            "required",
            "minlength",
            "min=5"
        ]
    }, {
		"name": "image",
		"type": "image"
    }, {
		"name": "name",
		"type": "text",
		"validation": [
            "required",
            "minlength",
            "min=5"
        ]
    }];

	$scope.persons = [{
		"id": 1,
		"name": "first option"
    }, {
		"id": 2,
		"name": "first option"
    }, {
		"id": 3,
		"name": "first option"
    }, {
		"id": 4,
		"name": "first option"
    }, {
		"id": 5,
		"name": "first option"
    }];

	NavigationService.getUser(function (data, status) {
		$scope.persons = data;
	});

});




//User Controller
phonecatControllers.controller('UserCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('User');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/user.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.User = [];
	$scope.pagedata = {};
	$scope.pagedata.page = 1;
	$scope.pagedata.limit = '20';
	$scope.pagedata.search = '';
	$scope.number = 100;
	$scope.reload = function (pagedata) {
		$scope.pagedata = pagedata;
		NavigationService.findLimitedUser($scope.pagedata, function (data, status) {
			$scope.user = data;
			$scope.pages = [];
			var newclass = '';
			for (var i = 1; i <= data.totalpages; i++) {
				if (pagedata.page == i) {
					newclass = 'active';
				} else {
					newclass = '';
				}
				$scope.pages.push({
					pageno: i,
					class: newclass
				});
			}
		});
	}
	$scope.reload($scope.pagedata);
	$scope.confDelete = function () {
		NavigationService.deleteUser(function (data, status) {
			ngDialog.close();
			window.location.reload();
		});
	}
	$scope.deletefun = function (id) {
			$.jStorage.set('deleteuser', id);
			ngDialog.open({
				template: 'views/delete.html',
				closeByEscape: false,
				controller: 'UserCtrl',
				closeByDocument: false
			});
		}
		//End User
});
//user Controller
//createUser Controller
phonecatControllers.controller('createUserCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('User');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/createuser.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.user = {};
	$scope.submitForm = function () {
		NavigationService.saveUser($scope.user, function (data, status) {
			$location.url('/user');
		});
	};
	//createUser
});
//createUser Controller
//editUser Controller
phonecatControllers.controller('editUserCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('User');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/edituser.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.user = {};
	NavigationService.getOneUser($routeParams.id, function (data, status) {
		$scope.user = data; //Add More Array
	});
	$scope.submitForm = function () {
		$scope.user._id = $routeParams.id;
		NavigationService.saveUser($scope.user, function (data, status) {
			$location.url('/user');
		});
	};
	//editUser
});
//editUser Controller
//Category Controller
phonecatControllers.controller('CategoryCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Category');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/category.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.Category = [];
	$scope.pagedata = {};
	$scope.pagedata.page = 1;
	$scope.pagedata.limit = '20';
	$scope.pagedata.search = '';
	$scope.number = 100;
	$scope.reload = function (pagedata) {
		$scope.pagedata = pagedata;
		NavigationService.findLimitedCategory($scope.pagedata, function (data, status) {
			$scope.category = data;
			$scope.pages = [];
			var newclass = '';
			for (var i = 1; i <= data.totalpages; i++) {
				if (pagedata.page == i) {
					newclass = 'active';
				} else {
					newclass = '';
				}
				$scope.pages.push({
					pageno: i,
					class: newclass
				});
			}
		});
	}
	$scope.reload($scope.pagedata);
	$scope.confDelete = function () {
		NavigationService.deleteCategory(function (data, status) {
			ngDialog.close();
			window.location.reload();
		});
	}
	$scope.deletefun = function (id) {
			$.jStorage.set('deletecategory', id);
			ngDialog.open({
				template: 'views/delete.html',
				closeByEscape: false,
				controller: 'CategoryCtrl',
				closeByDocument: false
			});
		}
		//End Category
});
//category Controller
//createCategory Controller
phonecatControllers.controller('createCategoryCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog, $upload, $timeout) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Category');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/createcategory.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.category = {};

	$scope.removeimage = function () {
		$scope.category.image = '';
	};

	var imagejstupld = "";
	$scope.category.image = '';
	$scope.usingFlash = FileAPI && FileAPI.upload != null;
	$scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
	$scope.uploadRightAway = true;
	$scope.changeAngularVersion = function () {
		window.location.hash = $scope.angularVersion;
		window.location.reload(true);
	};
	$scope.hasUploader = function (index) {
		return $scope.upload[index] != null;
	};
	$scope.abort = function (index) {
		$scope.upload[index].abort();
		$scope.upload[index] = null;
	};
	$scope.angularVersion = window.location.hash.length > 1 ? (window.location.hash.indexOf('/') === 1 ?
		window.location.hash.substring(2) : window.location.hash.substring(1)) : '1.2.20';
	$scope.onFileSelect = function ($files) {
		$scope.selectedFiles = [];
		$scope.progress = [];
		console.log($files);
		if ($scope.upload && $scope.upload.length > 0) {
			for (var i = 0; i < $scope.upload.length; i++) {
				if ($scope.upload[i] != null) {
					$scope.upload[i].abort();
				}
			}
		}
		$scope.upload = [];
		$scope.uploadResult = uploadres;
		$scope.selectedFiles = $files;
		$scope.dataUrls = [];
		for (var i = 0; i < $files.length; i++) {
			var $file = $files[i];
			if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL($files[i]);
				var loadFile = function (fileReader, index) {
					fileReader.onload = function (e) {
						$timeout(function () {
							$scope.dataUrls[index] = e.target.result;
						});
					}
				}(fileReader, i);
			}
			$scope.progress[i] = -1;
			if ($scope.uploadRightAway) {
				$scope.start(i);
			}
		}
	};

	$scope.start = function (index) {
		$scope.progress[index] = 0;
		$scope.errorMsg = null;
		console.log($scope.howToSend = 1);
		if ($scope.howToSend == 1) {
			$scope.upload[index] = $upload.upload({
				url: uploadUrl,
				method: $scope.httpMethod,
				headers: {
					'Content-Type': 'Content-Type'
				},
				data: {
					myModel: $scope.myModel
				},
				file: $scope.selectedFiles[index],
				fileFormDataName: 'file'
			});
			$scope.upload[index].then(function (response) {
				$timeout(function () {
					$scope.uploadResult.push(response.data);
					imagejstupld = response.data;
					if (imagejstupld != "") {
						console.log(response.data);
						$scope.category.image = imagejstupld.files[0].fd;
						imagejstupld = "";
					}
				});
			}, function (response) {
				if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
			}, function (evt) {
				$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
			$scope.upload[index].xhr(function (xhr) {});
		} else {
			var fileReader = new FileReader();
			fileReader.onload = function (e) {
				$scope.upload[index] = $upload.http({
					url: uploadUrl,
					headers: {
						'Content-Type': $scope.selectedFiles[index].type
					},
					data: e.target.result
				}).then(function (response) {
					$scope.uploadResult.push(response.data);
				}, function (response) {
					if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
				}, function (evt) {
					$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
			}
			fileReader.readAsArrayBuffer($scope.selectedFiles[index]);
		}
	};

	$scope.dragOverClass = function ($event) {
		var items = $event.dataTransfer.items;
		var hasFile = false;
		if (items != null) {
			for (var i = 0; i < items.length; i++) {
				if (items[i].kind == 'file') {
					hasFile = true;
					break;
				}
			}
		} else {
			hasFile = true;
		}
		return hasFile ? "dragover" : "dragover-err";
	};

	$scope.category.parent = [];
	$scope.refreshCategory = function (search) {
		$scope.categories = [];
		if (search) {
			NavigationService.findCategory(search, $scope.category.parent, function (data, status) {
				if (data.value != false) {
					$scope.categories = data;
				}
			});
		}
	};

	$scope.submitForm = function () {
		var arr = [];
		_.each($scope.category.parent, function (n) {
			var obj = {};
			obj._id = n._id;
			obj.name = n.name;
			arr.push(obj);
		})
		$scope.category.parent = arr;
		NavigationService.saveCategory($scope.category, function (data, status) {
			$location.url('/category');
		});
	};
	//createCategory
});
//createCategory Controller
//editCategory Controller
phonecatControllers.controller('editCategoryCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog, $upload, $timeout) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Category');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/editcategory.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.category = {};
	NavigationService.getOneCategory($routeParams.id, function (data, status) {
		$scope.category = data; //Add More Array
		// if (!$scope.category.parent || $scope.category.parent.length == 0) {
		// 	$scope.category.parent = [];
		// }
	});

	$scope.removeimage = function () {
		$scope.category.image = '';
	};

	var imagejstupld = "";
	$scope.category.image = '';
	$scope.usingFlash = FileAPI && FileAPI.upload != null;
	$scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
	$scope.uploadRightAway = true;
	$scope.changeAngularVersion = function () {
		window.location.hash = $scope.angularVersion;
		window.location.reload(true);
	};
	$scope.hasUploader = function (index) {
		return $scope.upload[index] != null;
	};
	$scope.abort = function (index) {
		$scope.upload[index].abort();
		$scope.upload[index] = null;
	};
	$scope.angularVersion = window.location.hash.length > 1 ? (window.location.hash.indexOf('/') === 1 ?
		window.location.hash.substring(2) : window.location.hash.substring(1)) : '1.2.20';
	$scope.onFileSelect = function ($files) {
		$scope.selectedFiles = [];
		$scope.progress = [];
		console.log($files);
		if ($scope.upload && $scope.upload.length > 0) {
			for (var i = 0; i < $scope.upload.length; i++) {
				if ($scope.upload[i] != null) {
					$scope.upload[i].abort();
				}
			}
		}
		$scope.upload = [];
		$scope.uploadResult = uploadres;
		$scope.selectedFiles = $files;
		$scope.dataUrls = [];
		for (var i = 0; i < $files.length; i++) {
			var $file = $files[i];
			if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL($files[i]);
				var loadFile = function (fileReader, index) {
					fileReader.onload = function (e) {
						$timeout(function () {
							$scope.dataUrls[index] = e.target.result;
						});
					}
				}(fileReader, i);
			}
			$scope.progress[i] = -1;
			if ($scope.uploadRightAway) {
				$scope.start(i);
			}
		}
	};

	$scope.start = function (index) {
		$scope.progress[index] = 0;
		$scope.errorMsg = null;
		console.log($scope.howToSend = 1);
		if ($scope.howToSend == 1) {
			$scope.upload[index] = $upload.upload({
				url: uploadUrl,
				method: $scope.httpMethod,
				headers: {
					'Content-Type': 'Content-Type'
				},
				data: {
					myModel: $scope.myModel
				},
				file: $scope.selectedFiles[index],
				fileFormDataName: 'file'
			});
			$scope.upload[index].then(function (response) {
				$timeout(function () {
					$scope.uploadResult.push(response.data);
					imagejstupld = response.data;
					if (imagejstupld != "") {
						console.log(response.data);
						$scope.category.image = imagejstupld.files[0].fd;
						imagejstupld = "";
					}
				});
			}, function (response) {
				if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
			}, function (evt) {
				$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
			$scope.upload[index].xhr(function (xhr) {});
		} else {
			var fileReader = new FileReader();
			fileReader.onload = function (e) {
				$scope.upload[index] = $upload.http({
					url: uploadUrl,
					headers: {
						'Content-Type': $scope.selectedFiles[index].type
					},
					data: e.target.result
				}).then(function (response) {
					$scope.uploadResult.push(response.data);
				}, function (response) {
					if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
				}, function (evt) {
					$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
			}
			fileReader.readAsArrayBuffer($scope.selectedFiles[index]);
		}
	};

	$scope.dragOverClass = function ($event) {
		var items = $event.dataTransfer.items;
		var hasFile = false;
		if (items != null) {
			for (var i = 0; i < items.length; i++) {
				if (items[i].kind == 'file') {
					hasFile = true;
					break;
				}
			}
		} else {
			hasFile = true;
		}
		return hasFile ? "dragover" : "dragover-err";
	};

	$scope.refreshCategory = function (search) {
		$scope.categories = [];
		if (search) {
			NavigationService.findCategory(search, $scope.category.parent, function (data, status) {
				if (data.value != false) {
					$scope.categories = data;
				}
			});
		}
	};

	$scope.submitForm = function () {
		$scope.category._id = $routeParams.id;
		var arr = [];
		_.each($scope.category.parent, function (n) {
			var obj = {};
			obj._id = n._id;
			obj.name = n.name;
			arr.push(obj);
		})
		$scope.category.parent = arr;
		NavigationService.saveCategory($scope.category, function (data, status) {
			$location.url('/category');
		});
	};
	//editCategory
});
//editCategory Controller
//Product Controller
phonecatControllers.controller('ProductCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Product');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/product.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.Product = [];
	$scope.pagedata = {};
	$scope.pagedata.page = 1;
	$scope.pagedata.limit = '20';
	$scope.pagedata.search = '';
	$scope.number = 100;
	$scope.reload = function (pagedata) {
		$scope.pagedata = pagedata;
		NavigationService.findLimitedProduct($scope.pagedata, function (data, status) {
			$scope.product = data;
			$scope.pages = [];
			var newclass = '';
			for (var i = 1; i <= data.totalpages; i++) {
				if (pagedata.page == i) {
					newclass = 'active';
				} else {
					newclass = '';
				}
				$scope.pages.push({
					pageno: i,
					class: newclass
				});
			}
		});
	}
	$scope.reload($scope.pagedata);
	$scope.confDelete = function () {
		NavigationService.deleteProduct(function (data, status) {
			ngDialog.close();
			window.location.reload();
		});
	}
	$scope.deletefun = function (id) {
			$.jStorage.set('deleteproduct', id);
			ngDialog.open({
				template: 'views/delete.html',
				closeByEscape: false,
				controller: 'ProductCtrl',
				closeByDocument: false
			});
		}
		//End Product
});
//product Controller
//createProduct Controller
phonecatControllers.controller('createProductCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog, $upload, $timeout) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Product');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/createproduct.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.product = {};
	$scope.submitForm = function () {
		var arr = [];
		_.each($scope.product.category, function (n) {
			var obj = {};
			obj._id = n._id;
			obj.name = n.name;
			arr.push(obj);
		})
		$scope.product.category = arr;
		NavigationService.saveProduct($scope.product, function (data, status) {
			$location.url('/product');
		});
	};

	$scope.product.tag = [];
	$scope.ismatchTag = function (data, select) {
		_.each(data, function (l, key) {
			if (typeof l == 'string') {
				var item = {
					_id: _.now(),
					name: _.capitalize(l)
				};
				NavigationService.saveTag(item, function (data, status) {
					if (data.value == true) {
						item._id = data.id;
					}
				});
				select.selected = _.without(select.selected, l);
				select.selected.push(item);
				$scope.product.tag = select.selected;
			}
		});
	}
	$scope.refreshTag = function (search) {
		$scope.tag = [];
		if (search) {
			NavigationService.findTag(search, $scope.product.tag, function (data, status) {
				if (data.value != false) {
					$scope.tag = data;
				}
			});
		}
	};
	$scope.product.keyword = [];
	$scope.ismatchKeyword = function (data, select) {
		_.each(data, function (l, key) {
			if (typeof l == 'string') {
				var item = {
					_id: _.now(),
					name: _.capitalize(l)
				};
				NavigationService.saveKeyword(item, function (data, status) {
					if (data.value == true) {
						item._id = data.id;
					}
				});
				select.selected = _.without(select.selected, l);
				select.selected.push(item);
				$scope.product.keyword = select.selected;
			}
		});
	}
	$scope.refreshKeyword = function (search) {
		$scope.keyword = [];
		if (search) {
			NavigationService.findKeyword(search, $scope.product.keyword, function (data, status) {
				if (data.value != false) {
					$scope.keyword = data;
				}
			});
		}
	};

	$scope.removeimage = function (i) {
		$scope.product.image.splice(i, 1);
	};

	var imagejstupld = "";
	$scope.product.image = [];
	$scope.usingFlash = FileAPI && FileAPI.upload != null;
	$scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
	$scope.uploadRightAway = true;
	$scope.changeAngularVersion = function () {
		window.location.hash = $scope.angularVersion;
		window.location.reload(true);
	};
	$scope.hasUploader = function (index) {
		return $scope.upload[index] != null;
	};
	$scope.abort = function (index) {
		$scope.upload[index].abort();
		$scope.upload[index] = null;
	};
	$scope.angularVersion = window.location.hash.length > 1 ? (window.location.hash.indexOf('/') === 1 ?
		window.location.hash.substring(2) : window.location.hash.substring(1)) : '1.2.20';
	$scope.onFileSelect = function ($files) {
		$scope.selectedFiles = [];
		$scope.progress = [];
		console.log($files);
		if ($scope.upload && $scope.upload.length > 0) {
			for (var i = 0; i < $scope.upload.length; i++) {
				if ($scope.upload[i] != null) {
					$scope.upload[i].abort();
				}
			}
		}
		$scope.upload = [];
		$scope.uploadResult = uploadres;
		$scope.selectedFiles = $files;
		$scope.dataUrls = [];
		for (var i = 0; i < $files.length; i++) {
			var $file = $files[i];
			if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL($files[i]);
				var loadFile = function (fileReader, index) {
					fileReader.onload = function (e) {
						$timeout(function () {
							$scope.dataUrls[index] = e.target.result;
						});
					}
				}(fileReader, i);
			}
			$scope.progress[i] = -1;
			if ($scope.uploadRightAway) {
				$scope.start(i);
			}
		}
	};

	$scope.start = function (index) {
		$scope.progress[index] = 0;
		$scope.errorMsg = null;
		console.log($scope.howToSend = 1);
		if ($scope.howToSend == 1) {
			$scope.upload[index] = $upload.upload({
				url: uploadUrl,
				method: $scope.httpMethod,
				headers: {
					'Content-Type': 'Content-Type'
				},
				data: {
					myModel: $scope.myModel
				},
				file: $scope.selectedFiles[index],
				fileFormDataName: 'file'
			});
			$scope.upload[index].then(function (response) {
				$timeout(function () {
					$scope.uploadResult.push(response.data);
					imagejstupld = response.data;
					if (imagejstupld != "") {
						console.log(response.data);
						$scope.product.image.push(imagejstupld.files[0].fd);
						imagejstupld = "";
					}
				});
			}, function (response) {
				if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
			}, function (evt) {
				$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
			$scope.upload[index].xhr(function (xhr) {});
		} else {
			var fileReader = new FileReader();
			fileReader.onload = function (e) {
				$scope.upload[index] = $upload.http({
					url: uploadUrl,
					headers: {
						'Content-Type': $scope.selectedFiles[index].type
					},
					data: e.target.result
				}).then(function (response) {
					$scope.uploadResult.push(response.data);
				}, function (response) {
					if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
				}, function (evt) {
					$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
			}
			fileReader.readAsArrayBuffer($scope.selectedFiles[index]);
		}
	};

	$scope.dragOverClass = function ($event) {
		var items = $event.dataTransfer.items;
		var hasFile = false;
		if (items != null) {
			for (var i = 0; i < items.length; i++) {
				if (items[i].kind == 'file') {
					hasFile = true;
					break;
				}
			}
		} else {
			hasFile = true;
		}
		return hasFile ? "dragover" : "dragover-err";
	};

	$scope.product.category = [];
	$scope.refreshCategory = function (search) {
		$scope.category = [];
		if (search) {
			NavigationService.findCategory(search, $scope.product.category, function (data, status) {
				if (data.value != false) {
					$scope.category = data;
				}
			});
		}
	};

	//createProduct
});
//createProduct Controller
//editProduct Controller
phonecatControllers.controller('editProductCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog, $upload, $timeout) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Product');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/editproduct.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.product = {};
	NavigationService.getOneProduct($routeParams.id, function (data, status) {
		$scope.product = data; //Add More Array
	});
	$scope.submitForm = function () {
		$scope.product._id = $routeParams.id;
		var arr = [];
		_.each($scope.product.category, function (n) {
			var obj = {};
			obj._id = n._id;
			obj.name = n.name;
			arr.push(obj);
		})
		$scope.product.category = arr;
		NavigationService.saveProduct($scope.product, function (data, status) {
			$location.url('/product');
		});
	};

	$scope.product.tag = [];
	$scope.ismatchTag = function (data, select) {
		_.each(data, function (l, key) {
			if (typeof l == 'string') {
				var item = {
					_id: _.now(),
					name: _.capitalize(l)
				};
				NavigationService.saveTag(item, function (data, status) {
					if (data.value == true) {
						item._id = data.id;
					}
				});
				select.selected = _.without(select.selected, l);
				select.selected.push(item);
				$scope.product.tag = select.selected;
			}
		});
	}
	$scope.refreshTag = function (search) {
		$scope.tag = [];
		if (search) {
			NavigationService.findTag(search, $scope.product.tag, function (data, status) {
				if (data.value != false) {
					$scope.tag = data;
				}
			});
		}
	};
	$scope.product.keyword = [];
	$scope.ismatchKeyword = function (data, select) {
		_.each(data, function (l, key) {
			if (typeof l == 'string') {
				var item = {
					_id: _.now(),
					name: _.capitalize(l)
				};
				NavigationService.saveKeyword(item, function (data, status) {
					if (data.value == true) {
						item._id = data.id;
					}
				});
				select.selected = _.without(select.selected, l);
				select.selected.push(item);
				$scope.product.keyword = select.selected;
			}
		});
	}
	$scope.refreshKeyword = function (search) {
		$scope.keyword = [];
		if (search) {
			NavigationService.findKeyword(search, $scope.product.keyword, function (data, status) {
				if (data.value != false) {
					$scope.keyword = data;
				}
			});
		}
	};

	$scope.removeimage = function (i) {
		$scope.product.image.splice(i, 1);
	};

	var imagejstupld = "";
	$scope.usingFlash = FileAPI && FileAPI.upload != null;
	$scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
	$scope.uploadRightAway = true;
	$scope.changeAngularVersion = function () {
		window.location.hash = $scope.angularVersion;
		window.location.reload(true);
	};
	$scope.hasUploader = function (index) {
		return $scope.upload[index] != null;
	};
	$scope.abort = function (index) {
		$scope.upload[index].abort();
		$scope.upload[index] = null;
	};
	$scope.angularVersion = window.location.hash.length > 1 ? (window.location.hash.indexOf('/') === 1 ?
		window.location.hash.substring(2) : window.location.hash.substring(1)) : '1.2.20';
	$scope.onFileSelect = function ($files) {
		$scope.selectedFiles = [];
		$scope.progress = [];
		console.log($files);
		if ($scope.upload && $scope.upload.length > 0) {
			for (var i = 0; i < $scope.upload.length; i++) {
				if ($scope.upload[i] != null) {
					$scope.upload[i].abort();
				}
			}
		}
		$scope.upload = [];
		$scope.uploadResult = uploadres;
		$scope.selectedFiles = $files;
		$scope.dataUrls = [];
		for (var i = 0; i < $files.length; i++) {
			var $file = $files[i];
			if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL($files[i]);
				var loadFile = function (fileReader, index) {
					fileReader.onload = function (e) {
						$timeout(function () {
							$scope.dataUrls[index] = e.target.result;
						});
					}
				}(fileReader, i);
			}
			$scope.progress[i] = -1;
			if ($scope.uploadRightAway) {
				$scope.start(i);
			}
		}
	};

	$scope.start = function (index) {
		$scope.progress[index] = 0;
		$scope.errorMsg = null;
		console.log($scope.howToSend = 1);
		if ($scope.howToSend == 1) {
			$scope.upload[index] = $upload.upload({
				url: uploadUrl,
				method: $scope.httpMethod,
				headers: {
					'Content-Type': 'Content-Type'
				},
				data: {
					myModel: $scope.myModel
				},
				file: $scope.selectedFiles[index],
				fileFormDataName: 'file'
			});
			$scope.upload[index].then(function (response) {
				$timeout(function () {
					$scope.uploadResult.push(response.data);
					imagejstupld = response.data;
					if (imagejstupld != "") {
						$scope.product.image.push(imagejstupld.files[0].fd);
						imagejstupld = "";
					}
				});
			}, function (response) {
				if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
			}, function (evt) {
				$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
			$scope.upload[index].xhr(function (xhr) {});
		} else {
			var fileReader = new FileReader();
			fileReader.onload = function (e) {
				$scope.upload[index] = $upload.http({
					url: uploadUrl,
					headers: {
						'Content-Type': $scope.selectedFiles[index].type
					},
					data: e.target.result
				}).then(function (response) {
					$scope.uploadResult.push(response.data);
				}, function (response) {
					if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
				}, function (evt) {
					$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
			}
			fileReader.readAsArrayBuffer($scope.selectedFiles[index]);
		}
	};

	$scope.dragOverClass = function ($event) {
		var items = $event.dataTransfer.items;
		var hasFile = false;
		if (items != null) {
			for (var i = 0; i < items.length; i++) {
				if (items[i].kind == 'file') {
					hasFile = true;
					break;
				}
			}
		} else {
			hasFile = true;
		}
		return hasFile ? "dragover" : "dragover-err";
	};

	$scope.refreshCategory = function (search) {
		$scope.category = [];
		if (search) {
			NavigationService.findCategory(search, $scope.product.category, function (data, status) {
				if (data.value != false) {
					$scope.category = data;
				}
			});
		}
	};

	//editProduct
});
//editProduct Controller
//Attribute Controller
phonecatControllers.controller('AttributeCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Attribute');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/attribute.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.Attribute = [];
	$scope.pagedata = {};
	$scope.pagedata.page = 1;
	$scope.pagedata.limit = '20';
	$scope.pagedata.search = '';
	$scope.number = 100;
	$scope.reload = function (pagedata) {
		$scope.pagedata = pagedata;
		NavigationService.findLimitedAttribute($scope.pagedata, function (data, status) {
			$scope.attribute = data;
			$scope.pages = [];
			var newclass = '';
			for (var i = 1; i <= data.totalpages; i++) {
				if (pagedata.page == i) {
					newclass = 'active';
				} else {
					newclass = '';
				}
				$scope.pages.push({
					pageno: i,
					class: newclass
				});
			}
		});
	}
	$scope.reload($scope.pagedata);
	$scope.confDelete = function () {
		NavigationService.deleteAttribute(function (data, status) {
			ngDialog.close();
			window.location.reload();
		});
	}
	$scope.deletefun = function (id) {
			$.jStorage.set('deleteattribute', id);
			ngDialog.open({
				template: 'views/delete.html',
				closeByEscape: false,
				controller: 'AttributeCtrl',
				closeByDocument: false
			});
		}
		//End Attribute
});
//attribute Controller
//createAttribute Controller
phonecatControllers.controller('createAttributeCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Attribute');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/createattribute.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.attribute = {};
	$scope.submitForm = function () {
		NavigationService.saveAttribute($scope.attribute, function (data, status) {
			$location.url('/attribute');
		});
	};
	//createAttribute
});
//createAttribute Controller
//editAttribute Controller
phonecatControllers.controller('editAttributeCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Attribute');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/editattribute.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.attribute = {};
	NavigationService.getOneAttribute($routeParams.id, function (data, status) {
		$scope.attribute = data; //Add More Array
	});
	$scope.submitForm = function () {
		$scope.attribute._id = $routeParams.id;
		NavigationService.saveAttribute($scope.attribute, function (data, status) {
			$location.url('/attribute');
		});
	};
	//editAttribute
});
//editAttribute Controller
//Order Controller
phonecatControllers.controller('OrderCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Order');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/order.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.Order = [];
	$scope.pagedata = {};
	$scope.pagedata.page = 1;
	$scope.pagedata.limit = '20';
	$scope.pagedata.search = '';
	$scope.number = 100;
	$scope.reload = function (pagedata) {
		$scope.pagedata = pagedata;
		NavigationService.findLimitedOrder($scope.pagedata, function (data, status) {
			$scope.order = data;
			$scope.pages = [];
			var newclass = '';
			for (var i = 1; i <= data.totalpages; i++) {
				if (pagedata.page == i) {
					newclass = 'active';
				} else {
					newclass = '';
				}
				$scope.pages.push({
					pageno: i,
					class: newclass
				});
			}
		});
	}
	$scope.reload($scope.pagedata);
	$scope.confDelete = function () {
		NavigationService.deleteOrder(function (data, status) {
			ngDialog.close();
			window.location.reload();
		});
	}
	$scope.deletefun = function (id) {
			$.jStorage.set('deleteorder', id);
			ngDialog.open({
				template: 'views/delete.html',
				closeByEscape: false,
				controller: 'OrderCtrl',
				closeByDocument: false
			});
		}
		//End Order
});
//order Controller
//createOrder Controller
phonecatControllers.controller('createOrderCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Order');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/createorder.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.order = {};
	$scope.submitForm = function () {
		NavigationService.saveOrder($scope.order, function (data, status) {
			$location.url('/order');
		});
	};
	NavigationService.getUser(function (data, status) {
		$scope.user = data;
	});
	//createOrder
});
//createOrder Controller
//editOrder Controller
phonecatControllers.controller('editOrderCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Order');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/editorder.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.order = {};
	NavigationService.getOneOrder($routeParams.id, function (data, status) {
		$scope.order = data; //Add More Array
	});
	$scope.submitForm = function () {
		$scope.order._id = $routeParams.id;
		NavigationService.saveOrder($scope.order, function (data, status) {
			$location.url('/order');
		});
	};
	NavigationService.getUser(function (data, status) {
		$scope.user = data;
	});
	//editOrder
});
//editOrder Controller
//DiscountCoupon Controller
phonecatControllers.controller('DiscountCouponCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('DiscountCoupon');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/discountcoupon.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.DiscountCoupon = [];
	$scope.pagedata = {};
	$scope.pagedata.page = 1;
	$scope.pagedata.limit = '20';
	$scope.pagedata.search = '';
	$scope.number = 100;
	$scope.reload = function (pagedata) {
		$scope.pagedata = pagedata;
		NavigationService.findLimitedDiscountCoupon($scope.pagedata, function (data, status) {
			$scope.discountcoupon = data;
			$scope.pages = [];
			var newclass = '';
			for (var i = 1; i <= data.totalpages; i++) {
				if (pagedata.page == i) {
					newclass = 'active';
				} else {
					newclass = '';
				}
				$scope.pages.push({
					pageno: i,
					class: newclass
				});
			}
		});
	}
	$scope.reload($scope.pagedata);
	$scope.confDelete = function () {
		NavigationService.deleteDiscountCoupon(function (data, status) {
			ngDialog.close();
			window.location.reload();
		});
	}
	$scope.deletefun = function (id) {
			$.jStorage.set('deletediscountcoupon', id);
			ngDialog.open({
				template: 'views/delete.html',
				closeByEscape: false,
				controller: 'DiscountCouponCtrl',
				closeByDocument: false
			});
		}
		//End DiscountCoupon
});
//discountcoupon Controller
//createDiscountCoupon Controller
phonecatControllers.controller('createDiscountCouponCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('DiscountCoupon');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/creatediscountcoupon.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.discountcoupon = {};
	$scope.submitForm = function () {
		NavigationService.saveDiscountCoupon($scope.discountcoupon, function (data, status) {
			$location.url('/discountcoupon');
		});
	};
	//createDiscountCoupon
});
//createDiscountCoupon Controller
//editDiscountCoupon Controller
phonecatControllers.controller('editDiscountCouponCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('DiscountCoupon');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/editdiscountcoupon.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.discountcoupon = {};
	NavigationService.getOneDiscountCoupon($routeParams.id, function (data, status) {
		$scope.discountcoupon = data; //Add More Array
	});
	$scope.submitForm = function () {
		$scope.discountcoupon._id = $routeParams.id;
		NavigationService.saveDiscountCoupon($scope.discountcoupon, function (data, status) {
			$location.url('/discountcoupon');
		});
	};
	//editDiscountCoupon
});
//editDiscountCoupon Controller
//Affilliate Controller
phonecatControllers.controller('AffilliateCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Affilliate');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/affilliate.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.Affilliate = [];
	$scope.pagedata = {};
	$scope.pagedata.page = 1;
	$scope.pagedata.limit = '20';
	$scope.pagedata.search = '';
	$scope.number = 100;
	$scope.reload = function (pagedata) {
		$scope.pagedata = pagedata;
		NavigationService.findLimitedAffilliate($scope.pagedata, function (data, status) {
			$scope.affilliate = data;
			$scope.pages = [];
			var newclass = '';
			for (var i = 1; i <= data.totalpages; i++) {
				if (pagedata.page == i) {
					newclass = 'active';
				} else {
					newclass = '';
				}
				$scope.pages.push({
					pageno: i,
					class: newclass
				});
			}
		});
	}
	$scope.reload($scope.pagedata);
	$scope.confDelete = function () {
		NavigationService.deleteAffilliate(function (data, status) {
			ngDialog.close();
			window.location.reload();
		});
	}
	$scope.deletefun = function (id) {
			$.jStorage.set('deleteaffilliate', id);
			ngDialog.open({
				template: 'views/delete.html',
				closeByEscape: false,
				controller: 'AffilliateCtrl',
				closeByDocument: false
			});
		}
		//End Affilliate
});
//affilliate Controller
//createAffilliate Controller
phonecatControllers.controller('createAffilliateCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Affilliate');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/createaffilliate.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.affilliate = {};
	$scope.submitForm = function () {
		NavigationService.saveAffilliate($scope.affilliate, function (data, status) {
			$location.url('/affilliate');
		});
	};
	//createAffilliate
});
//createAffilliate Controller
//editAffilliate Controller
phonecatControllers.controller('editAffilliateCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Affilliate');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/editaffilliate.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.affilliate = {};
	NavigationService.getOneAffilliate($routeParams.id, function (data, status) {
		$scope.affilliate = data; //Add More Array
	});
	$scope.submitForm = function () {
		$scope.affilliate._id = $routeParams.id;
		NavigationService.saveAffilliate($scope.affilliate, function (data, status) {
			$location.url('/affilliate');
		});
	};
	//editAffilliate
});
//editAffilliate Controller
//Slider Controller
phonecatControllers.controller('SliderCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Slider');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/slider.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.Slider = [];
	$scope.pagedata = {};
	$scope.pagedata.page = 1;
	$scope.pagedata.limit = '20';
	$scope.pagedata.search = '';
	$scope.number = 100;
	$scope.reload = function (pagedata) {
		$scope.pagedata = pagedata;
		NavigationService.findLimitedSlider($scope.pagedata, function (data, status) {
			$scope.slider = data;
			$scope.pages = [];
			var newclass = '';
			for (var i = 1; i <= data.totalpages; i++) {
				if (pagedata.page == i) {
					newclass = 'active';
				} else {
					newclass = '';
				}
				$scope.pages.push({
					pageno: i,
					class: newclass
				});
			}
		});
	}
	$scope.reload($scope.pagedata);
	$scope.confDelete = function () {
		NavigationService.deleteSlider(function (data, status) {
			ngDialog.close();
			window.location.reload();
		});
	}
	$scope.deletefun = function (id) {
			$.jStorage.set('deleteslider', id);
			ngDialog.open({
				template: 'views/delete.html',
				closeByEscape: false,
				controller: 'SliderCtrl',
				closeByDocument: false
			});
		}
		//End Slider
});
//slider Controller
//createSlider Controller
phonecatControllers.controller('createSliderCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog, $upload, $timeout) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Slider');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/createslider.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.slider = {};
	$scope.removeimage = function (i) {
		$scope.slider.image.splice(i, 1);
	};

	var imagejstupld = "";
	$scope.slider.image = [];
	$scope.usingFlash = FileAPI && FileAPI.upload != null;
	$scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
	$scope.uploadRightAway = true;
	$scope.changeAngularVersion = function () {
		window.location.hash = $scope.angularVersion;
		window.location.reload(true);
	};
	$scope.hasUploader = function (index) {
		return $scope.upload[index] != null;
	};
	$scope.abort = function (index) {
		$scope.upload[index].abort();
		$scope.upload[index] = null;
	};
	$scope.angularVersion = window.location.hash.length > 1 ? (window.location.hash.indexOf('/') === 1 ?
		window.location.hash.substring(2) : window.location.hash.substring(1)) : '1.2.20';
	$scope.onFileSelect = function ($files) {
		$scope.selectedFiles = [];
		$scope.progress = [];
		console.log($files);
		if ($scope.upload && $scope.upload.length > 0) {
			for (var i = 0; i < $scope.upload.length; i++) {
				if ($scope.upload[i] != null) {
					$scope.upload[i].abort();
				}
			}
		}
		$scope.upload = [];
		$scope.uploadResult = uploadres;
		$scope.selectedFiles = $files;
		$scope.dataUrls = [];
		for (var i = 0; i < $files.length; i++) {
			var $file = $files[i];
			if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL($files[i]);
				var loadFile = function (fileReader, index) {
					fileReader.onload = function (e) {
						$timeout(function () {
							$scope.dataUrls[index] = e.target.result;
						});
					}
				}(fileReader, i);
			}
			$scope.progress[i] = -1;
			if ($scope.uploadRightAway) {
				$scope.start(i);
			}
		}
	};

	$scope.start = function (index) {
		$scope.progress[index] = 0;
		$scope.errorMsg = null;
		console.log($scope.howToSend = 1);
		if ($scope.howToSend == 1) {
			$scope.upload[index] = $upload.upload({
				url: uploadUrl,
				method: $scope.httpMethod,
				headers: {
					'Content-Type': 'Content-Type'
				},
				data: {
					myModel: $scope.myModel
				},
				file: $scope.selectedFiles[index],
				fileFormDataName: 'file'
			});
			$scope.upload[index].then(function (response) {
				$timeout(function () {
					$scope.uploadResult.push(response.data);
					imagejstupld = response.data;
					if (imagejstupld != "") {
						console.log(response.data);
						$scope.slider.image.push(imagejstupld.files[0].fd);
						imagejstupld = "";
					}
				});
			}, function (response) {
				if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
			}, function (evt) {
				$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
			$scope.upload[index].xhr(function (xhr) {});
		} else {
			var fileReader = new FileReader();
			fileReader.onload = function (e) {
				$scope.upload[index] = $upload.http({
					url: uploadUrl,
					headers: {
						'Content-Type': $scope.selectedFiles[index].type
					},
					data: e.target.result
				}).then(function (response) {
					$scope.uploadResult.push(response.data);
				}, function (response) {
					if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
				}, function (evt) {
					$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
			}
			fileReader.readAsArrayBuffer($scope.selectedFiles[index]);
		}
	};

	$scope.dragOverClass = function ($event) {
		var items = $event.dataTransfer.items;
		var hasFile = false;
		if (items != null) {
			for (var i = 0; i < items.length; i++) {
				if (items[i].kind == 'file') {
					hasFile = true;
					break;
				}
			}
		} else {
			hasFile = true;
		}
		return hasFile ? "dragover" : "dragover-err";
	};
	$scope.submitForm = function () {
		NavigationService.saveSlider($scope.slider, function (data, status) {
			$location.url('/slider');
		});
	};
	//createSlider
});
//createSlider Controller
//editSlider Controller
phonecatControllers.controller('editSliderCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog, $upload, $timeout) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Slider');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/editslider.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.slider = {};
	NavigationService.getOneSlider($routeParams.id, function (data, status) {
		$scope.slider = data; //Add More Array
	});

	$scope.removeimage = function (i) {
		$scope.slider.image.splice(i, 1);
	};

	var imagejstupld = "";
	$scope.usingFlash = FileAPI && FileAPI.upload != null;
	$scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
	$scope.uploadRightAway = true;
	$scope.changeAngularVersion = function () {
		window.location.hash = $scope.angularVersion;
		window.location.reload(true);
	};
	$scope.hasUploader = function (index) {
		return $scope.upload[index] != null;
	};
	$scope.abort = function (index) {
		$scope.upload[index].abort();
		$scope.upload[index] = null;
	};
	$scope.angularVersion = window.location.hash.length > 1 ? (window.location.hash.indexOf('/') === 1 ?
		window.location.hash.substring(2) : window.location.hash.substring(1)) : '1.2.20';
	$scope.onFileSelect = function ($files) {
		$scope.selectedFiles = [];
		$scope.progress = [];
		console.log($files);
		if ($scope.upload && $scope.upload.length > 0) {
			for (var i = 0; i < $scope.upload.length; i++) {
				if ($scope.upload[i] != null) {
					$scope.upload[i].abort();
				}
			}
		}
		$scope.upload = [];
		$scope.uploadResult = uploadres;
		$scope.selectedFiles = $files;
		$scope.dataUrls = [];
		for (var i = 0; i < $files.length; i++) {
			var $file = $files[i];
			if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL($files[i]);
				var loadFile = function (fileReader, index) {
					fileReader.onload = function (e) {
						$timeout(function () {
							$scope.dataUrls[index] = e.target.result;
						});
					}
				}(fileReader, i);
			}
			$scope.progress[i] = -1;
			if ($scope.uploadRightAway) {
				$scope.start(i);
			}
		}
	};

	$scope.start = function (index) {
		$scope.progress[index] = 0;
		$scope.errorMsg = null;
		console.log($scope.howToSend = 1);
		if ($scope.howToSend == 1) {
			$scope.upload[index] = $upload.upload({
				url: uploadUrl,
				method: $scope.httpMethod,
				headers: {
					'Content-Type': 'Content-Type'
				},
				data: {
					myModel: $scope.myModel
				},
				file: $scope.selectedFiles[index],
				fileFormDataName: 'file'
			});
			$scope.upload[index].then(function (response) {
				$timeout(function () {
					$scope.uploadResult.push(response.data);
					imagejstupld = response.data;
					if (imagejstupld != "") {
						$scope.slider.image.push(imagejstupld.files[0].fd);
						imagejstupld = "";
					}
				});
			}, function (response) {
				if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
			}, function (evt) {
				$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
			$scope.upload[index].xhr(function (xhr) {});
		} else {
			var fileReader = new FileReader();
			fileReader.onload = function (e) {
				$scope.upload[index] = $upload.http({
					url: uploadUrl,
					headers: {
						'Content-Type': $scope.selectedFiles[index].type
					},
					data: e.target.result
				}).then(function (response) {
					$scope.uploadResult.push(response.data);
				}, function (response) {
					if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
				}, function (evt) {
					$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
			}
			fileReader.readAsArrayBuffer($scope.selectedFiles[index]);
		}
	};

	$scope.dragOverClass = function ($event) {
		var items = $event.dataTransfer.items;
		var hasFile = false;
		if (items != null) {
			for (var i = 0; i < items.length; i++) {
				if (items[i].kind == 'file') {
					hasFile = true;
					break;
				}
			}
		} else {
			hasFile = true;
		}
		return hasFile ? "dragover" : "dragover-err";
	};
	$scope.submitForm = function () {
		$scope.slider._id = $routeParams.id;
		NavigationService.saveSlider($scope.slider, function (data, status) {
			$location.url('/slider');
		});
	};
	//editSlider
});
//editSlider Controller
//Pages Controller
phonecatControllers.controller('PagesCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Pages');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/pages.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.Pages = [];
	$scope.pagedata = {};
	$scope.pagedata.page = 1;
	$scope.pagedata.limit = '20';
	$scope.pagedata.search = '';
	$scope.number = 100;
	$scope.reload = function (pagedata) {
		$scope.pagedata = pagedata;
		NavigationService.findLimitedPages($scope.pagedata, function (data, status) {
			$scope.pages = data;
			$scope.pages = [];
			var newclass = '';
			for (var i = 1; i <= data.totalpages; i++) {
				if (pagedata.page == i) {
					newclass = 'active';
				} else {
					newclass = '';
				}
				$scope.pages.push({
					pageno: i,
					class: newclass
				});
			}
		});
	}
	$scope.reload($scope.pagedata);
	$scope.confDelete = function () {
		NavigationService.deletePages(function (data, status) {
			ngDialog.close();
			window.location.reload();
		});
	}
	$scope.deletefun = function (id) {
			$.jStorage.set('deletepages', id);
			ngDialog.open({
				template: 'views/delete.html',
				closeByEscape: false,
				controller: 'PagesCtrl',
				closeByDocument: false
			});
		}
		//End Pages
});
//pages Controller
//createPages Controller
phonecatControllers.controller('createPagesCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Pages');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/createpages.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.pages = {};
	$scope.submitForm = function () {
		NavigationService.savePages($scope.pages, function (data, status) {
			$location.url('/pages');
		});
	};
	//createPages
});
//createPages Controller
//editPages Controller
phonecatControllers.controller('editPagesCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Pages');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/editpages.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.pages = {};
	NavigationService.getOnePages($routeParams.id, function (data, status) {
		$scope.pages = data; //Add More Array
	});
	$scope.submitForm = function () {
		$scope.pages._id = $routeParams.id;
		NavigationService.savePages($scope.pages, function (data, status) {
			$location.url('/pages');
		});
	};
	//editPages
});
//editPages Controller
//Blocks Controller
phonecatControllers.controller('BlocksCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Blocks');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/blocks.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.Blocks = [];
	$scope.pagedata = {};
	$scope.pagedata.page = 1;
	$scope.pagedata.limit = '20';
	$scope.pagedata.search = '';
	$scope.number = 100;
	$scope.reload = function (pagedata) {
		$scope.pagedata = pagedata;
		NavigationService.findLimitedBlocks($scope.pagedata, function (data, status) {
			$scope.blocks = data;
			$scope.pages = [];
			var newclass = '';
			for (var i = 1; i <= data.totalpages; i++) {
				if (pagedata.page == i) {
					newclass = 'active';
				} else {
					newclass = '';
				}
				$scope.pages.push({
					pageno: i,
					class: newclass
				});
			}
		});
	}
	$scope.reload($scope.pagedata);
	$scope.confDelete = function () {
		NavigationService.deleteBlocks(function (data, status) {
			ngDialog.close();
			window.location.reload();
		});
	}
	$scope.deletefun = function (id) {
			$.jStorage.set('deleteblocks', id);
			ngDialog.open({
				template: 'views/delete.html',
				closeByEscape: false,
				controller: 'BlocksCtrl',
				closeByDocument: false
			});
		}
		//End Blocks
});
//blocks Controller
//createBlocks Controller
phonecatControllers.controller('createBlocksCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog, $upload, $timeout) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Blocks');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/createblocks.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.blocks = {};

	$scope.removeimage = function () {
		$scope.blocks.image = '';
	};

	var imagejstupld = "";
	$scope.blocks.image = '';
	$scope.usingFlash = FileAPI && FileAPI.upload != null;
	$scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
	$scope.uploadRightAway = true;
	$scope.changeAngularVersion = function () {
		window.location.hash = $scope.angularVersion;
		window.location.reload(true);
	};
	$scope.hasUploader = function (index) {
		return $scope.upload[index] != null;
	};
	$scope.abort = function (index) {
		$scope.upload[index].abort();
		$scope.upload[index] = null;
	};
	$scope.angularVersion = window.location.hash.length > 1 ? (window.location.hash.indexOf('/') === 1 ?
		window.location.hash.substring(2) : window.location.hash.substring(1)) : '1.2.20';
	$scope.onFileSelect = function ($files) {
		$scope.selectedFiles = [];
		$scope.progress = [];
		console.log($files);
		if ($scope.upload && $scope.upload.length > 0) {
			for (var i = 0; i < $scope.upload.length; i++) {
				if ($scope.upload[i] != null) {
					$scope.upload[i].abort();
				}
			}
		}
		$scope.upload = [];
		$scope.uploadResult = uploadres;
		$scope.selectedFiles = $files;
		$scope.dataUrls = [];
		for (var i = 0; i < $files.length; i++) {
			var $file = $files[i];
			if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL($files[i]);
				var loadFile = function (fileReader, index) {
					fileReader.onload = function (e) {
						$timeout(function () {
							$scope.dataUrls[index] = e.target.result;
						});
					}
				}(fileReader, i);
			}
			$scope.progress[i] = -1;
			if ($scope.uploadRightAway) {
				$scope.start(i);
			}
		}
	};

	$scope.start = function (index) {
		$scope.progress[index] = 0;
		$scope.errorMsg = null;
		console.log($scope.howToSend = 1);
		if ($scope.howToSend == 1) {
			$scope.upload[index] = $upload.upload({
				url: uploadUrl,
				method: $scope.httpMethod,
				headers: {
					'Content-Type': 'Content-Type'
				},
				data: {
					myModel: $scope.myModel
				},
				file: $scope.selectedFiles[index],
				fileFormDataName: 'file'
			});
			$scope.upload[index].then(function (response) {
				$timeout(function () {
					$scope.uploadResult.push(response.data);
					imagejstupld = response.data;
					if (imagejstupld != "") {
						console.log(response.data);
						$scope.blocks.image = imagejstupld.files[0].fd;
						imagejstupld = "";
					}
				});
			}, function (response) {
				if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
			}, function (evt) {
				$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
			$scope.upload[index].xhr(function (xhr) {});
		} else {
			var fileReader = new FileReader();
			fileReader.onload = function (e) {
				$scope.upload[index] = $upload.http({
					url: uploadUrl,
					headers: {
						'Content-Type': $scope.selectedFiles[index].type
					},
					data: e.target.result
				}).then(function (response) {
					$scope.uploadResult.push(response.data);
				}, function (response) {
					if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
				}, function (evt) {
					$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
			}
			fileReader.readAsArrayBuffer($scope.selectedFiles[index]);
		}
	};

	$scope.dragOverClass = function ($event) {
		var items = $event.dataTransfer.items;
		var hasFile = false;
		if (items != null) {
			for (var i = 0; i < items.length; i++) {
				if (items[i].kind == 'file') {
					hasFile = true;
					break;
				}
			}
		} else {
			hasFile = true;
		}
		return hasFile ? "dragover" : "dragover-err";
	};

	$scope.submitForm = function () {
		NavigationService.saveBlocks($scope.blocks, function (data, status) {
			$location.url('/blocks');
		});
	};
	//createBlocks
});
//createBlocks Controller
//editBlocks Controller
phonecatControllers.controller('editBlocksCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog, $upload, $timeout) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Blocks');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/editblocks.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.blocks = {};
	NavigationService.getOneBlocks($routeParams.id, function (data, status) {
		$scope.blocks = data; //Add More Array
	});

	$scope.removeimage = function () {
		$scope.blocks.image = '';
	};

	var imagejstupld = "";
	$scope.blocks.image = '';
	$scope.usingFlash = FileAPI && FileAPI.upload != null;
	$scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
	$scope.uploadRightAway = true;
	$scope.changeAngularVersion = function () {
		window.location.hash = $scope.angularVersion;
		window.location.reload(true);
	};
	$scope.hasUploader = function (index) {
		return $scope.upload[index] != null;
	};
	$scope.abort = function (index) {
		$scope.upload[index].abort();
		$scope.upload[index] = null;
	};
	$scope.angularVersion = window.location.hash.length > 1 ? (window.location.hash.indexOf('/') === 1 ?
		window.location.hash.substring(2) : window.location.hash.substring(1)) : '1.2.20';
	$scope.onFileSelect = function ($files) {
		$scope.selectedFiles = [];
		$scope.progress = [];
		console.log($files);
		if ($scope.upload && $scope.upload.length > 0) {
			for (var i = 0; i < $scope.upload.length; i++) {
				if ($scope.upload[i] != null) {
					$scope.upload[i].abort();
				}
			}
		}
		$scope.upload = [];
		$scope.uploadResult = uploadres;
		$scope.selectedFiles = $files;
		$scope.dataUrls = [];
		for (var i = 0; i < $files.length; i++) {
			var $file = $files[i];
			if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL($files[i]);
				var loadFile = function (fileReader, index) {
					fileReader.onload = function (e) {
						$timeout(function () {
							$scope.dataUrls[index] = e.target.result;
						});
					}
				}(fileReader, i);
			}
			$scope.progress[i] = -1;
			if ($scope.uploadRightAway) {
				$scope.start(i);
			}
		}
	};

	$scope.start = function (index) {
		$scope.progress[index] = 0;
		$scope.errorMsg = null;
		console.log($scope.howToSend = 1);
		if ($scope.howToSend == 1) {
			$scope.upload[index] = $upload.upload({
				url: uploadUrl,
				method: $scope.httpMethod,
				headers: {
					'Content-Type': 'Content-Type'
				},
				data: {
					myModel: $scope.myModel
				},
				file: $scope.selectedFiles[index],
				fileFormDataName: 'file'
			});
			$scope.upload[index].then(function (response) {
				$timeout(function () {
					$scope.uploadResult.push(response.data);
					imagejstupld = response.data;
					if (imagejstupld != "") {
						console.log(response.data);
						$scope.blocks.image = imagejstupld.files[0].fd;
						imagejstupld = "";
					}
				});
			}, function (response) {
				if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
			}, function (evt) {
				$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
			$scope.upload[index].xhr(function (xhr) {});
		} else {
			var fileReader = new FileReader();
			fileReader.onload = function (e) {
				$scope.upload[index] = $upload.http({
					url: uploadUrl,
					headers: {
						'Content-Type': $scope.selectedFiles[index].type
					},
					data: e.target.result
				}).then(function (response) {
					$scope.uploadResult.push(response.data);
				}, function (response) {
					if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
				}, function (evt) {
					$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
			}
			fileReader.readAsArrayBuffer($scope.selectedFiles[index]);
		}
	};

	$scope.dragOverClass = function ($event) {
		var items = $event.dataTransfer.items;
		var hasFile = false;
		if (items != null) {
			for (var i = 0; i < items.length; i++) {
				if (items[i].kind == 'file') {
					hasFile = true;
					break;
				}
			}
		} else {
			hasFile = true;
		}
		return hasFile ? "dragover" : "dragover-err";
	};


	$scope.submitForm = function () {
		$scope.blocks._id = $routeParams.id;
		NavigationService.saveBlocks($scope.blocks, function (data, status) {
			$location.url('/blocks');
		});
	};
	//editBlocks
});
//editBlocks Controller
//Deal Controller
phonecatControllers.controller('DealCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Deal');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/deal.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.Deal = [];
	$scope.pagedata = {};
	$scope.pagedata.page = 1;
	$scope.pagedata.limit = '20';
	$scope.pagedata.search = '';
	$scope.number = 100;
	$scope.reload = function (pagedata) {
		$scope.pagedata = pagedata;
		NavigationService.findLimitedDeal($scope.pagedata, function (data, status) {
			$scope.deal = data;
			$scope.pages = [];
			var newclass = '';
			for (var i = 1; i <= data.totalpages; i++) {
				if (pagedata.page == i) {
					newclass = 'active';
				} else {
					newclass = '';
				}
				$scope.pages.push({
					pageno: i,
					class: newclass
				});
			}
		});
	}
	$scope.reload($scope.pagedata);
	$scope.confDelete = function () {
		NavigationService.deleteDeal(function (data, status) {
			ngDialog.close();
			window.location.reload();
		});
	}
	$scope.deletefun = function (id) {
			$.jStorage.set('deletedeal', id);
			ngDialog.open({
				template: 'views/delete.html',
				closeByEscape: false,
				controller: 'DealCtrl',
				closeByDocument: false
			});
		}
		//End Deal
});
//deal Controller
//createDeal Controller
phonecatControllers.controller('createDealCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Deal');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/createdeal.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.deal = {};
	$scope.submitForm = function () {
		NavigationService.saveDeal($scope.deal, function (data, status) {
			$location.url('/deal');
		});
	};
	NavigationService.getProduct(function (data, status) {
		$scope.product = data;
	});
	//createDeal
});
//createDeal Controller
//editDeal Controller
phonecatControllers.controller('editDealCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Deal');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/editdeal.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.deal = {};
	NavigationService.getOneDeal($routeParams.id, function (data, status) {
		$scope.deal = data; //Add More Array
	});
	$scope.submitForm = function () {
		$scope.deal._id = $routeParams.id;
		NavigationService.saveDeal($scope.deal, function (data, status) {
			$location.url('/deal');
		});
	};
	NavigationService.getProduct(function (data, status) {
		$scope.product = data;
	});
	//editDeal
});
//editDeal Controller
//Dealoftheday Controller
phonecatControllers.controller('DealofthedayCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Dealoftheday');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/dealoftheday.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.Dealoftheday = [];
	$scope.pagedata = {};
	$scope.pagedata.page = 1;
	$scope.pagedata.limit = '20';
	$scope.pagedata.search = '';
	$scope.number = 100;
	$scope.reload = function (pagedata) {
		$scope.pagedata = pagedata;
		NavigationService.findLimitedDealoftheday($scope.pagedata, function (data, status) {
			$scope.dealoftheday = data;
			$scope.pages = [];
			var newclass = '';
			for (var i = 1; i <= data.totalpages; i++) {
				if (pagedata.page == i) {
					newclass = 'active';
				} else {
					newclass = '';
				}
				$scope.pages.push({
					pageno: i,
					class: newclass
				});
			}
		});
	}
	$scope.reload($scope.pagedata);
	$scope.confDelete = function () {
		NavigationService.deleteDealoftheday(function (data, status) {
			ngDialog.close();
			window.location.reload();
		});
	}
	$scope.deletefun = function (id) {
			$.jStorage.set('deletedealoftheday', id);
			ngDialog.open({
				template: 'views/delete.html',
				closeByEscape: false,
				controller: 'DealofthedayCtrl',
				closeByDocument: false
			});
		}
		//End Dealoftheday
});
//dealoftheday Controller
//createDealoftheday Controller
phonecatControllers.controller('createDealofthedayCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Dealoftheday');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/createdealoftheday.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.dealoftheday = {};
	$scope.submitForm = function () {
		NavigationService.saveDealoftheday($scope.dealoftheday, function (data, status) {
			$location.url('/dealoftheday');
		});
	};
	NavigationService.getProduct(function (data, status) {
		$scope.product = data;
	});
	//createDealoftheday
});
//createDealoftheday Controller
//editDealoftheday Controller
phonecatControllers.controller('editDealofthedayCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Dealoftheday');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/editdealoftheday.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.dealoftheday = {};
	NavigationService.getOneDealoftheday($routeParams.id, function (data, status) {
		$scope.dealoftheday = data; //Add More Array
	});
	$scope.submitForm = function () {
		$scope.dealoftheday._id = $routeParams.id;
		NavigationService.saveDealoftheday($scope.dealoftheday, function (data, status) {
			$location.url('/dealoftheday');
		});
	};
	NavigationService.getProduct(function (data, status) {
		$scope.product = data;
	});
	//editDealoftheday
});
//editDealoftheday Controller
//Brand Controller
phonecatControllers.controller('BrandCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Brand');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/brand.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.Brand = [];
	$scope.pagedata = {};
	$scope.pagedata.page = 1;
	$scope.pagedata.limit = '20';
	$scope.pagedata.search = '';
	$scope.number = 100;
	$scope.reload = function (pagedata) {
		$scope.pagedata = pagedata;
		NavigationService.findLimitedBrand($scope.pagedata, function (data, status) {
			$scope.brand = data;
			$scope.pages = [];
			var newclass = '';
			for (var i = 1; i <= data.totalpages; i++) {
				if (pagedata.page == i) {
					newclass = 'active';
				} else {
					newclass = '';
				}
				$scope.pages.push({
					pageno: i,
					class: newclass
				});
			}
		});
	}
	$scope.reload($scope.pagedata);
	$scope.confDelete = function () {
		NavigationService.deleteBrand(function (data, status) {
			ngDialog.close();
			window.location.reload();
		});
	}
	$scope.deletefun = function (id) {
			$.jStorage.set('deletebrand', id);
			ngDialog.open({
				template: 'views/delete.html',
				closeByEscape: false,
				controller: 'BrandCtrl',
				closeByDocument: false
			});
		}
		//End Brand
});
//brand Controller
//createBrand Controller
phonecatControllers.controller('createBrandCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Brand');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/createbrand.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.brand = {};
	$scope.submitForm = function () {
		NavigationService.saveBrand($scope.brand, function (data, status) {
			$location.url('/brand');
		});
	};
	//createBrand
});
//createBrand Controller
//editBrand Controller
phonecatControllers.controller('editBrandCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Brand');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/editbrand.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.brand = {};
	NavigationService.getOneBrand($routeParams.id, function (data, status) {
		$scope.brand = data; //Add More Array
	});
	$scope.submitForm = function () {
		$scope.brand._id = $routeParams.id;
		NavigationService.saveBrand($scope.brand, function (data, status) {
			$location.url('/brand');
		});
	};
	//editBrand
});
//editBrand Controller
//Faq Controller
phonecatControllers.controller('FaqCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Faq');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/faq.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.Faq = [];
	$scope.pagedata = {};
	$scope.pagedata.page = 1;
	$scope.pagedata.limit = '20';
	$scope.pagedata.search = '';
	$scope.number = 100;
	$scope.reload = function (pagedata) {
		$scope.pagedata = pagedata;
		NavigationService.findLimitedFaq($scope.pagedata, function (data, status) {
			$scope.faq = data;
			$scope.pages = [];
			var newclass = '';
			for (var i = 1; i <= data.totalpages; i++) {
				if (pagedata.page == i) {
					newclass = 'active';
				} else {
					newclass = '';
				}
				$scope.pages.push({
					pageno: i,
					class: newclass
				});
			}
		});
	}
	$scope.reload($scope.pagedata);
	$scope.confDelete = function () {
		NavigationService.deleteFaq(function (data, status) {
			ngDialog.close();
			window.location.reload();
		});
	}
	$scope.deletefun = function (id) {
			$.jStorage.set('deletefaq', id);
			ngDialog.open({
				template: 'views/delete.html',
				closeByEscape: false,
				controller: 'FaqCtrl',
				closeByDocument: false
			});
		}
		//End Faq
});
//faq Controller
//createFaq Controller
phonecatControllers.controller('createFaqCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Faq');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/createfaq.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.faq = {};
	$scope.submitForm = function () {
		NavigationService.saveFaq($scope.faq, function (data, status) {
			$location.url('/faq');
		});
	};
	//createFaq
});
//createFaq Controller
//editFaq Controller
phonecatControllers.controller('editFaqCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Faq');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/editfaq.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.faq = {};
	NavigationService.getOneFaq($routeParams.id, function (data, status) {
		$scope.faq = data; //Add More Array
	});
	$scope.submitForm = function () {
		$scope.faq._id = $routeParams.id;
		NavigationService.saveFaq($scope.faq, function (data, status) {
			$location.url('/faq');
		});
	};
	//editFaq
});
//editFaq Controller
//Enquiry Controller
phonecatControllers.controller('EnquiryCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Enquiry');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/enquiry.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.Enquiry = [];
	$scope.pagedata = {};
	$scope.pagedata.page = 1;
	$scope.pagedata.limit = '20';
	$scope.pagedata.search = '';
	$scope.number = 100;
	$scope.reload = function (pagedata) {
		$scope.pagedata = pagedata;
		NavigationService.findLimitedEnquiry($scope.pagedata, function (data, status) {
			$scope.enquiry = data;
			$scope.pages = [];
			var newclass = '';
			for (var i = 1; i <= data.totalpages; i++) {
				if (pagedata.page == i) {
					newclass = 'active';
				} else {
					newclass = '';
				}
				$scope.pages.push({
					pageno: i,
					class: newclass
				});
			}
		});
	}
	$scope.reload($scope.pagedata);
	$scope.confDelete = function () {
		NavigationService.deleteEnquiry(function (data, status) {
			ngDialog.close();
			window.location.reload();
		});
	}
	$scope.deletefun = function (id) {
			$.jStorage.set('deleteenquiry', id);
			ngDialog.open({
				template: 'views/delete.html',
				closeByEscape: false,
				controller: 'EnquiryCtrl',
				closeByDocument: false
			});
		}
		//End Enquiry
});
//enquiry Controller
//createEnquiry Controller
phonecatControllers.controller('createEnquiryCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Enquiry');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/createenquiry.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.enquiry = {};
	$scope.submitForm = function () {
		NavigationService.saveEnquiry($scope.enquiry, function (data, status) {
			$location.url('/enquiry');
		});
	};
	NavigationService.getUser(function (data, status) {
		$scope.user = data;
	});
	NavigationService.getProduct(function (data, status) {
		$scope.product = data;
	});
	//createEnquiry
});
//createEnquiry Controller
//editEnquiry Controller
phonecatControllers.controller('editEnquiryCtrl', function ($scope, TemplateService, NavigationService, $routeParams, $location, ngDialog) {
	$scope.template = TemplateService;
	$scope.menutitle = NavigationService.makeactive('Enquiry');
	TemplateService.title = $scope.menutitle;
	TemplateService.submenu = '';
	TemplateService.content = 'views/editenquiry.html';
	TemplateService.list = 2;
	$scope.navigation = NavigationService.getnav();
	$scope.enquiry = {};
	NavigationService.getOneEnquiry($routeParams.id, function (data, status) {
		$scope.enquiry = data; //Add More Array
	});
	$scope.submitForm = function () {
		$scope.enquiry._id = $routeParams.id;
		NavigationService.saveEnquiry($scope.enquiry, function (data, status) {
			$location.url('/enquiry');
		});
	};
	NavigationService.getUser(function (data, status) {
		$scope.user = data;
	});
	NavigationService.getProduct(function (data, status) {
		$scope.product = data;
	});
	//editEnquiry
});
//editEnquiry Controller
//Add New Controller
