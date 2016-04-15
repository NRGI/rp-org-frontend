'use strict';

angular.module('app').controller('nrgiConcessionTableCtrl', function ($scope,$filter,nrgiConcessionTablesSrvc) {
    $scope.concessions=[];
    $scope.openClose=false;
    $scope.limit = 50;
    $scope.page = 0;
    $scope.loading = false;
    $scope.loadMoreConcessions=function() {
        if($scope.loading==false) {
            $scope.page = $scope.page+$scope.limit;
            $scope.getConcessions($scope.id, $scope.type);
        }
    };
    $scope.getConcessions=function(id,type) {
        if ($scope.openClose == true) {
            if ($scope.concessions.length == 0 || $scope.loading == false) {
                $scope.loading = true;
                nrgiConcessionTablesSrvc.get({
                    _id: id,
                    type: type,
                    skip: $scope.page,
                    limit: $scope.limit
                }, function (success) {
                    if (success.concessions.length > 0) {
                        _.each(success.concessions, function (contract) {
                            $scope.concessions.push(contract);
                        });
                    }
                    if (success.concessions.length < $scope.limit) {
                        $scope.loading = true;
                    } else {
                        $scope.loading = false;
                    }
                    $scope.csv_concessions = [];
                    var header_concessions = [];
                    var fields = [];
                    var str;
                    var com = ', ';
                    var headers = [
                        {name: 'Name', status: true, field: 'concession_name'},
                        {name: 'Country', status: true, field: 'concession_country'},
                        {name: 'Commodity Type ', status: $scope.type, field: 'concession_type'},
                        {name: 'Commodity ', status: $scope.commodity, field: 'concession_commodities'},
                        {name: 'Status ', status: $scope.status, field: 'concession_status'},
                        {name: 'No. Projects ', status: $scope.projects, field: 'projects'}];
                    angular.forEach(headers, function (header) {
                        if (header.status != false && header.status != undefined) {
                            header_concessions.push(header.name);
                            fields.push(header.field);
                        }
                    });
                    $scope.getHeaderConcessions = function () {
                        return header_concessions
                    };
                    angular.forEach($scope.concessions, function (concession, key) {
                        $scope.csv_concessions[key] = [];
                        angular.forEach(fields, function (field) {
                            if (field == 'concession_commodities') {
                                if (concession[field].length > 0) {
                                    str = '';
                                    angular.forEach(concession[field], function (commodity, i) {
                                        var commodity_name = commodity.commodity.commodity_name.toString();
                                        commodity_name = commodity_name.charAt(0).toUpperCase() + commodity_name.substr(1);
                                        if (i != concession[field].length - 1) {
                                            str = str + commodity_name + com;
                                        } else {
                                            str = str + commodity_name;
                                            $scope.csv_concessions[key].push(str);
                                        }
                                    })
                                } else {
                                    $scope.csv_concessions[key].push('');
                                }
                            }
                            if (field == 'concession_status') {
                                if (concession[field].length > 0) {
                                    str = '';
                                    angular.forEach(concession[field], function (status, i) {
                                        var date = new Date(status.timestamp);
                                        date = $filter('date')(date, "MM/dd/yyyy @ h:mma");
                                        var status_name = status.string.toString();
                                        status_name = status_name.charAt(0).toUpperCase() + status_name.substr(1);
                                        if (i != concession[field].length - 1) {
                                            str = str + status_name + '(true at ' + date + ')' + com;
                                        } else {
                                            str = str + status_name + '(true at ' + date + ')';
                                            $scope.csv_concessions[key].push(str);
                                        }
                                    })
                                } else {
                                    $scope.csv_concessions[key].push('');
                                }
                            }
                            if (field == 'concession_country') {
                                var country_name = concession[field].name.toString();
                                country_name = country_name.charAt(0).toUpperCase() + country_name.substr(1);
                                $scope.csv_concessions[key].push(country_name);
                            }
                            if (field == 'concession_type') {
                                if (concession.concession_commodities.length > 0) {
                                    str = '';
                                    var concession_commodity = _.uniq(concession.concession_commodities, function (a) {
                                        return a.commodity.commodity_type;
                                    });
                                    angular.forEach(concession_commodity, function (type, i) {
                                        var type_name = type.commodity.commodity_type.toString();
                                        type_name = type_name.charAt(0).toUpperCase() + type_name.substr(1);
                                        if (i != concession_commodity.length - 1) {
                                            str = str + type_name + com;
                                        } else {
                                            str = str + type_name;
                                            $scope.csv_concessions[key].push(str);
                                        }
                                    })
                                } else {
                                    $scope.csv_concessions[key].push('');
                                }
                            }
                            if (field != 'concession_status' && field != 'concession_commodities' && field != 'concession_type' && field != 'concession_country') {
                                $scope.csv_concessions[key].push(concession[field]);
                            }
                        });
                    })
                })
            }
        }
    }
});