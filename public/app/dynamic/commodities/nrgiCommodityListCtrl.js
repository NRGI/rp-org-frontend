'use strict';

angular.module('app')
    .controller('nrgiCommodityListCtrl', function (
        $scope,
        $rootScope,
        nrgiNotifier,
        nrgiCommoditiesSrvc
    ) {
        var limit = 50,
            currentPage = 0,
            totalPages = 0;

        $scope.csv_commodities = [];
        var fields = ['commodity_name', 'projects'];
        var header_commodities = ['Name', 'No. Projects'];
        $scope.getHeaderCommodities = function () {
            return header_commodities
        };

        $scope.count =0;
        $scope.busy = false;

        $scope.createDownloadList = function (commodities) {
            angular.forEach(commodities, function (commodity, key) {
                $scope.csv_commodities[key] = [];
                angular.forEach(fields, function (field) {
                    $scope.csv_commodities[key].push(commodity[field])
                })
            });
        };

        nrgiCommoditiesSrvc.query({skip: currentPage*limit, limit: limit}, function (response) {
            $scope.count = response.count;
            $scope.commodities = response.commodities;
            totalPages = Math.ceil(response.count / limit);
            currentPage = currentPage + 1;
            $scope.createDownloadList($scope.commodities);
        });

        $scope.loadMore = function() {
            if ($scope.busy) return;
            $scope.busy = true;
            if(currentPage < totalPages) {
                nrgiCommoditiesSrvc.query({skip: currentPage*limit, limit: limit}, function (response) {
                    $scope.commodities = _.union($scope.commodities, response.commodities);
                    currentPage = currentPage + 1;
                    $scope.busy = false;
                    $scope.createDownloadList($scope.commodities);
                });
            }
        };
    });

