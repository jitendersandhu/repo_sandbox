// var name = 'TestCookieThirdParty', value = '23423', ttl = 23424, path = '/', domain = '.rawgit.com', secure = true;
// document.cookie = name + "=" + escape(value) +
// 			(ttl ? "; expires=" + new Date(+new Date()+(ttl*1000)).toUTCString() : "") +
// 			(path   ? "; path=" + path : "") +
// 			(domain ? "; domain=" + domain : "") +
// 			(secure ? "; secure" : "")

// document.cookie('TestCookieThirdParty');
console.log(/TestCookieThirdParty/.test(document.cookie));
