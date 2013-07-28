window.jasmine.getEnv().addReporter({
    reportRunnerResults: function () {
        'use strict';

        if (window._$jscoverage != null) {
            window.phantom.sendMessage('writeln', '\ncoverage:' + JSON.stringify(window._$jscoverage));
        }
    }
});
