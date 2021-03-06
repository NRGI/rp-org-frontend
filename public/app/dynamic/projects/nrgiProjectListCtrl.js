'use strict';

angular.module('app')
    .controller('nrgiProjectListCtrl', function (
        $scope,
        $rootScope,
        nrgiAuthSrvc,
        nrgiIdentitySrvc,
        nrgiProjectsSrvc,
        //nrgiProjectsWithIsoSrvc,
        $filter
    ) {

        var fields = ['proj_id', 'proj_name', 'verified', 'proj_country', 'proj_commodity_type', 'proj_commodity', 'proj_status', 'company_count', 'transfer_count', 'production_count'];
        var header_projects = ['Project ID', 'Name', 'Verified Project', 'Country', 'Type', 'Commodity', 'Status', 'Companies', 'Payments', 'Production'];
        var country_name, str, proj_commodity_type, commodity_name, companyName, timestamp, status, com =', ';
        var limit = 50,
            currentPage = 0,
            totalPages = 0;

        $scope.count =0;
        $scope.busy = false;
        $scope.csv_projects = [];

        nrgiProjectsSrvc.query({skip: currentPage*limit, limit: limit}, function (response) {
            $scope.count = response.count;
            $scope.projects = response.projects;
            totalPages = Math.ceil(response.count / limit);
            currentPage = currentPage + 1;
        });

        $scope.getAllProjects = function () {
            if ($scope.count < 50 || $scope.projects.length === $scope.count) {
                $scope.createDownloadList($scope.projects);
                setTimeout(function () {angular.element(document.getElementById("loadProjectsCSV")).trigger('click');},0)
            } else {
                nrgiProjectsSrvc.query({skip: 0, limit: $scope.count}, function (response) {
                    $scope.projects = response.projects;
                    $scope.createDownloadList($scope.projects);
                    setTimeout(function () {angular.element(document.getElementById("loadProjectsCSV")).trigger('click');},0)
                });
            }
        };

        $scope.createDownloadList = function (projects) {
            angular.forEach(projects, function (project, key) {
                $scope.csv_projects[key] = [];
                angular.forEach(fields, function (field) {
                    if(field == 'verified'){
                        if(project[field]!=undefined) {
                            project[field] = project[field].charAt(0).toUpperCase() + project[field].substr(1);
                            $scope.csv_projects[key].push(project[field])
                        }else{
                            $scope.csv_projects[key].push('')
                        }
                    }
                    if (field == 'proj_country') {
                        if(project[field]!=undefined&&project[field].length > 0) {
                            str = '';
                            angular.forEach(project[field], function (proj, i) {
                                country_name = '';
                                if (proj != undefined) {
                                    country_name = proj.name.toString();
                                    country_name = country_name.charAt(0).toUpperCase() + country_name.substr(1);
                                }
                                if (i != project[field].length - 1 && country_name != '') {
                                    str = str + country_name + com;
                                } else {
                                    str = str + country_name;
                                    $scope.csv_projects[key].push(str);
                                }
                            });
                        } else {
                            $scope.csv_projects[key].push('')
                        }
                    }
                    if (field == 'proj_commodity_type') {
                        if(project['proj_commodity']!=undefined&&project['proj_commodity'].length > 0) {
                            str = '';
                            project['proj_commodity'] = _.map(_.groupBy(project['proj_commodity'],function(doc){
                                if(doc && doc!=null) {
                                    return doc.commodity_type;
                                }
                            }),function(grouped){
                                return grouped[0];
                            });
                            angular.forEach(project['proj_commodity'], function (commodity, i) {
                                proj_commodity_type = '';
                                if (commodity != undefined) {
                                    proj_commodity_type = commodity.commodity_type.toString();
                                    proj_commodity_type = proj_commodity_type.charAt(0).toUpperCase() + proj_commodity_type.substr(1);
                                }
                                if (i != project['proj_commodity'].length - 1 && proj_commodity_type != '') {
                                    str = str + proj_commodity_type + com;
                                } else {
                                    str = str + proj_commodity_type;
                                    $scope.csv_projects[key].push(str);
                                }
                            });
                        } else {
                            $scope.csv_projects[key].push('')
                        }
                    }
                    if (field == 'proj_commodity') {
                        if(project[field]!=undefined&&project[field].length > 0) {
                            str = '';
                            project[field] = _.map(_.groupBy(project[field],function(doc){
                                if(doc && doc!=null) {
                                    return doc.commodity_name;
                                }
                            }),function(grouped){
                                return grouped[0];
                            });
                            angular.forEach(project[field], function (commodity, i) {
                                commodity_name = '';
                                if (commodity != undefined) {
                                    commodity_name = commodity.commodity_name.toString();
                                    commodity_name = commodity_name.charAt(0).toUpperCase() + commodity_name.substr(1);
                                }
                                if (i != project[field].length - 1 && commodity_name != '') {
                                    str = str + commodity_name + com;
                                } else {
                                    str = str + commodity_name;
                                    $scope.csv_projects[key].push(str);
                                }
                            });
                        } else {
                            $scope.csv_projects[key].push('')
                        }
                    }
                    if (field == 'proj_status') {
                        if(project[field]!=undefined&&project[field].length > 0) {
                            str = '';
                            var proj_status = project[field];
                            status = '';
                            if (proj_status[project[field].length-1] != undefined) {
                                status = proj_status[project[field].length-1].string.toString();
                                status = status.charAt(0).toUpperCase() + status.substr(1);
                                timestamp = $filter('date')(proj_status[project[field].length-1].timestamp,'MM/dd/yyyy @ h:mma');
                                str = status + '(true at '+timestamp+')';
                                $scope.csv_projects[key].push(str);
                            } else {
                                $scope.csv_projects[key].push(str)
                            }
                        } else {
                            $scope.csv_projects[key].push('')
                        }
                    }
                    if (field == 'company_count') {
                        if (project[field] < 3) {
                            str = '';
                            angular.forEach(project.companies, function (company, i) {
                                if (company != undefined) {
                                    companyName = company.company_name.toString();
                                    companyName = companyName.charAt(0).toUpperCase() + companyName.substr(1);
                                }
                                if (i != project.companies.length - 1) {
                                    str = str + companyName + com;
                                } else {
                                    str = str + companyName;
                                }
                            });
                            $scope.csv_projects[key].push(str)
                        } else {
                            $scope.csv_projects[key].push(project[field])
                        }
                    }
                    if(field != 'verified' && field != 'proj_country' && field != 'proj_commodity_type' && field != 'proj_commodity' && field != 'proj_status' && field != 'company_count') {
                        $scope.csv_projects[key].push(project[field])
                    }
                })
            });
        };

        $scope.getHeaderProjects = function () {
            return header_projects
        };

        $scope.loadMore = function() {
            if ($scope.busy || $scope.projects.length === $scope.count) return;
            $scope.busy = true;
            if(currentPage < totalPages) {
                nrgiProjectsSrvc.query({skip: currentPage*limit, limit: limit, record_type: $scope.record_type}, function (response) {
                    $scope.projects = _.union($scope.projects, response.projects);
                    currentPage = currentPage + 1;
                    $scope.busy = false;
                });
            }
        };
    });

