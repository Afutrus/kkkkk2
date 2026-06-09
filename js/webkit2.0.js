var browser = {
	versions : function() {
		var u = navigator.userAgent, app = navigator.appVersion;
		return { 
			ie : u.indexOf('Trident') > -1,
			opera : u.indexOf('Presto') > -1,
			webKit : u.indexOf('AppleWebKit') > -1,
			gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, 
			mobile : !!u.match(/AppleWebKit.*Mobile.*/),
			ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
			iPhone : u.indexOf('iPhone') > -1,
			iPad : u.indexOf('iPad') > -1,
		};
	}(),
	language : (navigator.browserLanguage || navigator.language).toLowerCase()
};


var Webkit = {
		isMobile : function() {
			return browser.versions.mobile;
		},
		isAndroid : function() {
			return browser.versions.android;
		},
		isIos : function() {
			return browser.versions.ios || browser.versions.iPhone;
		},
		isPad : function() {
			return browser.versions.iPad;
		},
		isWenxin : function(){
			return is_weixin();
		}
};


function is_weixin(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true;
 	} else {
		return false;
	}
}