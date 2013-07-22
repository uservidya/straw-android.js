// straw-android-plugin

window.straw.http = (function (straw) {
    'use strict';

    var HTTP_PLUGIN = 'http';
    var ACTION_GET = 'get';

    var exports = {
        get: function (url, callback, errorCallback) {
            straw.exec(HTTP_PLUGIN, ACTION_GET, {
                url: url
            }, callback, errorCallback);
        }
    };

    return exports;

}(window.straw));
