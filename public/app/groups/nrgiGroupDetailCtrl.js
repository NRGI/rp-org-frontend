'use strict';

angular.module('app')
    .controller('nrgiGroupDetailCtrl', function (
        $scope,
        nrgiAuthSrvc,
        nrgiIdentitySrvc,
        nrgiGroupsSrvc,
        $routeParams
    ) {
        $scope.center=[];
        nrgiGroupsSrvc.get({_id: $routeParams.id}, function (success) {
            $scope.group=success;
            if($scope.group.location.length>0)
            $scope.center={lat:$scope.group.location[0].lat,lng:$scope.group.location[0].lng,zoom: 3};
        });

        var tilesDict = {
            openstreetmap: {
                url: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
                options: {
                    attribution: 'Tiles: &copy; Esri'
                }
            }
        };
        angular.extend($scope, {
            tiles: tilesDict.openstreetmap,
            defaults: {
                scrollWheelZoom: false
            },
            controls: {
                fullscreen: {
                    position: 'topleft'
                }
            }
        });
    });