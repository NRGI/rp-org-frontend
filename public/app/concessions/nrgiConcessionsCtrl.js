'use strict';

angular.module('app')
    .controller('nrgiConcessionsCtrl', function (
        $scope,
        ISO3166,
        nrgiAuthSrvc,
        nrgiIdentitySrvc,
        $sce,
        nrgiConcessionsSrvc
    ) {
        $scope.limit = 50;$scope.page = 0;$scope.count =0;$scope.show_count=0;
        var loadConcessions = function(limit,page){
            nrgiConcessionsSrvc.getAllConcessions(limit,page).then(function(response) {
                $scope.count = response.count;
                $scope.limit = limit;
                $scope.page = page;
                $scope.concessions=response.data;
                $scope.show_count = response.data.length+$scope.page;
            });
        };
        loadConcessions($scope.limit,$scope.page);
        $scope.select = function(changeLimit){
            loadConcessions(changeLimit,0);
        };
        $scope.next = function(page,count){
            loadConcessions($scope.limit,count);
        };
        $scope.prev = function(page){
            loadConcessions($scope.limit,page-$scope.limit);
        };
        $scope.first = function(){
            loadConcessions($scope.limit,0);
        };
        $scope.last = function(page){
            if($scope.count%$scope.limit!=0){
                page =  parseInt($scope.count/$scope.limit)*$scope.limit;
                loadConcessions($scope.limit,page);
            }else {
                loadConcessions($scope.limit,page-$scope.limit);
            }
        }
    });