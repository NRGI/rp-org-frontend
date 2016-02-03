'use strict';

angular.module('app')
    .controller('nrgiContractCtrl', function (
        $scope,
        nrgiAuthSrvc,
        nrgiIdentitySrvc,
        nrgiContractsSrvc,
        $routeParams
    ) {
        nrgiContractsSrvc.getContractById($routeParams.id).then(function(response) {
            $scope.contract=response;
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



