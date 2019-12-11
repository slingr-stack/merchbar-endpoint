/////////////////////////////
// Public API
/////////////////////////////

var analyzeParams = function (args) {
    var paramsSize = 0;
    var params = [];
    var argumentsObj = null;
    for (var i = 0; i < args.length; i++) {
        if (typeof args[i] != 'object') {
            paramsSize++;
            params.push(args[i]);
        } else {
            argumentsObj = args[i];
        }

    }
    return {
        paramsSize: paramsSize,
        argumentsObj: argumentsObj,
        params: params
    };
};

var getUrl = function (url, params, args, argsToPath) {

    if (!url) {
        return null;
    }

    if (params.length > 0) {
        var i = 0;
        url = url.replace(/:(\w+)/g, function () {
            return params[i++];
        });
    }

    if (args && argsToPath) {
        var tmp = Object.keys(args).map(function (k) {
            return encodeURIComponent(k) + '=' + args[k];
        }).join('&');

        if (url.split("\?").length > 1) {
            url += '&' + tmp;
        } else {
            url += '?' + tmp;
        }
    }

    return url;
};

endpoint.stores = {};
endpoint.stores.get = function () {
    var url1 = '/v1/stores';
    var url2 = '/v1/stores/:id';
    var params = analyzeParams(arguments);
    var url = getUrl(params.params.length > 0 ? url2 : url1, params.params, params.argumentsObj, true);
    return endpoint.get(url);
};

endpoint.stores.merch = {};
endpoint.stores.merch.get = function () {
    var urlPath = '/v1/stores/:id/merch';
    var params = analyzeParams(arguments);
    var url = getUrl(urlPath, params.params, params.argumentsObj, true);
    return endpoint.get(url);
};

endpoint.orders = {};
endpoint.orders.get = function () {
    var urlPath = "/v1/orders/:order_id";
    var params = analyzeParams(arguments);
    var url = getUrl(urlPath, params.params, params.argumentsObj, true);
    return endpoint.get(url);
};

endpoint.orderPreviews = {};
endpoint.orderPreviews.post = function (args) {
    var urlPath = "/v1/order_previews";
    return endpoint.post(urlPath, args);
};

endpoint.orders.post = function (args) {
    var urlPath = "/v1/orders";
    return endpoint.post(urlPath, args);
};

endpoint.orders.patch = function (id, args) {
    var urlPath = "/v1/orders/" + id;
    return endpoint.patch(urlPath, args);
};

endpoint.orders.cancel = {};
endpoint.orders.cancel.post = function (id, args) {
    var urlPath = "/v1/orders/" + id + "/cancel";
    return endpoint.post(urlPath, args);
};

/////////////////////////////////////
// Public API - Generic Functions
/////////////////////////////////////

endpoint.get = function (url) {
    var options = checkHttpOptions(url, {});
    return endpoint._get(options);
};

endpoint.post = function (url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._post(options);
};

endpoint.patch = function (url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._patch(options);
};

/////////////////////////////
//  Private helpers
/////////////////////////////

var checkHttpOptions = function (url, options) {
    options = options || {};
    if (!!url) {
        if (isObject(url)) {
            // take the 'url' parameter as the options
            options = url || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contains the http package format
                options.path = url;
            } else {
                // create html package
                options = {
                    path: url,
                    body: options
                }
            }
        }
    }
    return options;
};

var isObject = function (obj) {
    return !!obj && stringType(obj) === '[object Object]'
};

var stringType = Function.prototype.call.bind(Object.prototype.toString);