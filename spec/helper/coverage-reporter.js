jasmine.getEnv().addReporter({
    reportRunnerResults: function (runner) {
        if (window._$jscoverage != null) {
            phantom.sendMessage('writeln', '\ncoverage:' + JSON.stringify(window._$jscoverage));
        }
    }
});
