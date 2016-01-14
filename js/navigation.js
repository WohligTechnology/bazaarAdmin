// var adminurl = "http://localhost:1337/";
var adminurl = "http://tagboss.wohlig.com/";
var adminlogin = {
	"username": "admin@admin.com",
	"password": "admin123"
};
var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function ($http) {
	var navigation = [{
			name: "Dashboard",
			classis: "active",
			link: "#/home",
			subnav: []
        }, {
			name: 'User',
			active: '',
			link: '#/user',
			subnav: []
        }, {
			name: 'Category',
			active: '',
			link: '#/category',
			subnav: []
        }, {
			name: 'Product',
			active: '',
			link: '#/product',
			subnav: []
        }, {
			name: 'Attribute',
			active: '',
			link: '#/attribute',
			subnav: []
        }, {
			name: 'Order',
			active: '',
			link: '#/order',
			subnav: []
        }, {
			name: 'DiscountCoupon',
			active: '',
			link: '#/discountcoupon',
			subnav: []
        }, {
			name: 'Affilliate',
			active: '',
			link: '#/affilliate',
			subnav: []
        }, {
			name: 'Slider',
			active: '',
			link: '#/slider',
			subnav: []
        }, {
			name: 'Pages',
			active: '',
			link: '#/pages',
			subnav: []
        }, {
			name: 'Blocks',
			active: '',
			link: '#/blocks',
			subnav: []
        }, {
			name: 'Deal',
			active: '',
			link: '#/deal',
			subnav: []
        }, {
			name: 'Dealoftheday',
			active: '',
			link: '#/dealoftheday',
			subnav: []
        }, {
			name: 'Brand',
			active: '',
			link: '#/brand',
			subnav: []
        }, {
			name: 'Faq',
			active: '',
			link: '#/faq',
			subnav: []
        }, {
			name: 'Enquiry',
			active: '',
			link: '#/enquiry',
			subnav: []
        }, //Add New Left

    ];

	return {
		makeactive: function (menuname) {
			for (var i = 0; i < navigation.length; i++) {
				if (navigation[i].name == menuname) {
					navigation[i].classis = "active";
				} else {
					navigation[i].classis = "";
				}
			}
			return menuname;
		},
		getnav: function () {
			return navigation;
		},
		adminLogin: function (data, callback) {
			$http({
				url: adminurl + "user/adminlogin",
				method: "POST",
				data: {
					"email": data.email,
					"password": data.password
				}
			}).success(callback);
		},
		//    countUser: function(callback) {
		//      $http.get(adminurl + "user/countusers").success(callback);
		//    },
		setUser: function (data) {
			$.jStorage.set("user", data);
		},
		getUser: function () {
			$.jStorage.get("user");
		},
		getOneUser: function (id, callback) {
			$http({
				url: adminurl + 'user/findone',
				method: 'POST',
				data: {
					'_id': id
				}
			}).success(callback);
		},
		findLimitedUser: function (user, callback) {
			$http({
				url: adminurl + 'user/findlimited',
				method: 'POST',
				data: {
					'search': user.search,
					'pagesize': parseInt(user.limit),
					'pagenumber': parseInt(user.page)
				}
			}).success(callback);
		},
		deleteUser: function (callback) {
			$http({
				url: adminurl + 'user/delete',
				method: 'POST',
				data: {
					'_id': $.jStorage.get('deleteuser')
				}
			}).success(callback);
		},
		saveUser: function (data, callback) {
			$http({
				url: adminurl + 'user/save',
				method: 'POST',
				data: data
			}).success(callback);
		},
		getOneCategory: function (id, callback) {
			$http({
				url: adminurl + 'category/findone',
				method: 'POST',
				data: {
					'_id': id
				}
			}).success(callback);
		},
		findLimitedCategory: function (category, callback) {
			$http({
				url: adminurl + 'category/findlimited',
				method: 'POST',
				data: {
					'search': category.search,
					'pagesize': parseInt(category.limit),
					'pagenumber': parseInt(category.page)
				}
			}).success(callback);
		},
		deleteCategory: function (callback) {
			$http({
				url: adminurl + 'category/delete',
				method: 'POST',
				data: {
					'_id': $.jStorage.get('deletecategory')
				}
			}).success(callback);
		},
		saveCategory: function (data, callback) {
			$http({
				url: adminurl + 'category/save',
				method: 'POST',
				data: data
			}).success(callback);
		},
		getOneProduct: function (id, callback) {
			$http({
				url: adminurl + 'product/findone',
				method: 'POST',
				data: {
					'_id': id
				}
			}).success(callback);
		},
		findLimitedProduct: function (product, callback) {
			$http({
				url: adminurl + 'product/findlimited',
				method: 'POST',
				data: {
					'search': product.search,
					'pagesize': parseInt(product.limit),
					'pagenumber': parseInt(product.page)
				}
			}).success(callback);
		},
		deleteProduct: function (callback) {
			$http({
				url: adminurl + 'product/delete',
				method: 'POST',
				data: {
					'_id': $.jStorage.get('deleteproduct')
				}
			}).success(callback);
		},
		saveProduct: function (data, callback) {
			$http({
				url: adminurl + 'product/save',
				method: 'POST',
				data: data
			}).success(callback);
		},
		getCategory: function (callback) {
			$http({
				url: adminurl + 'category/find',
				method: 'POST',
				data: {}
			}).success(callback);
		},
		saveTag: function (data, callback) {
			$http({
				url: adminurl + 'tag/save',
				method: 'POST',
				data: {
					'name': data.name
				}
			}).success(callback);
		},
		findTag: function (data, tag, callback) {
			$http({
				url: adminurl + 'tag/find',
				method: 'POST',
				data: {
					search: data,
					tag: tag
				}
			}).success(callback);
		},
		saveKeyword: function (data, callback) {
			$http({
				url: adminurl + 'keyword/save',
				method: 'POST',
				data: {
					'name': data.name
				}
			}).success(callback);
		},
		findKeyword: function (data, keyword, callback) {
			$http({
				url: adminurl + 'keyword/find',
				method: 'POST',
				data: {
					search: data,
					keyword: keyword
				}
			}).success(callback);
		},
		getOneAttribute: function (id, callback) {
			$http({
				url: adminurl + 'attribute/findone',
				method: 'POST',
				data: {
					'_id': id
				}
			}).success(callback);
		},
		findLimitedAttribute: function (attribute, callback) {
			$http({
				url: adminurl + 'attribute/findlimited',
				method: 'POST',
				data: {
					'search': attribute.search,
					'pagesize': parseInt(attribute.limit),
					'pagenumber': parseInt(attribute.page)
				}
			}).success(callback);
		},
		deleteAttribute: function (callback) {
			$http({
				url: adminurl + 'attribute/delete',
				method: 'POST',
				data: {
					'_id': $.jStorage.get('deleteattribute')
				}
			}).success(callback);
		},
		saveAttribute: function (data, callback) {
			$http({
				url: adminurl + 'attribute/save',
				method: 'POST',
				data: data
			}).success(callback);
		},
		getOneOrder: function (id, callback) {
			$http({
				url: adminurl + 'order/findone',
				method: 'POST',
				data: {
					'_id': id
				}
			}).success(callback);
		},
		findLimitedOrder: function (order, callback) {
			$http({
				url: adminurl + 'order/findlimited',
				method: 'POST',
				data: {
					'search': order.search,
					'pagesize': parseInt(order.limit),
					'pagenumber': parseInt(order.page)
				}
			}).success(callback);
		},
		deleteOrder: function (callback) {
			$http({
				url: adminurl + 'order/delete',
				method: 'POST',
				data: {
					'_id': $.jStorage.get('deleteorder')
				}
			}).success(callback);
		},
		saveOrder: function (data, callback) {
			$http({
				url: adminurl + 'order/save',
				method: 'POST',
				data: data
			}).success(callback);
		},
		getUser: function (callback) {
			$http({
				url: adminurl + 'user/find',
				method: 'POST',
				data: {}
			}).success(callback);
		},
		getOneDiscountCoupon: function (id, callback) {
			$http({
				url: adminurl + 'discountcoupon/findone',
				method: 'POST',
				data: {
					'_id': id
				}
			}).success(callback);
		},
		findLimitedDiscountCoupon: function (discountcoupon, callback) {
			$http({
				url: adminurl + 'discountcoupon/findlimited',
				method: 'POST',
				data: {
					'search': discountcoupon.search,
					'pagesize': parseInt(discountcoupon.limit),
					'pagenumber': parseInt(discountcoupon.page)
				}
			}).success(callback);
		},
		deleteDiscountCoupon: function (callback) {
			$http({
				url: adminurl + 'discountcoupon/delete',
				method: 'POST',
				data: {
					'_id': $.jStorage.get('deletediscountcoupon')
				}
			}).success(callback);
		},
		saveDiscountCoupon: function (data, callback) {
			$http({
				url: adminurl + 'discountcoupon/save',
				method: 'POST',
				data: data
			}).success(callback);
		},
		getOneAffilliate: function (id, callback) {
			$http({
				url: adminurl + 'affilliate/findone',
				method: 'POST',
				data: {
					'_id': id
				}
			}).success(callback);
		},
		findLimitedAffilliate: function (affilliate, callback) {
			$http({
				url: adminurl + 'affilliate/findlimited',
				method: 'POST',
				data: {
					'search': affilliate.search,
					'pagesize': parseInt(affilliate.limit),
					'pagenumber': parseInt(affilliate.page)
				}
			}).success(callback);
		},
		deleteAffilliate: function (callback) {
			$http({
				url: adminurl + 'affilliate/delete',
				method: 'POST',
				data: {
					'_id': $.jStorage.get('deleteaffilliate')
				}
			}).success(callback);
		},
		saveAffilliate: function (data, callback) {
			$http({
				url: adminurl + 'affilliate/save',
				method: 'POST',
				data: data
			}).success(callback);
		},
		getOneSlider: function (id, callback) {
			$http({
				url: adminurl + 'slider/findone',
				method: 'POST',
				data: {
					'_id': id
				}
			}).success(callback);
		},
		findLimitedSlider: function (slider, callback) {
			$http({
				url: adminurl + 'slider/findlimited',
				method: 'POST',
				data: {
					'search': slider.search,
					'pagesize': parseInt(slider.limit),
					'pagenumber': parseInt(slider.page)
				}
			}).success(callback);
		},
		deleteSlider: function (callback) {
			$http({
				url: adminurl + 'slider/delete',
				method: 'POST',
				data: {
					'_id': $.jStorage.get('deleteslider')
				}
			}).success(callback);
		},
		saveSlider: function (data, callback) {
			$http({
				url: adminurl + 'slider/save',
				method: 'POST',
				data: data
			}).success(callback);
		},
		getOnePages: function (id, callback) {
			$http({
				url: adminurl + 'pages/findone',
				method: 'POST',
				data: {
					'_id': id
				}
			}).success(callback);
		},
		findLimitedPages: function (pages, callback) {
			$http({
				url: adminurl + 'pages/findlimited',
				method: 'POST',
				data: {
					'search': pages.search,
					'pagesize': parseInt(pages.limit),
					'pagenumber': parseInt(pages.page)
				}
			}).success(callback);
		},
		deletePages: function (callback) {
			$http({
				url: adminurl + 'pages/delete',
				method: 'POST',
				data: {
					'_id': $.jStorage.get('deletepages')
				}
			}).success(callback);
		},
		savePages: function (data, callback) {
			$http({
				url: adminurl + 'pages/save',
				method: 'POST',
				data: data
			}).success(callback);
		},
		getOneBlocks: function (id, callback) {
			$http({
				url: adminurl + 'blocks/findone',
				method: 'POST',
				data: {
					'_id': id
				}
			}).success(callback);
		},
		findLimitedBlocks: function (blocks, callback) {
			$http({
				url: adminurl + 'blocks/findlimited',
				method: 'POST',
				data: {
					'search': blocks.search,
					'pagesize': parseInt(blocks.limit),
					'pagenumber': parseInt(blocks.page)
				}
			}).success(callback);
		},
		deleteBlocks: function (callback) {
			$http({
				url: adminurl + 'blocks/delete',
				method: 'POST',
				data: {
					'_id': $.jStorage.get('deleteblocks')
				}
			}).success(callback);
		},
		saveBlocks: function (data, callback) {
			$http({
				url: adminurl + 'blocks/save',
				method: 'POST',
				data: data
			}).success(callback);
		},
		getOneDeal: function (id, callback) {
			$http({
				url: adminurl + 'deal/findone',
				method: 'POST',
				data: {
					'_id': id
				}
			}).success(callback);
		},
		findLimitedDeal: function (deal, callback) {
			$http({
				url: adminurl + 'deal/findlimited',
				method: 'POST',
				data: {
					'search': deal.search,
					'pagesize': parseInt(deal.limit),
					'pagenumber': parseInt(deal.page)
				}
			}).success(callback);
		},
		deleteDeal: function (callback) {
			$http({
				url: adminurl + 'deal/delete',
				method: 'POST',
				data: {
					'_id': $.jStorage.get('deletedeal')
				}
			}).success(callback);
		},
		saveDeal: function (data, callback) {
			$http({
				url: adminurl + 'deal/save',
				method: 'POST',
				data: data
			}).success(callback);
		},
		getProduct: function (callback) {
			$http({
				url: adminurl + 'product/find',
				method: 'POST',
				data: {}
			}).success(callback);
		},
		getOneDealoftheday: function (id, callback) {
			$http({
				url: adminurl + 'dealoftheday/findone',
				method: 'POST',
				data: {
					'_id': id
				}
			}).success(callback);
		},
		findLimitedDealoftheday: function (dealoftheday, callback) {
			$http({
				url: adminurl + 'dealoftheday/findlimited',
				method: 'POST',
				data: {
					'search': dealoftheday.search,
					'pagesize': parseInt(dealoftheday.limit),
					'pagenumber': parseInt(dealoftheday.page)
				}
			}).success(callback);
		},
		deleteDealoftheday: function (callback) {
			$http({
				url: adminurl + 'dealoftheday/delete',
				method: 'POST',
				data: {
					'_id': $.jStorage.get('deletedealoftheday')
				}
			}).success(callback);
		},
		saveDealoftheday: function (data, callback) {
			$http({
				url: adminurl + 'dealoftheday/save',
				method: 'POST',
				data: data
			}).success(callback);
		},
		getProduct: function (callback) {
			$http({
				url: adminurl + 'product/find',
				method: 'POST',
				data: {}
			}).success(callback);
		},
		getOneBrand: function (id, callback) {
			$http({
				url: adminurl + 'brand/findone',
				method: 'POST',
				data: {
					'_id': id
				}
			}).success(callback);
		},
		findLimitedBrand: function (brand, callback) {
			$http({
				url: adminurl + 'brand/findlimited',
				method: 'POST',
				data: {
					'search': brand.search,
					'pagesize': parseInt(brand.limit),
					'pagenumber': parseInt(brand.page)
				}
			}).success(callback);
		},
		deleteBrand: function (callback) {
			$http({
				url: adminurl + 'brand/delete',
				method: 'POST',
				data: {
					'_id': $.jStorage.get('deletebrand')
				}
			}).success(callback);
		},
		saveBrand: function (data, callback) {
			$http({
				url: adminurl + 'brand/save',
				method: 'POST',
				data: data
			}).success(callback);
		},
		getOneFaq: function (id, callback) {
			$http({
				url: adminurl + 'faq/findone',
				method: 'POST',
				data: {
					'_id': id
				}
			}).success(callback);
		},
		findLimitedFaq: function (faq, callback) {
			$http({
				url: adminurl + 'faq/findlimited',
				method: 'POST',
				data: {
					'search': faq.search,
					'pagesize': parseInt(faq.limit),
					'pagenumber': parseInt(faq.page)
				}
			}).success(callback);
		},
		deleteFaq: function (callback) {
			$http({
				url: adminurl + 'faq/delete',
				method: 'POST',
				data: {
					'_id': $.jStorage.get('deletefaq')
				}
			}).success(callback);
		},
		saveFaq: function (data, callback) {
			$http({
				url: adminurl + 'faq/save',
				method: 'POST',
				data: data
			}).success(callback);
		},
		getOneEnquiry: function (id, callback) {
			$http({
				url: adminurl + 'enquiry/findone',
				method: 'POST',
				data: {
					'_id': id
				}
			}).success(callback);
		},
		findLimitedEnquiry: function (enquiry, callback) {
			$http({
				url: adminurl + 'enquiry/findlimited',
				method: 'POST',
				data: {
					'search': enquiry.search,
					'pagesize': parseInt(enquiry.limit),
					'pagenumber': parseInt(enquiry.page)
				}
			}).success(callback);
		},
		deleteEnquiry: function (callback) {
			$http({
				url: adminurl + 'enquiry/delete',
				method: 'POST',
				data: {
					'_id': $.jStorage.get('deleteenquiry')
				}
			}).success(callback);
		},
		saveEnquiry: function (data, callback) {
			$http({
				url: adminurl + 'enquiry/save',
				method: 'POST',
				data: data
			}).success(callback);
		},
		getUser: function (callback) {
			$http({
				url: adminurl + 'user/find',
				method: 'POST',
				data: {}
			}).success(callback);
		},
		getProduct: function (callback) {
			$http({
				url: adminurl + 'product/find',
				method: 'POST',
				data: {}
			}).success(callback);
		},
		findCategory: function (data, category, callback) {
			$http({
				url: adminurl + 'category/findCategory',
				method: 'POST',
				data: {
					search: data,
					category: category
				}
			}).success(callback);
		},
		//Add New Service

	}
})
