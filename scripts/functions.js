/////////////////////////////
// Public API
/////////////////////////////

endpoint.testing = function () {
    return {status: "ok"};
};

// // GET
// /v1/stores
// /v1/stores/{id}
// /v1/stores/{id}/merch
// /v1/orders/{order_id}
//
// // POST
// /v1/order_previews
// /v1/orders
// /v1/orders/{order_id}/cancel
//
// // PATCH
// /v1/orders/{order_id}




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

endpoint.put = function (url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._put(options);
};

endpoint.delete = function (url) {
    var options = checkHttpOptions(url, {});
    return endpoint._delete(options);
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