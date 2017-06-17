﻿angular.module('webtools').controller('logsController', ['$scope', 'logsModel', 'logsService', 'webtoolsModel', '$window', function ($scope, logsModel, logsService, webtoolsModel, $window) {
    $scope.webtoolsModel = webtoolsModel;
    $scope.logsModel = logsModel;

    $scope.init = function () {
        logsService.getLogs(function (defaultSelectedLog) {
            $scope.loadLog(defaultSelectedLog);
        });
    }

    $scope.loadLog = function (selectedLog) {
        $scope.logsModel.searchKeywordValue = "";
        $scope.logsModel.searchKeywordValueLast = "";
        $scope.logsModel.searchFoundLine = [];
        logsService.getLogDetails(selectedLog);
    }

    $scope.downloadLogs = function () {
        $window.location.href = webtoolsModel.apiV3Url + '/logs/download';
    }
    $scope.downloadLog = function () {
        $window.location.href = webtoolsModel.apiV3Url + '/logs/download/' + $scope.logsModel.selectedLog.value;
    }

    $scope.searchKeyword = function () {
        if ($scope.logsModel.searchKeywordValue && $scope.logsModel.searchKeywordValue === $scope.logsModel.searchKeywordValueLast) {
            if ($scope.logsModel.searchFoundLines.length > 0) $scope.$broadcast("logs_search_nextLine");
        }
        else {
            $scope.$broadcast("logs_search_findKeywords");
        }
    }
    $scope.searchClear = function () {
        $scope.logsModel.searchKeywordValue = "";
        $scope.$broadcast("logs_search_findKeywords");
    }
    $scope.searchPrevious = function () {
        if ($scope.logsModel.searchFoundLines.length > 0) $scope.$broadcast("logs_search_previousLine");
    }
    $scope.searchJumpToTop = function () {
        $scope.$broadcast("logs_search_jumpToTop");
    }

    $scope.$on("$destroy", function () {
        $scope.logsModel.selectedLog = null;
    });

    $scope.init();
}]);