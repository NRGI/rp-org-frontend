angular.module('app')
    .controller('nrgiReconcileCtrl', function(
            $scope,
            $route,
            nrgiDuplicatesSrvc,
            nrgiResolveSrvc
        ) {

        var limit = 50,
            currentPage = 0,
            totalPages = 0;

        $scope.count =0;
        $scope.busy = false;
        $scope.duplicate_companies=[];
        $scope.duplicate_projects=[];
        $scope.duplicates = [];
        $scope.types = [
            {name:'company'},
            {name:'project'}
        ]
        $scope.type_filter = $scope.types[0].name;
        var loadData = function(){
            nrgiDuplicatesSrvc.query({type: $scope.type_filter, skip: currentPage, limit: limit}, function (response) {
                currentPage = 0;
                $scope.duplicates = [];
                $scope.duplicates = response.data;
                $scope.count = response.count;
                totalPages = Math.ceil(response.count / limit);
                currentPage = currentPage + 1;
            });
        }
        loadData();
        $scope.resolve_duplicate = function (id, action) {
            currentPage = 0;
            totalPages = 0;
            nrgiDuplicatesSrvc.query({id:id,action:action}, function (response) {
                loadData();
            });
        }

        $scope.loadMore = function() {
            if ($scope.busy) return;
            $scope.busy = true;
            if(currentPage < totalPages) {
                nrgiDuplicatesSrvc.query({type:$scope.type_filter,skip: currentPage, limit: limit}, function (response) {
                    $scope.duplicates = _.union($scope.duplicates, response.data);
                    currentPage = currentPage + 1;
                    $scope.busy = false;
                });
            }
        };
        $scope.resolve_all = function(action) {
            if ($scope.busy) return;
            $scope.busy = true;
            nrgiResolveSrvc.query({type:$scope.type_filter}, function (response) {
                console.log(response)
                loadData();
                $scope.busy = false;
            });
        }
        $scope.changeTypeFilter = function(type) {
            currentPage = 0;
            totalPages = 0;
            if(type) {
                $scope.duplicates = [];
                $scope.type_filter = type;
                loadData();
            }
        };
    });
