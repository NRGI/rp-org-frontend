'use strict';
angular.module('app', [
  'angular.filter',
  'angular-underscore',
  'iso-3166-country-codes',
  'angular-google-analytics',
  'leaflet-directive',
  'ngDialog',
  'ngResource',
  'ngRoute',
  'tableSort',
  'ngCsv',
  'ngSanitize',
  'angularSpinner',
  'infinite-scroll',
  'nvd3',
  'textAngular'
]);
angular.module('app').config([
  '$routeProvider',
  '$locationProvider',
  'AnalyticsProvider',
  function ($routeProvider, $locationProvider, AnalyticsProvider) {
    AnalyticsProvider.setAccount([{
        tracker: 'UA-59246536-4',
        name: 'resourceprojects.org'
      }]).logAllCalls(true).startOffline(true);
    // role checks
    var routeRoleChecks = {
        supervisor: {
          auth: function (nrgiAuthSrvc) {
            return nrgiAuthSrvc.authorizeCurrentUserForRoute('admin');
          }
        },
        user: {
          auth: function (nrgiAuthSrvc) {
            return nrgiAuthSrvc.authorizeAuthenticatedUserForRoute();
          }
        }
      };
    $locationProvider.html5Mode(true);
    $routeProvider.when('/', {
      templateUrl: '/partials/main/main',
      controller: 'nrgiMainCtrl'
    }).when('/admin/etl/datasets', {
      templateUrl: '/partials/admin/etl/datasets',
      controller: 'nrgiEtlCtrl'
    }).when('/admin/etl/datasets/new', {
      templateUrl: '/partials/admin/etl/create-dataset',
      controller: 'nrgiDatasetCreateCtrl'
    }).when('/admin/reconcile', {
      templateUrl: '/partials/admin/etl/reconcile',
      controller: 'nrgiReconcileCtrl'
    }).when('/admin/create-user', {
      templateUrl: '/partials/admin/users/create-user',
      controller: 'nrgiUserAdminCreateCtrl'
    }).when('/admin/user-admin', {
      templateUrl: '/partials/admin/users/user-admin',
      controller: 'nrgiUserAdminCtrl'
    }).when('/admin/user-admin/:id', {
      templateUrl: '/partials/admin/users/user-admin-update',
      controller: 'nrgiUserAdminUpdateCtrl'
    }).when('/admin/sourceType-admin', {
      templateUrl: '/partials/admin/sourceTypes/sourceType-admin',
      controller: 'nrgiSourceTypeAdminCtrl'
    }).when('/admin/create-sourceType', {
      templateUrl: '/partials/admin/sourceTypes/create-sourceType',
      controller: 'nrgiSourceTypeAdminCreateCtrl'
    }).when('/admin/sourceType-admin/:id', {
      templateUrl: '/partials/admin/sourceTypes/sourceType-admin-update',
      controller: 'nrgiSourceTypeAdminUpdateCtrl'
    }).when('/admin/edit-about-page', {
      templateUrl: '/partials/admin/cms/aboutPage/edit-about-page',
      controller: 'nrgiAboutPageUpdateCtrl'
    }).when('/admin/edit-glossary-page', {
      templateUrl: '/partials/admin/cms/glossaryPage/edit-glossary-page',
      controller: 'nrgiGlossaryPageUpdateCtrl'
    }).when('/admin/edit-landing-page', {
      templateUrl: '/partials/admin/cms/landingPage/edit-landing-page',
      controller: 'nrgiLandingPageUpdateCtrl'
    }).when('/login', {
      templateUrl: '/partials/account/login',
      controller: 'nrgiLoginCtrl'
    }).when('/profile', {
      templateUrl: '/partials/account/profile',
      controller: 'nrgiProfileCtrl',
      resolve: routeRoleChecks.supervisor
    }).when('/companies', {
      templateUrl: '/partials/dynamic/companies/company-list',
      controller: 'nrgiCompanyListCtrl'
    }).when('/company/:id', {
      templateUrl: '/partials/dynamic/companies/company-detail',
      controller: 'nrgiCompanyDetailCtrl'
    }).when('/concessions', {
      templateUrl: '/partials/dynamic/concessions/concession-list',
      controller: 'nrgiConcessionListCtrl'
    }).when('/concession/:id', {
      templateUrl: '/partials/dynamic/concessions/concession-detail',
      controller: 'nrgiConcessionDetailCtrl'
    }).when('/contracts', {
      templateUrl: '/partials/dynamic/contracts/contract-list',
      controller: 'nrgiContractListCtrl'
    }).when('/contract/:id', {
      templateUrl: '/partials/dynamic/contracts/contract-detail',
      controller: 'nrgiContractDetailCtrl'
    }).when('/fields', {
      templateUrl: '/partials/dynamic/sites/site-list',
      controller: 'nrgiSiteListCtrl'
    }).when('/field/:id', {
      templateUrl: '/partials/dynamic/sites/site-detail',
      controller: 'nrgiSiteDetailCtrl'
    }).when('/fields/map', {
      templateUrl: '/partials/dynamic/sites/mapSiteAndProject',
      controller: 'nrgiMapSiteCtrl'
    }).when('/projects', {
      templateUrl: '/partials/dynamic/projects/project-list',
      controller: 'nrgiProjectListCtrl'
    }).when('/all-projects', {
      templateUrl: '/partials/dynamic/projects/all-project-list',
      controller: 'nrgiAllProjectListCtrl'
    }).when('/project/:id', {
      templateUrl: '/partials/dynamic/projects/project-detail',
      controller: 'nrgiProjectDetailCtrl'
    }).when('/sites', {
      templateUrl: '/partials/dynamic/sites/site-list',
      controller: 'nrgiSiteListCtrl'
    }).when('/site/:id', {
      templateUrl: '/partials/dynamic/sites/site-detail',
      controller: 'nrgiSiteDetailCtrl'
    }).when('/sites/map', {
      templateUrl: '/partials/dynamic/sites/mapSiteAndProject',
      controller: 'nrgiMapSiteCtrl'
    }).when('/transfers', {
      templateUrl: '/partials/dynamic/transfers/transfer-list',
      controller: 'nrgiTransferListCtrl'
    }).when('/transfers_by_gov', {
      templateUrl: '/partials/dynamic/transfersByGovEntity/transferByGov-list',
      controller: 'nrgiTransferByGovListCtrl'
    }).when('/commodities', {
      templateUrl: '/partials/dynamic/commodities/commodity-list',
      controller: 'nrgiCommodityListCtrl'
    }).when('/commodity/:id', {
      templateUrl: '/partials/dynamic/commodities/commodity-detail',
      controller: 'nrgiCommodityDetailCtrl'
    }).when('/countries', {
      templateUrl: '/partials/dynamic/countries/country-list',
      controller: 'nrgiCountryListCtrl'
    }).when('/country/:id', {
      templateUrl: '/partials/dynamic/countries/country-detail',
      controller: 'nrgiCountryDetailCtrl'
    }).when('/groups', {
      templateUrl: '/partials/dynamic/groups/group-list',
      controller: 'nrgiGroupListCtrl'
    }).when('/group/:id', {
      templateUrl: '/partials/dynamic/groups/group-detail',
      controller: 'nrgiGroupDetailCtrl'
    }).when('/sources', {
      templateUrl: '/partials/dynamic/sources/source-list',
      controller: 'nrgiSourceListCtrl'
    }).when('/source/:id', {
      templateUrl: '/partials/dynamic/sources/source-detail',
      controller: 'nrgiSourceDetailCtrl'
    }).when('/glossary', {
      templateUrl: '/partials/static/glossary/glossary',
      controller: 'nrgiGlossaryCtrl'
    }).when('/contribute', { templateUrl: '/partials/static/contribute' }).when('/about', {
      templateUrl: '/partials/static/about/about',
      controller: 'nrgiAboutCtrl'
    }).when('/pie-chart', {
      templateUrl: '/partials/dynamic/pieChart/pie-chart',
      controller: 'nrgiPieChartCtrl'
    }).when('/treemap', { templateUrl: '/partials/dynamic/treemap/tree-map' }).when('/sunburst-chart', { templateUrl: '/partials/dynamic/sunburstChart/sunburst-chart' }).when('/sunburst-chart-by-gov', { templateUrl: '/partials/dynamic/sunburstChartByGovEntity/sunburst-chart' }).when('/map', { templateUrl: '/partials/dynamic/map/map' }).otherwise('/', {
      templateUrl: '/partials/main/main',
      controller: 'nrgiMainCtrl'
    });
  }
]);
angular.module('app').run([
  '$rootScope',
  '$routeParams',
  '$location',
  '$window',
  function ($rootScope, $routeParams, $location, $window) {
    $rootScope._ = _;
    $rootScope.Object = Object;
    $rootScope.keys = $rootScope.Object.keys;
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      if (rejection === 'not authorized') {
        $location.path('/');
      }
    });
    $rootScope.$on('$routeChangeSuccess', function () {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      var output = $location.path() + '?';
      angular.forEach($routeParams, function (value, key) {
        output += key + '=' + value + '&';
      });
      output = output.substr(0, output.length - 1);
      $window.ga([
        '_trackPageview',
        output
      ]);
    });
  }
]);'use strict';
angular.module('app').controller('nrgiLoginCtrl', [
  '$scope',
  '$http',
  '$location',
  'nrgiNotifier',
  'nrgiIdentitySrvc',
  'nrgiAuthSrvc',
  function ($scope, $http, $location, nrgiNotifier, nrgiIdentitySrvc, nrgiAuthSrvc) {
    // assign the identity resource with the current identity using identity service
    $scope.identity = nrgiIdentitySrvc;
    // signin function for signin button
    $scope.signin = function (username, password) {
      nrgiAuthSrvc.authenticateUser(username, password).then(function (success) {
        if (success) {
          nrgiNotifier.notify('You have successfully signed in!');
          $location.path('/');
        } else {
          nrgiNotifier.error('Username/Password combination incorrect');
        }
      });
    };
  }
]);'use strict';
angular.module('app').controller('nrgiProfileCtrl', [
  '$scope',
  'nrgiIdentitySrvc',
  'nrgiUserMethodSrvc',
  'nrgiNotifier',
  function ($scope, nrgiIdentitySrvc, nrgiUserMethodSrvc, nrgiNotifier) {
    // set page resources to be those of the current identity
    $scope.full_name = nrgiIdentitySrvc.currentUser.first_name + ' ' + nrgiIdentitySrvc.currentUser.last_name;
    $scope.first_name = nrgiIdentitySrvc.currentUser.first_name;
    $scope.last_name = nrgiIdentitySrvc.currentUser.last_name;
    $scope.email = nrgiIdentitySrvc.currentUser.email;
    $scope.username = nrgiIdentitySrvc.currentUser.username;
    $scope.roles = nrgiIdentitySrvc.currentUser.roles;
    // update functinonality for update button
    $scope.update = function () {
      // pass in update data
      var new_user_data = {
          first_name: $scope.first_name,
          last_name: $scope.last_name,
          email: $scope.email
        };
      // check if password update exists and pass it in
      if ($scope.password && $scope.password.length > 0) {
        new_user_data.password = $scope.password;
      }
      // use authorization service to update user data
      nrgiUserMethodSrvc.updateUser(new_user_data).then(function () {
        nrgiNotifier.notify('Your user account has been updated');
      }, function (reason) {
        nrgiNotifier.notify(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiAboutPageUpdateCtrl', [
  '$scope',
  '$routeParams',
  '$location',
  'nrgiNotifier',
  'nrgiAboutPageContentSrvc',
  'nrgiContentMethodSrvc',
  function ($scope, $routeParams, $location, nrgiNotifier, nrgiAboutPageContentSrvc, nrgiContentMethodSrvc) {
    nrgiAboutPageContentSrvc.get(function (success) {
      $scope.content = success;
    }, function (error) {
    });
    $scope.aboutPageUpdate = function (content) {
      nrgiContentMethodSrvc.updateContentPage(content).then(function () {
        nrgiNotifier.notify('About page has been updated');
        $location.path('/about');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiGlossaryPageUpdateCtrl', [
  '$scope',
  '$routeParams',
  '$location',
  'nrgiNotifier',
  'nrgiGlossaryPageContentSrvc',
  'nrgiContentMethodSrvc',
  function ($scope, $routeParams, $location, nrgiNotifier, nrgiGlossaryPageContentSrvc, nrgiContentMethodSrvc) {
    nrgiGlossaryPageContentSrvc.get(function (success) {
      $scope.content = success;
    }, function (error) {
    });
    $scope.glossaryPageUpdate = function (content) {
      nrgiContentMethodSrvc.updateContentPage(content).then(function () {
        nrgiNotifier.notify('Glossary page has been updated');
        $location.path('/glossary');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiLandingPageUpdateCtrl', [
  '$scope',
  '$routeParams',
  '$location',
  'nrgiNotifier',
  'nrgiLandingPageContentSrvc',
  'nrgiContentMethodSrvc',
  function ($scope, $routeParams, $location, nrgiNotifier, nrgiLandingPageContentSrvc, nrgiContentMethodSrvc) {
    nrgiLandingPageContentSrvc.get(function (success) {
      $scope.content = success;
    }, function (error) {
    });
    $scope.landingPageUpdate = function (content) {
      nrgiContentMethodSrvc.updateContentPage(content).then(function () {
        nrgiNotifier.notify('Landing page has been updated');
        $location.path('/main');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiCommodityAdminCtrl', [
  '$scope',
  'nrgiCommoditiesSrvc',
  function ($scope, nrgiCommoditiesSrvc) {
    nrgiCommoditiesSrvc.query({
      skip: 0,
      limit: 0
    }, function (response) {
      $scope.commodities = response.data;
    });
  }
]);angular.module('app').controller('nrgiCommodityAdminCreateCtrl', [
  '$scope',
  '$location',
  'nrgiNotifier',
  'nrgiIdentitySrvc',
  'nrgiCommoditiesMethodSrvc',
  function ($scope, $location, nrgiNotifier, nrgiIdentitySrvc, nrgiCommoditiesMethodSrvc) {
    $scope.commodity = [];
    $scope.commodityCreate = function () {
      nrgiCommoditiesMethodSrvc.createCommodity($scope.commodity).then(function () {
        nrgiNotifier.notify('Commodity created!');
        $location.path('/admin/commodity-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiCommodityAdminUpdateCtrl', [
  '$scope',
  '$routeParams',
  '$location',
  'nrgiNotifier',
  'nrgiCommoditiesMethodSrvc',
  'nrgiCommoditiesSrvc',
  function ($scope, $routeParams, $location, nrgiNotifier, nrgiCommoditiesMethodSrvc, nrgiCommoditiesSrvc) {
    $scope.commodity = nrgiCommoditiesSrvc.get({ _id: $routeParams.id });
    $scope.commodityUpdate = function () {
      nrgiCommoditiesMethodSrvc.updateCommodity($scope.commodity).then(function () {
        nrgiNotifier.notify('Commodity has been updated');
        $location.path('/admin/commodity-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
    $scope.commodityDelete = function () {
      var commodity_deletion = $scope.commodity._id;
      nrgiCommoditiesMethodSrvc.deleteCommodity(commodity_deletion).then(function () {
        nrgiNotifier.notify('Commodity has been deleted');
        $location.path('/admin/commodity-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiCompanyAdminCtrl', [
  '$scope',
  'nrgiCompaniesSrvc',
  function ($scope, nrgiCompaniesSrvc) {
    nrgiCompaniesSrvc.query({
      skip: 0,
      limit: 0
    }, function (response) {
      $scope.companies = response.data;
    });
  }
]);angular.module('app').controller('nrgiCompanyAdminCreateCtrl', [
  '$scope',
  '$location',
  'nrgiNotifier',
  'nrgiIdentitySrvc',
  'nrgiCountriesSrvc',
  'nrgiCompaniesMethodSrvc',
  function ($scope, $location, nrgiNotifier, nrgiIdentitySrvc, nrgiCountriesSrvc, nrgiCompaniesMethodSrvc) {
    $scope.company = [];
    $scope.country = nrgiCountriesSrvc.query({
      skip: 0,
      limit: 0
    });
    $scope.companyCreate = function () {
      nrgiCompaniesMethodSrvc.createCompany($scope.company).then(function () {
        nrgiNotifier.notify('Company created!');
        $location.path('/admin/company-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiCompanyAdminUpdateCtrl', [
  '$scope',
  '$routeParams',
  '$location',
  'nrgiNotifier',
  'nrgiCompaniesMethodSrvc',
  'nrgiCompaniesSrvc',
  'nrgiCountriesSrvc',
  function ($scope, $routeParams, $location, nrgiNotifier, nrgiCompaniesMethodSrvc, nrgiCompaniesSrvc, nrgiCountriesSrvc) {
    $scope.company = nrgiCompaniesSrvc.get({ _id: $routeParams.id });
    $scope.country = nrgiCountriesSrvc.query({
      skip: 0,
      limit: 0
    });
    $scope.companyUpdate = function () {
      nrgiCompaniesMethodSrvc.updateCompany($scope.company).then(function () {
        nrgiNotifier.notify('Company has been updated');
        $location.path('/admin/company-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
    $scope.companyDelete = function () {
      var company_deletion = $scope.company._id;
      nrgiCompaniesMethodSrvc.deleteCompany(company_deletion).then(function () {
        nrgiNotifier.notify('Company has been deleted');
        $location.path('/admin/company-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiConcessionAdminCtrl', [
  '$scope',
  'nrgiConcessionsSrvc',
  function ($scope, nrgiConcessionsSrvc) {
    nrgiConcessionsSrvc.query({
      skip: 0,
      limit: 0
    }, function (response) {
      $scope.concessions = response.data;
    });
  }
]);angular.module('app').controller('nrgiConcessionAdminCreateCtrl', [
  '$scope',
  '$location',
  'nrgiNotifier',
  'nrgiIdentitySrvc',
  'nrgiCountriesSrvc',
  'nrgiConcessionsMethodSrvc',
  function ($scope, $location, nrgiNotifier, nrgiIdentitySrvc, nrgiCountriesSrvc, nrgiConcessionsMethodSrvc) {
    $scope.concession = [];
    $scope.country = nrgiCountriesSrvc.query({
      skip: 0,
      limit: 0
    });
    $scope.concessionCreate = function () {
      nrgiConcessionsMethodSrvc.createConcession($scope.concession).then(function () {
        nrgiNotifier.notify('Concession created!');
        $location.path('/admin/concession-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiConcessionAdminUpdateCtrl', [
  '$scope',
  '$routeParams',
  '$location',
  'nrgiNotifier',
  'nrgiConcessionsMethodSrvc',
  'nrgiConcessionsSrvc',
  'nrgiCountriesSrvc',
  function ($scope, $routeParams, $location, nrgiNotifier, nrgiConcessionsMethodSrvc, nrgiConcessionsSrvc, nrgiCountriesSrvc) {
    $scope.concession = nrgiConcessionsSrvc.get({ _id: $routeParams.id });
    $scope.country = nrgiCountriesSrvc.query({
      skip: 0,
      limit: 0
    });
    $scope.concessionUpdate = function () {
      nrgiConcessionsMethodSrvc.updateConcession($scope.concession).then(function () {
        nrgiNotifier.notify('Concession has been updated');
        $location.path('/admin/concession-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
    $scope.concessionDelete = function () {
      var concession_deletion = $scope.concession._id;
      nrgiConcessionsMethodSrvc.deleteConcession(concession_deletion).then(function () {
        nrgiNotifier.notify('Concession has been deleted');
        $location.path('/admin/concession-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiCountryAdminCtrl', [
  '$scope',
  'nrgiCountriesSrvc',
  function ($scope, nrgiCountriesSrvc) {
    nrgiCountriesSrvc.query({
      skip: 0,
      limit: 0
    }, function (response) {
      $scope.countries = response.data;
    });
  }
]);angular.module('app').controller('nrgiCountryAdminCreateCtrl', [
  '$scope',
  '$location',
  'nrgiNotifier',
  'nrgiIdentitySrvc',
  'nrgiCountriesSrvc',
  'nrgiCountriesMethodSrvc',
  function ($scope, $location, nrgiNotifier, nrgiIdentitySrvc, nrgiCountriesSrvc, nrgiCountriesMethodSrvc) {
    $scope.country = [];
    $scope.countryCreate = function () {
      nrgiCountriesMethodSrvc.createCountry($scope.country).then(function () {
        nrgiNotifier.notify('Country created!');
        $location.path('/admin/country-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiCountryAdminUpdateCtrl', [
  '$scope',
  '$routeParams',
  '$location',
  'nrgiNotifier',
  'nrgiProjectsSrvc',
  'nrgiCountriesMethodSrvc',
  'nrgiCountriesSrvc',
  function ($scope, $routeParams, $location, nrgiNotifier, nrgiProjectsSrvc, nrgiCountriesMethodSrvc, nrgiCountriesSrvc) {
    $scope.country = nrgiCountriesSrvc.get({ _id: $routeParams.id });
    $scope.countryUpdate = function () {
      nrgiCountriesMethodSrvc.updateCountry($scope.country).then(function () {
        nrgiNotifier.notify('Country has been updated');
        $location.path('/admin/country-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
    $scope.countryDelete = function () {
      var country_deletion = $scope.country._id;
      nrgiCountriesMethodSrvc.deleteCountry(country_deletion).then(function () {
        nrgiNotifier.notify('Country has been deleted');
        $location.path('/admin/country-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiDatasetCreateCtrl', [
  '$scope',
  '$location',
  'nrgiNotifier',
  'nrgiDatasetMethodSrvc',
  function ($scope, $location, nrgiNotifier, nrgiDatasetMethodSrvc) {
    $scope.datasetCreate = function () {
      var new_dataset_data = {
          name: $scope.name,
          source_url: $scope.source_url
        };
      nrgiDatasetMethodSrvc.createDataset(new_dataset_data).then(function () {
        nrgiNotifier.notify('New dataset created!');
        $location.path('/admin/etl/datasets');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiEtlCtrl', [
  '$scope',
  '$route',
  'nrgiDatasetSrvc',
  'nrgiDatasetActionMethodSrvc',
  'nrgiNotifier',
  'nrgiDestroySrvc',
  '$window',
  function ($scope, $route, nrgiDatasetSrvc, nrgiDatasetActionMethodSrvc, nrgiNotifier, nrgiDestroySrvc, $window) {
    nrgiDatasetSrvc.query({}, function (success) {
      $scope.datasets = success.data;
    });
    $scope.sort_options = [
      {
        value: 'name',
        text: 'Sort by Name'
      },
      {
        value: 'created',
        text: 'Sort by Date Created'
      }
    ];
    $scope.sort_order = $scope.sort_options[1].value;
    $scope.startAction = function (action, dataset_id) {
      var name = null;
      switch (action) {
      case 'import':
        name = 'Import from Google Sheets';
        break;
      case 'unload':
        name = 'Unload last import';
        break;
      case 'cleaned':
        name = 'Mark as cleaned';
      }
      if (dataset_id === '56737e170e8cc07115211ee4' && action === 'import') {
        //See server/models/Datasets.js
        name = 'Import from Companies House API';
      }
      if (name === null) {
        nrgiNotifier.error('Invalid dataset action requested!');
        return;
      }
      var new_action_data = {
          id: dataset_id,
          name: name
        };
      nrgiDatasetActionMethodSrvc.createAction(new_action_data).then(function () {
        nrgiNotifier.notify('Action "' + name + '" started');
        //This makes the page jump but has the advantage of tying it to data; alternative: optimistic update or making a fully fledged actions service
        $route.reload();
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
    // DO NOT MERGE TO PRODUCTION! FOR STAGING USE ONLY!
    $scope.dalete_all_data = function () {
      if ($window.confirm('are you sure?')) {
        nrgiDestroySrvc.query({}, function (response) {
          console.log(response);
        });
      } else {
      }
    };
    $scope.refresh_data = function () {
      nrgiDatasetSrvc.query({}, function (success) {
        nrgiNotifier.notify('Refresh');
        $scope.datasets = success.data;
      });
    };
  }
]);angular.module('app').controller('nrgiReconcileCtrl', [
  '$scope',
  '$route',
  'nrgiDuplicatesSrvc',
  'nrgiResolveSrvc',
  function ($scope, $route, nrgiDuplicatesSrvc, nrgiResolveSrvc) {
    var limit = 50, currentPage = 0, totalPages = 0;
    $scope.count = 0;
    $scope.busy = false;
    $scope.duplicate_companies = [];
    $scope.duplicate_projects = [];
    $scope.duplicates = [];
    $scope.types = [
      { name: 'company' },
      { name: 'project' }
    ];
    $scope.type_filter = $scope.types[0].name;
    var loadData = function () {
      nrgiDuplicatesSrvc.query({
        type: $scope.type_filter,
        skip: currentPage,
        limit: limit
      }, function (response) {
        currentPage = 0;
        $scope.duplicates = [];
        $scope.duplicates = response.data;
        $scope.count = response.count;
        totalPages = Math.ceil(response.count / limit);
        currentPage = currentPage + 1;
      });
    };
    loadData();
    $scope.resolve_duplicate = function (id, action) {
      currentPage = 0;
      totalPages = 0;
      nrgiDuplicatesSrvc.query({
        id: id,
        action: action
      }, function (response) {
        loadData();
      });
    };
    $scope.loadMore = function () {
      if ($scope.busy)
        return;
      $scope.busy = true;
      if (currentPage < totalPages) {
        nrgiDuplicatesSrvc.query({
          type: $scope.type_filter,
          skip: currentPage,
          limit: limit
        }, function (response) {
          $scope.duplicates = _.union($scope.duplicates, response.data);
          currentPage = currentPage + 1;
          $scope.busy = false;
        });
      }
    };
    $scope.resolve_all = function (action) {
      if ($scope.busy)
        return;
      $scope.busy = true;
      nrgiResolveSrvc.query({ type: $scope.type_filter }, function (response) {
        console.log(response);
        loadData();
        $scope.busy = false;
      });
    };
    $scope.changeTypeFilter = function (type) {
      currentPage = 0;
      totalPages = 0;
      if (type) {
        $scope.duplicates = [];
        $scope.type_filter = type;
        loadData();
      }
    };
  }
]);angular.module('app').controller('nrgiGroupAdminCreateCtrl', [
  '$scope',
  '$location',
  'nrgiNotifier',
  'nrgiIdentitySrvc',
  'nrgiCountriesSrvc',
  'nrgiGroupsMethodSrvc',
  function ($scope, $location, nrgiNotifier, nrgiIdentitySrvc, nrgiCountriesSrvc, nrgiGroupsMethodSrvc) {
    $scope.group = [];
    $scope.country = nrgiCountriesSrvc.query({
      skip: 0,
      limit: 0
    });
    $scope.groupCreate = function () {
      nrgiGroupsMethodSrvc.createGroup($scope.group).then(function () {
        nrgiNotifier.notify('Company group created!');
        $location.path('/admin/group-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiGroupAdminCtrl', [
  '$scope',
  'nrgiGroupsSrvc',
  function ($scope, nrgiGroupsSrvc) {
    nrgiGroupsSrvc.query({
      skip: 0,
      limit: 0
    }, function (response) {
      $scope.groups = response.data;
    });
  }
]);angular.module('app').controller('nrgiGroupAdminUpdateCtrl', [
  '$scope',
  '$routeParams',
  '$location',
  'nrgiNotifier',
  'nrgiGroupsMethodSrvc',
  'nrgiGroupsSrvc',
  function ($scope, $routeParams, $location, nrgiNotifier, nrgiGroupsMethodSrvc, nrgiGroupsSrvc) {
    $scope.group = nrgiGroupsSrvc.get({ _id: $routeParams.id });
    $scope.groupUpdate = function () {
      nrgiGroupsMethodSrvc.updateGroup($scope.group).then(function () {
        nrgiNotifier.notify('Company group has been updated');
        $location.path('/admin/group-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
    $scope.groupDelete = function () {
      var group_deletion = $scope.group._id;
      nrgiGroupsMethodSrvc.deleteGroup(group_deletion).then(function () {
        nrgiNotifier.notify('Company group has been deleted');
        $location.path('/admin/group-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiProjectAdminCreateCtrl', [
  '$scope',
  '$location',
  'nrgiNotifier',
  'nrgiIdentitySrvc',
  'nrgiProjectsSrvc',
  'nrgiProjectsMethodSrvc',
  'nrgiCountriesSrvc',
  'nrgiCommoditiesSrvc',
  '$sce',
  function ($scope, $location, nrgiNotifier, nrgiIdentitySrvc, nrgiProjectsSrvc, nrgiProjectsMethodSrvc, nrgiCountriesSrvc, nrgiCommoditiesSrvc, $sce) {
    $scope.project = [];
    $scope.country = nrgiCountriesSrvc.query({
      skip: 0,
      limit: 0
    });
    $scope.commodity = nrgiCommoditiesSrvc.query({
      skip: 0,
      limit: 0
    });
    $scope.projectCreate = function () {
      nrgiProjectsMethodSrvc.createProject($scope.project).then(function () {
        nrgiNotifier.notify('Project created!');
        $location.path('/admin/project-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiProjectAdminCtrl', [
  '$scope',
  'nrgiProjectsSrvc',
  function ($scope, nrgiProjectsSrvc) {
    nrgiProjectsSrvc.query({
      skip: 0,
      limit: 0
    }, function (response) {
      $scope.projects = response.data;
    });
  }
]);angular.module('app').controller('nrgiProjectAdminUpdateCtrl', [
  '$scope',
  '$routeParams',
  '$location',
  'nrgiNotifier',
  'nrgiProjectsSrvc',
  'nrgiProjectsMethodSrvc',
  'nrgiCountriesSrvc',
  'nrgiCommoditiesSrvc',
  function ($scope, $routeParams, $location, nrgiNotifier, nrgiProjectsSrvc, nrgiProjectsMethodSrvc, nrgiCountriesSrvc, nrgiCommoditiesSrvc) {
    $scope.project = nrgiProjectsSrvc.get({ _id: $routeParams.id });
    $scope.country = nrgiCountriesSrvc.query({
      skip: 0,
      limit: 0
    });
    $scope.commodity = nrgiCommoditiesSrvc.query({
      skip: 0,
      limit: 0
    });
    $scope.projectUpdate = function () {
      nrgiProjectsMethodSrvc.updateProject($scope.project).then(function () {
        nrgiNotifier.notify('Project has been updated');
        $location.path('/admin/project-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
    $scope.projectDelete = function () {
      var project_deletion = $scope.project._id;
      nrgiProjectsMethodSrvc.deleteProject(project_deletion).then(function () {
        nrgiNotifier.notify('Project has been deleted');
        $location.path('/admin/project-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiSourceAdminCreateCtrl', [
  '$scope',
  '$location',
  'nrgiNotifier',
  'nrgiIdentitySrvc',
  'nrgiProjectsSrvc',
  'nrgiSourcesMethodSrvc',
  function ($scope, $location, nrgiNotifier, nrgiIdentitySrvc, nrgiProjectsSrvc, nrgiSourcesMethodSrvc) {
    var user = [];
    angular.extend(user, nrgiIdentitySrvc.currentUser);
    $scope.source = [];
    $scope.sourceCreate = function () {
      $scope.source.create_author = user._id;
      nrgiSourcesMethodSrvc.createSource($scope.source).then(function () {
        nrgiNotifier.notify('Source created!');
        $location.path('/admin/source-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiSourceAdminCtrl', [
  '$scope',
  'nrgiSourcesSrvc',
  function ($scope, nrgiSourcesSrvc) {
    nrgiSourcesSrvc.query({
      skip: 0,
      limit: 0
    }, function (response) {
      $scope.sources = response.data;
    });
  }
]);angular.module('app').controller('nrgiSourceAdminUpdateCtrl', [
  '$scope',
  '$routeParams',
  '$location',
  'nrgiNotifier',
  'nrgiProjectsSrvc',
  'nrgiSourcesMethodSrvc',
  'nrgiSourcesSrvc',
  function ($scope, $routeParams, $location, nrgiNotifier, nrgiProjectsSrvc, nrgiSourcesMethodSrvc, nrgiSourcesSrvc) {
    $scope.source = [];
    $scope.source = nrgiSourcesSrvc.get({ _id: $routeParams.id });
    $scope.sourceUpdate = function () {
      $scope.source.retrieve_date = new Date();
      nrgiSourcesMethodSrvc.updateSource($scope.source).then(function () {
        nrgiNotifier.notify('Source has been updated');
        $location.path('/admin/source-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
    $scope.sourceDelete = function () {
      var source_deletion = $scope.source._id;
      nrgiSourcesMethodSrvc.deleteSource(source_deletion).then(function () {
        nrgiNotifier.notify('Source has been deleted');
        $location.path('/admin/source-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiSourceTypeAdminCreateCtrl', [
  '$scope',
  '$location',
  'nrgiNotifier',
  'nrgiSourceTypesMethodSrvc',
  function ($scope, $location, nrgiNotifier, nrgiSourceTypesMethodSrvc) {
    var user = [];
    $scope.sourceType = [];
    $scope.sourceType.source_type_display = {
      status: false,
      name: 'No Display'
    };
    $scope.sourceType.source_type_authority = 'authoritative';
    $scope.type_display = [
      {
        status: false,
        name: 'No Display'
      },
      {
        status: true,
        name: 'Display'
      }
    ];
    $scope.authority = [
      {
        key: 0,
        name: 'authoritative'
      },
      {
        key: 1,
        name: 'non-authoritative'
      },
      {
        key: 2,
        name: 'disclosure'
      }
    ];
    $scope.sourceCreate = function () {
      $scope.sourceType.source_type_display = $scope.sourceType.source_type_display.status;
      $scope.sourceType.create_author = user._id;
      nrgiSourceTypesMethodSrvc.createSourceType($scope.sourceType).then(function () {
        nrgiNotifier.notify('Source Type created!');
        $location.path('/admin/sourceType-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiSourceTypeAdminCtrl', [
  '$scope',
  'nrgiSourceTypesSrvc',
  function ($scope, nrgiSourceTypesSrvc) {
    nrgiSourceTypesSrvc.query({
      skip: 0,
      limit: 0
    }, function (response) {
      $scope.sourceTypes = response.sourceTypes;
    });
  }
]);angular.module('app').controller('nrgiSourceTypeAdminUpdateCtrl', [
  '$scope',
  '$routeParams',
  '$location',
  'nrgiNotifier',
  'nrgiProjectsSrvc',
  'nrgiSourceTypesMethodSrvc',
  'nrgiSourceTypesSrvc',
  function ($scope, $routeParams, $location, nrgiNotifier, nrgiProjectsSrvc, nrgiSourceTypesMethodSrvc, nrgiSourceTypesSrvc) {
    $scope.sourceType = [];
    nrgiSourceTypesSrvc.get({ _id: $routeParams.id }, function (success) {
      $scope.sourceType = success;
      if ($scope.sourceType.source_type_display == true) {
        $scope.sourceType.source_type_display = {
          status: true,
          name: 'Display'
        };
      } else {
        $scope.sourceType.source_type_display = {
          status: false,
          name: 'No Display'
        };
      }
    });
    $scope.authority = [
      {
        key: 0,
        name: 'authoritative'
      },
      {
        key: 1,
        name: 'non-authoritative'
      },
      {
        key: 2,
        name: 'disclosure'
      }
    ];
    $scope.type_display = [
      {
        status: true,
        name: 'Display'
      },
      {
        status: false,
        name: 'No Display'
      }
    ];
    $scope.sourceUpdate = function () {
      $scope.sourceType.source_type_display = $scope.sourceType.source_type_display.status;
      nrgiSourceTypesMethodSrvc.updateSourceType($scope.sourceType).then(function () {
        nrgiNotifier.notify('Source Type has been updated');
        $location.path('/admin/sourceType-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
    $scope.sourceDelete = function () {
      var source_deletion = $scope.sourceType._id;
      nrgiSourceTypesMethodSrvc.deleteSourceType(source_deletion).then(function () {
        nrgiNotifier.notify('Source Type has been deleted');
        $location.path('/admin/sourceType-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiUserAdminCreateCtrl', [
  '$scope',
  '$location',
  'nrgiNotifier',
  'nrgiIdentitySrvc',
  'nrgiUserSrvc',
  'nrgiUserMethodSrvc',
  function ($scope, $location, nrgiNotifier, nrgiIdentitySrvc, nrgiUserSrvc, nrgiUserMethodSrvc) {
    $scope.role_options = [{
        value: 'admin',
        text: 'Administrator'
      }];
    // fix submit button functionality
    $scope.userCreate = function () {
      var new_user_data = {
          first_name: $scope.first_name,
          last_name: $scope.last_name,
          username: $scope.username,
          email: $scope.email,
          password: $scope.password,
          roles: [$scope.role_select],
          address: [$scope.address],
          language: [$scope.language]
        };
      nrgiUserMethodSrvc.createUser(new_user_data).then(function () {
        nrgiNotifier.notify('User account created!');
        $location.path('/admin/user-admin');
      }, function (reason) {
        nrgiNotifier.error(reason);
      });
    };
  }
]);angular.module('app').controller('nrgiUserAdminCtrl', [
  '$scope',
  'nrgiUserSrvc',
  function ($scope, nrgiUserSrvc) {
    $scope.users = nrgiUserSrvc.query();
    $scope.sort_options = [
      {
        value: 'first_name',
        text: 'Sort by First Name'
      },
      {
        value: 'last_name',
        text: 'Sort by Last Name'
      },
      {
        value: 'username',
        text: 'Sort by Username'
      },
      {
        value: 'roles[0]',
        text: 'Sort by Role'
      }
    ];
    $scope.sort_order = $scope.sort_options[1].value;
  }
]);angular.module('app').controller('nrgiUserAdminUpdateCtrl', [
  '$scope',
  '$routeParams',
  '$location',
  'nrgiNotifier',
  'nrgiUserSrvc',
  'nrgiUserMethodSrvc',
  function ($scope, $routeParams, $location, nrgiNotifier, nrgiUserSrvc, nrgiUserMethodSrvc) {
    $scope.user = nrgiUserSrvc.get({ _id: $routeParams.id });
    // fix submit button functionality
    $scope.userUpdate = function () {
      var new_user_data = $scope.user;
      if ($scope.password && $scope.password.length > 0) {
        if ($scope.password === $scope.password_rep) {
          new_user_data.password = $scope.password;
          nrgiUserMethodSrvc.updateUser(new_user_data).then(function () {
            nrgiNotifier.notify('User account has been updated');
          }, function (reason) {
            nrgiNotifier.error(reason);
          });
        } else {
          nrgiNotifier.error('Passwords must match!');
        }
      } else {
        nrgiUserMethodSrvc.updateUser(new_user_data).then(function () {
          nrgiNotifier.notify('User account has been updated');
        }, function (reason) {
          nrgiNotifier.error(reason);
        });
      }
      ;
    };
    $scope.userDelete = function () {
      var user_deletion = $scope.user._id;
      rgiUserMethodSrvc.deleteUser(user_deletion).then(function () {
        $location.path('/admin/user-admin');
        rgiNotifier.notify('User account has been deleted');
      }, function (reason) {
        rgiNotifier.error(reason);
      });
    };
  }
]);'use strict';
angular.module('app').factory('nrgiCSV', [
  '$filter',
  function ($filter) {
    var csv = [];
    var commodityName = '';
    var companyName = '';
    var countryName = '';
    var groupsName = '';
    var typeName = '';
    var name = '';
    var transferValue = '';
    var id = '';
    var str;
    var com = ', ';
    return {
      setCsv: function (fields, data) {
        csv = [];
        angular.forEach(data, function (p, key) {
          csv[key] = [];
          angular.forEach(fields, function (field, i) {
            if (field == 'transfer_value') {
              transferValue = '';
              transferValue = $filter('currency')(p[field], '', 0);
              csv[key].push(transferValue);
            }
            if (field == 'country') {
              countryName = '';
              if (p[field] != undefined) {
                countryName = p[field].name.toString();
                countryName = countryName.charAt(0).toUpperCase() + countryName.substr(1);
              }
              csv[key].push(countryName);
            }
            if (field == 'company') {
              companyName = '';
              if (p[field] != undefined) {
                companyName = p[field].company_name.toString();
                companyName = companyName.charAt(0).toUpperCase() + companyName.substr(1);
              }
              csv[key].push(companyName);
            }
            if (field == 'proj_site_type' || field == 'production_level') {
              type = '';
              if (p.proj_site != undefined && p.proj_site.type != undefined) {
                var type = p.proj_site.type.toString();
              }
              csv[key].push(type);
            }
            if (field == 'proj_site_id') {
              id = '';
              if (p.proj_site != undefined && p.proj_site._id != undefined && p.proj_site.type == 'project') {
                var id = p.proj_site._id.toString();
              }
              csv[key].push(id);
            }
            if (field == 'production_commodity') {
              if (p[field] && p[field].commodity_name) {
                commodityName = '';
                commodityName = p[field].commodity_name.toString();
                commodityName = commodityName.charAt(0).toUpperCase() + commodityName.substr(1);
                csv[key].push(commodityName);
              } else {
                csv[key].push('');
              }
            }
            if (field == 'proj_commodity' || field == 'site_commodity' || field == 'concession_commodities') {
              if (p[field] && p[field].length > 0) {
                str = '';
                var commodities = _.uniq(p[field], function (a) {
                    if (a) {
                      return a._id;
                    }
                  });
                angular.forEach(commodities, function (commodity, i) {
                  commodityName = '';
                  if (commodity != undefined) {
                    commodityName = commodity.commodity_name.toString();
                    commodityName = commodityName.charAt(0).toUpperCase() + commodityName.substr(1);
                  }
                  if (i != commodities.length - 1) {
                    str = str + commodityName + com;
                  } else {
                    str = str + commodityName;
                    csv[key].push(str);
                  }
                });
              } else {
                csv[key].push('');
              }
            }
            if (field == 'proj_status' || field == 'site_status' || field == 'concession_status') {
              if (p[field] && p[field].timestamp && p[field].string) {
                str = '';
                var date = new Date(p[field].timestamp);
                date = $filter('date')(date, 'MM/dd/yyyy @ h:mma');
                var statusName = p[field].string.toString();
                statusName = statusName.charAt(0).toUpperCase() + statusName.substr(1);
                str = str + statusName + ' (true at ' + date + ')';
                csv[key].push(str);
              } else {
                csv[key].push('');
              }
            }
            if (field == 'proj_country') {
              if (p[field] && p[field].length > 0) {
                str = '';
                angular.forEach(p[field], function (country, i) {
                  countryName = '';
                  if (country != undefined) {
                    countryName = country.name.toString();
                    countryName = countryName.charAt(0).toUpperCase() + countryName.substr(1);
                  }
                  if (i != p[field].length - 1) {
                    str = str + countryName + com;
                  } else {
                    str = str + countryName;
                    csv[key].push(str);
                  }
                });
              } else {
                csv[key].push('');
              }
            }
            if (field == 'company_groups') {
              if (p[field] && p[field].length > 0) {
                str = '';
                angular.forEach(p[field], function (groups, i) {
                  groupsName = '';
                  if (groups != undefined) {
                    groupsName = groups.company_group_name.toString();
                    groupsName = groupsName.charAt(0).toUpperCase() + groupsName.substr(1);
                  }
                  if (i != p[field].length - 1) {
                    str = str + groupsName + com;
                  } else {
                    str = str + groupsName;
                    csv[key].push(str);
                  }
                });
              } else {
                csv[key].push('');
              }
            }
            if (field == 'concession_country' || field == 'site_country') {
              if (p[field]) {
                countryName = '';
                countryName = p[field].name.toString();
                countryName = countryName.charAt(0).toUpperCase() + countryName.substr(1);
                csv[key].push(countryName);
              } else {
                csv[key].push('');
              }
            }
            if (field == 'companies') {
              if (p[field] && p[field].length > 0) {
                str = '';
                angular.forEach(p[field], function (company, i) {
                  companyName = '';
                  if (company != undefined) {
                    companyName = company.company_name.toString();
                    companyName = companyName.charAt(0).toUpperCase() + companyName.substr(1);
                  }
                  if (i != p[field].length - 1) {
                    str = str + companyName + com;
                  } else {
                    str = str + companyName;
                    csv[key].push(str);
                  }
                });
              } else {
                csv[key].push('');
              }
            }
            if (field == 'proj_type') {
              if (p.proj_commodity && p.proj_commodity.length > 0) {
                str = '';
                var projCommodity = _.uniq(p.proj_commodity, function (a) {
                    if (a) {
                      return a.commodity_type;
                    }
                  });
                angular.forEach(projCommodity, function (type, i) {
                  typeName = '';
                  if (type != undefined) {
                    typeName = $filter('addSpaces')(type.commodity_type);
                    typeName = typeName.charAt(0).toUpperCase() + typeName.substr(1);
                  }
                  if (i != projCommodity.length - 1) {
                    str = str + typeName + com;
                  } else {
                    str = str + typeName;
                    csv[key].push(str);
                  }
                });
              } else {
                csv[key].push('');
              }
            }
            if (field == 'concession_type') {
              if (p.concession_commodity && p.concession_commodity.length > 0) {
                str = '';
                var concessionCommodity = _.uniq(p.concession_commodity, function (a) {
                    return a.commodity_type;
                  });
                angular.forEach(concessionCommodity, function (type, i) {
                  typeName = type.commodity_type.toString();
                  typeName = typeName.charAt(0).toUpperCase() + typeName.substr(1);
                  if (i != concessionCommodity.length - 1) {
                    str = str + typeName + com;
                  } else {
                    str = str + typeName;
                    csv[key].push(str);
                  }
                });
              } else {
                csv[key].push('');
              }
            }
            if (field == 'site_commodity_type') {
              if (p.site_commodity && p.site_commodity.length > 0) {
                str = '';
                var commodityType = _.uniq(p.site_commodity, function (a) {
                    return a.commodity_type;
                  });
                angular.forEach(commodityType, function (type, i) {
                  typeName = $filter('addSpaces')(type.commodity_type);
                  typeName = typeName.charAt(0).toUpperCase() + typeName.substr(1);
                  if (i != commodityType.length - 1) {
                    str = str + typeName + com;
                  } else {
                    str = str + typeName;
                    csv[key].push(str);
                  }
                });
              } else {
                csv[key].push('');
              }
            }
            if (field == 'proj_id') {
              id = '';
              if (p.proj_site != undefined && p.proj_site._id != undefined) {
                id = p.proj_site._id.toString();
              }
              csv[key].push(id);
            }
            if (field == 'project_id') {
              id = '';
              if (p != undefined && p.proj_id != undefined) {
                id = p.proj_id.toString();
              }
              csv[key].push(id);
            }
            if (field == 'proj_site') {
              name = '';
              if (p[field] != undefined && p[field].name != undefined) {
                name = p[field].name.toString();
              }
              csv[key].push(name);
            }
            if (field != 'proj_status' && field != 'proj_commodity' && field != 'proj_type' && field != 'proj_country' && field != 'companies' && field != 'site_status' && field != 'site_commodity' && field != 'site_commodity_type' && field != 'site_country' && field != 'concession_status' && field != 'concession_commodities' && field != 'concession_type' && field != 'concession_country' && field != 'production_commodity' && field != 'proj_site' && field != 'production_level' && field != 'proj_id' && field != 'company' && field != 'company_groups' && field != 'country' && field != 'proj_site_type' && field != 'proj_site_id' && field != 'transfer_value' && field != 'project_id') {
              csv[key].push(p[field]);
            }
            if (data.length - 1 == key && fields.length - 1 == i) {
              return csv;
            }
          });
        });
      },
      getResult: function () {
        return csv;
      }
    };
  }
]);'use strict';
angular.module('app').filter('sanitize', [
  '$sce',
  function ($sce) {
    return function (htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    };
  }
]).filter('addSpaces', function () {
  return function (text) {
    if (text !== undefined) {
      return text.replace(/[_]/g, ' ');
    }
  };
}).filter('addSpace', function () {
  return function (text) {
    if (text !== undefined) {
      return text.replace(/[,]/g, ', ');
    }
  };
}).filter('zpad', function () {
  return function (n, len) {
    var num = parseInt(n, 10);
    len = parseInt(len, 10);
    if (isNaN(num) || isNaN(len)) {
      return n;
    }
    num = '' + num;
    while (num.length < len) {
      num = '0' + num;
    }
    return num;
  };
});'use strict';
angular.module('app').value('nrgiToastr', toastr);
angular.module('app').factory('nrgiNotifier', [
  'nrgiToastr',
  function (nrgiToastr) {
    return {
      notify: function (msg) {
        nrgiToastr.success(msg);
        console.log(msg);
      },
      error: function (msg) {
        nrgiToastr.error(msg);
        console.log(msg);
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiCompanyOperationTableCtrl', [
  '$scope',
  'nrgiTablesSrvc',
  'usSpinnerService',
  'nrgiCSV',
  function ($scope, nrgiTablesSrvc, usSpinnerService, nrgiCSV) {
    $scope.companies = [];
    $scope.openClose = true;
    $scope.loading = false;
    $scope.expression = '';
    var company_group_name = '';
    $scope.csv_company = [];
    var header_company = [];
    var fields = [];
    var str;
    var com = ', ';
    var limit = 50, currentPage = 0;
    var headers = [
        {
          name: 'Name',
          status: true,
          field: 'company_name'
        },
        {
          name: 'Group',
          status: $scope.group,
          field: 'company_groups'
        },
        {
          name: 'Stake ',
          status: $scope.stake,
          field: 'stake'
        }
      ];
    angular.forEach(headers, function (header) {
      if (header.status != false && header.status != undefined) {
        header_company.push(header.name);
        fields.push(header.field);
      }
    });
    $scope.getHeaderCompany = function () {
      return header_company;
    };
    usSpinnerService.spin('spinner-companyOperation');
    $scope.$watch('id', function (value) {
      if ($scope.type == 'countries_of_operation' && value != undefined) {
        usSpinnerService.stop('spinner-companyOperation');
        $scope.companies = value;
        if ($scope.companies.length == 0) {
          $scope.expression = 'showLast';
        } else {
          $scope.busy = false;
          limit = 50;
          currentPage = 1;
        }
      }
      if ($scope.type != 'countries_of_operation' && value != undefined) {
        $scope.loading = false;
        $scope.getCompanyOperation($scope.id, $scope.type);
      }
    });
    $scope.loadMoreCompaniesOfOperation = function () {
      if ($scope.busy)
        return;
      $scope.busy = true;
      nrgiTablesSrvc.query({
        _id: $scope.countryid,
        type: $scope.type,
        skip: currentPage * limit,
        limit: limit
      }, function (response) {
        $scope.companies = _.union($scope.companies, response.companies);
        if (response.companies.length > 49) {
          currentPage = currentPage + 1;
          $scope.busy = false;
        } else {
          $scope.busy = true;
        }
      });
    };
    $scope.loadCompaniesCSV = function () {
      nrgiCSV.setCsv(fields, $scope.companies);
      return nrgiCSV.getResult();
    };
    $scope.getAllCompanies = function () {
      if ($scope.busy == true && $scope.companies.length > 49 || $scope.companies.length < 49) {
        setTimeout(function () {
          angular.element(document.getElementById('loadCompanyCSV')).trigger('click');
        }, 0);
      } else {
        nrgiTablesSrvc.query({
          _id: $scope.countryid,
          type: $scope.type,
          skip: 0,
          limit: 5000000
        }, function (data) {
          $scope.companies = data.companies;
          $scope.busy = true;
          setTimeout(function () {
            angular.element(document.getElementById('loadCompanyCSV')).trigger('click');
          }, 0);
        });
      }
    };
    $scope.getCompanyOperation = function (id, type) {
      if ($scope.id != undefined) {
        if ($scope.openClose == true) {
          if ($scope.companies.length == 0 || $scope.loading == false) {
            $scope.loading = true;
            nrgiTablesSrvc.get({
              _id: id,
              type: type,
              skip: currentPage * limit,
              limit: limit
            }, function (success) {
              $scope.expression = '';
              $scope.companies = success.companies;
              if (success.companies.length == 0 && $scope.companies.length == 0) {
                $scope.expression = 'showLast';
              }
              usSpinnerService.stop('spinner-companyOperation');
              var headers = [
                  {
                    name: 'Name',
                    status: true,
                    field: 'company_name'
                  },
                  {
                    name: 'Group',
                    status: $scope.group,
                    field: 'company_groups'
                  },
                  {
                    name: 'Stake ',
                    status: $scope.stake,
                    field: 'stake'
                  }
                ];
              angular.forEach(headers, function (header) {
                if (header.status != false && header.status != undefined) {
                  header_company.push(header.name);
                  fields.push(header.field);
                }
              });
              $scope.getHeaderCompany = function () {
                return header_company;
              };
              angular.forEach($scope.companies, function (company, key) {
                $scope.csv_company[key] = [];
                angular.forEach(fields, function (field) {
                  if (field == 'company_groups') {
                    if (company[field].length > 0) {
                      str = '';
                      angular.forEach(company[field], function (group, i) {
                        company_group_name = '';
                        if (group != undefined) {
                          company_group_name = group.company_group_name.toString();
                          company_group_name = company_group_name.charAt(0).toUpperCase() + company_group_name.substr(1);
                        }
                        if (i != company[field].length - 1 && company_group_name != '') {
                          str = str + company_group_name + com;
                        } else {
                          str = str + company_group_name;
                          $scope.csv_company[key].push(str);
                        }
                      });
                    } else {
                      $scope.csv_company[key].push('');
                    }
                  }
                  //if(field=='stake'){
                  //    $scope.csv_company[key].push('UNFINISHED FIELD')
                  //}
                  if (field != 'company_groups' && field != 'stake') {
                    $scope.csv_company[key].push(company[field]);
                  }
                });
              });
            }, function (error) {
              usSpinnerService.stop('spinner-companyOperation');
            });
          }
        }
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiCompanyTableCtrl', [
  '$scope',
  'nrgiTablesSrvc',
  'usSpinnerService',
  'nrgiCSV',
  function ($scope, nrgiTablesSrvc, usSpinnerService, nrgiCSV) {
    $scope.companies = [];
    $scope.openClose = true;
    $scope.loading = false;
    $scope.expression = '';
    $scope.csv_company = [];
    var header_company = [];
    var fields = [];
    var str;
    var com = ', ';
    var limit = 50, currentPage = 0;
    var company_group_name = '';
    var headers = [
        {
          name: 'Name',
          status: true,
          field: 'company_name'
        },
        {
          name: 'Group',
          status: $scope.group,
          field: 'company_groups'
        },
        {
          name: 'Stake ',
          status: $scope.stake,
          field: 'stake'
        }
      ];
    angular.forEach(headers, function (header) {
      if (header.status != false && header.status != undefined) {
        header_company.push(header.name);
        fields.push(header.field);
      }
    });
    $scope.getHeaderCompanyInc = function () {
      return header_company;
    };
    usSpinnerService.spin('spinner-company');
    $scope.company_of_operation = [];
    $scope.$watch('id', function (value) {
      if ($scope.type == 'country_of_incorporation' && value != undefined || $scope.type == 'site' && value != undefined || $scope.type == 'concession' && value != undefined || $scope.type == 'project' && value != undefined) {
        $scope.companies = value;
        usSpinnerService.stop('spinner-company');
        if ($scope.companies.length == 0) {
          $scope.expression = 'showLast';
        } else {
          $scope.busy = false;
          limit = 50;
          currentPage = 1;
        }
      }
      if ($scope.type != 'country_of_incorporation' && value != undefined && $scope.type != 'site' && $scope.type != 'concession' && $scope.type != 'project') {
        $scope.loading = false;
        $scope.getCompany($scope.id, $scope.type);
      }
    });
    $scope.loadMoreCompanies = function () {
      if ($scope.busy)
        return;
      $scope.busy = true;
      nrgiTablesSrvc.query({
        _id: $scope.countryid,
        type: $scope.type,
        skip: currentPage * limit,
        limit: limit
      }, function (response) {
        $scope.companies = _.union($scope.companies, response.companies);
        if (response.companies.length > 49) {
          currentPage = currentPage + 1;
          $scope.busy = false;
        } else {
          $scope.busy = true;
        }
      });
    };
    $scope.loadCompaniesIncCSV = function () {
      nrgiCSV.setCsv(fields, $scope.companies);
      return nrgiCSV.getResult();
    };
    $scope.getAllCompaniesInc = function () {
      if ($scope.busy == true && $scope.companies.length > 49 || $scope.companies.length < 49) {
        setTimeout(function () {
          angular.element(document.getElementById('loadCompanyIncCSV')).trigger('click');
        }, 0);
      } else {
        nrgiTablesSrvc.query({
          _id: $scope.countryid,
          type: $scope.type,
          skip: 0,
          limit: 5000000
        }, function (data) {
          $scope.companies = data.companies;
          $scope.busy = true;
          setTimeout(function () {
            angular.element(document.getElementById('loadCompanyIncCSV')).trigger('click');
          }, 0);
        });
      }
    };
    $scope.getCompany = function (id, type) {
      if ($scope.id != undefined) {
        if ($scope.openClose == true) {
          if ($scope.companies.length == 0 || $scope.loading == false) {
            $scope.loading = true;
            nrgiTablesSrvc.get({
              _id: id,
              type: type,
              skip: currentPage * limit,
              limit: limit
            }, function (success) {
              $scope.expression = '';
              if (success.companies.length == 0 && $scope.companies.length == 0) {
                $scope.expression = 'showLast';
              }
              $scope.companies = success.companies;
              usSpinnerService.stop('spinner-company');
              var headers = [
                  {
                    name: 'Name',
                    status: true,
                    field: 'company_name'
                  },
                  {
                    name: 'Group',
                    status: $scope.group,
                    field: 'company_groups'
                  },
                  {
                    name: 'Stake ',
                    status: $scope.stake,
                    field: 'stake'
                  }
                ];
              angular.forEach(headers, function (header) {
                if (header.status != false && header.status != undefined) {
                  header_company.push(header.name);
                  fields.push(header.field);
                }
              });
              $scope.getHeaderCompany = function () {
                return header_company;
              };
              angular.forEach($scope.companies, function (company, key) {
                $scope.csv_company[key] = [];
                angular.forEach(fields, function (field) {
                  if (field == 'company_groups') {
                    if (company[field].length > 0) {
                      str = '';
                      angular.forEach(company[field], function (group, i) {
                        company_group_name = '';
                        if (group != undefined) {
                          company_group_name = group.company_group_name.toString();
                          company_group_name = company_group_name.charAt(0).toUpperCase() + company_group_name.substr(1);
                        }
                        if (i != company[field].length - 1 && company_group_name != '') {
                          str = str + company_group_name + com;
                        } else {
                          str = str + company_group_name;
                          $scope.csv_company[key].push(str);
                        }
                      });
                    } else {
                      $scope.csv_company[key].push('');
                    }
                  }
                  //if(field=='stake'){
                  //    $scope.csv_company[key].push('UNFINISHED FIELD')
                  //}
                  if (field != 'company_groups' && field != 'stake') {
                    $scope.csv_company[key].push(company[field]);
                  }
                });
              });
            }, function (error) {
              usSpinnerService.stop('spinner-company');
            });
          }
        }
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiConcessionTableCtrl', [
  '$scope',
  '$filter',
  'nrgiConcessionTablesSrvc',
  'usSpinnerService',
  'nrgiCSV',
  function ($scope, $filter, nrgiConcessionTablesSrvc, usSpinnerService, nrgiCSV) {
    $scope.concessions = [];
    $scope.openClose = true;
    //$scope.loading = false;
    $scope.expression = '';
    var headerConcessions = [], fields = [];
    var limit = 50, currentPage = 0;
    var headers = [
        {
          name: 'Name',
          status: true,
          field: 'concession_name'
        },
        {
          name: 'Country',
          status: $scope.country,
          field: 'concession_country'
        },
        {
          name: 'Commodity Type ',
          status: $scope.type,
          field: 'concession_type'
        },
        {
          name: 'Commodity ',
          status: $scope.commodity,
          field: 'concession_commodities'
        },
        {
          name: 'Status ',
          status: $scope.status,
          field: 'concession_status'
        },
        {
          name: 'No. Projects ',
          status: $scope.projects,
          field: 'projects_count'
        }
      ];
    angular.forEach(headers, function (header) {
      if (header.status != false && header.status != undefined) {
        headerConcessions.push(header.name);
        fields.push(header.field);
      }
    });
    $scope.getHeaderConcessions = function () {
      return headerConcessions;
    };
    usSpinnerService.spin('spinner-concession');
    $scope.$watch('id', function (value) {
      if ($scope.name == 'country' && value != undefined || $scope.name == 'company' && value != undefined) {
        $scope.concessions = value;
        usSpinnerService.stop('spinner-concession');
        if ($scope.concessions.length == 0) {
          $scope.expression = 'showLast';
        } else {
          $scope.busy = false;
          limit = 50;
          currentPage = 1;
        }
      }
      if ($scope.name == 'country' && value == undefined || $scope.name == 'company' && value == undefined) {
        usSpinnerService.stop('spinner-concession');
        $scope.expression = 'showLast';
      }
      if ($scope.name != 'country' && value != undefined && $scope.name != 'company') {
        $scope.loading = false;
        $scope.getConcessions($scope.id, $scope.name);
      }
    });
    $scope.loadMoreConcessions = function () {
      if ($scope.busy)
        return;
      $scope.busy = true;
      nrgiConcessionTablesSrvc.query({
        _id: $scope.countryid,
        type: $scope.name,
        skip: currentPage * limit,
        limit: limit
      }, function (response) {
        $scope.concessions = _.union($scope.concessions, response.concessions);
        if (response.concessions.length > 49) {
          currentPage = currentPage + 1;
          $scope.busy = false;
        } else {
          $scope.busy = true;
        }
      });
    };
    $scope.loadConcessionsCSV = function () {
      nrgiCSV.setCsv(fields, $scope.concessions);
      return nrgiCSV.getResult();
    };
    $scope.getAllConcessions = function () {
      if ($scope.busy == true && $scope.concessions.length > 49 || $scope.concessions.length < 49) {
        setTimeout(function () {
          angular.element(document.getElementById('loadConcessionCSV')).trigger('click');
        }, 0);
      } else {
        nrgiConcessionTablesSrvc.query({
          _id: $scope.countryid,
          type: $scope.name,
          skip: 0,
          limit: 5000000
        }, function (data) {
          $scope.concessions = data.concessions;
          $scope.busy = true;
          setTimeout(function () {
            angular.element(document.getElementById('loadConcessionCSV')).trigger('click');
          }, 0);
        });
      }
    };
    $scope.getConcessions = function (id, type) {
      if ($scope.id != undefined) {
        if ($scope.openClose == true) {
          if ($scope.concessions.length == 0 || $scope.loading == false) {
            $scope.loading = true;
            nrgiConcessionTablesSrvc.get({
              _id: id,
              type: type,
              skip: currentPage * limit,
              limit: limit
            }, function (success) {
              $scope.expression = '';
              if (success.concessions.length == 0 && $scope.concessions.length == 0) {
                $scope.expression = 'showLast';
              }
              $scope.concessions = success.concessions;
              usSpinnerService.stop('spinner-concession');
            }, function (error) {
              usSpinnerService.stop('spinner-concession');
            });
          }
        }
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiContractTableCtrl', [
  '$scope',
  'nrgiContractTablesSrvc',
  'usSpinnerService',
  '$filter',
  function ($scope, nrgiContractTablesSrvc, usSpinnerService, $filter) {
    $scope.openClose = true;
    $scope.loading = false;
    $scope.contracts = [];
    $scope.expression = '';
    $scope.csv_contracts = [];
    var countryName = '';
    var commodityName = '';
    var headerContracts = [];
    var fields = [];
    usSpinnerService.spin('spinner-contract');
    $scope.$watch('id', function (value) {
      if (value != undefined) {
        $scope.loading = false;
        setTimeout(function () {
          $scope.getContracts($scope.id, $scope.type);
        }, 2000);
      }
    });
    $scope.getContracts = function (id, type) {
      if ($scope.id != undefined) {
        if ($scope.openClose == true) {
          if ($scope.contracts.length == 0 || $scope.loading == false) {
            $scope.loading = true;
            nrgiContractTablesSrvc.get({
              _id: id,
              type: type
            }, function (success) {
              $scope.expression = '';
              $scope.contracts = success.contracts;
              if (success.contracts.length == 0 || _.isEmpty(success.contracts[0])) {
                $scope.expression = 'showLast';
                $scope.contracts = [];
              }
              usSpinnerService.stop('spinner-contract');
              var headers = [
                  {
                    name: 'Name',
                    status: !$scope.companies,
                    field: 'contract_name'
                  },
                  {
                    name: 'RC-ID',
                    status: $scope.companies,
                    field: '_id'
                  },
                  {
                    name: 'Country ',
                    status: $scope.country,
                    field: 'contract_country'
                  },
                  {
                    name: 'Commodity ',
                    status: $scope.commodity,
                    field: 'contract_commodity'
                  },
                  {
                    name: 'RC-ID ',
                    status: !$scope.companies,
                    field: '_id'
                  },
                  {
                    name: 'No. Companies ',
                    status: $scope.companies,
                    field: 'companies'
                  }
                ];
              angular.forEach(headers, function (header) {
                if (header.status != false && header.status != undefined) {
                  headerContracts.push(header.name);
                  fields.push(header.field);
                }
              });
              $scope.getHeaderContracts = function () {
                return headerContracts;
              };
              angular.forEach($scope.contracts, function (contract, key) {
                $scope.csv_contracts[key] = [];
                angular.forEach(fields, function (field) {
                  if (field == 'contract_country') {
                    countryName = '';
                    if (contract[field] != undefined) {
                      countryName = contract[field].name.toString();
                      countryName = countryName.charAt(0).toUpperCase() + countryName.substr(1);
                    }
                    $scope.csv_contracts[key].push(countryName);
                  }
                  if (field == 'contract_commodity') {
                    commodityName = '';
                    if (contract[field] != undefined) {
                      commodityName = $filter('addSpace')(contract[field].toString());
                    }
                    $scope.csv_contracts[key].push(commodityName);
                  }
                  if (field != 'contract_country' && field != 'contract_commodity') {
                    $scope.csv_contracts[key].push(contract[field]);
                  }
                });
              });
            }, function (error) {
              console.log(error);
              usSpinnerService.stop('spinner-contract');
            });
          }
        }
      }
    };
  }
]);//For now not used
//'use strict';
//angular
//    .module('app')
//    .controller('nrgiLastAddedCtrl', function ($scope, nrgiLastAddedSrvc) {
//        nrgiLastAddedSrvc.get(function (success) {
//            $scope.projects = success.projects;
//            $scope.sources = success.sources;
//        }, function(error) {
//        });
//    });
'use strict';
angular.module('app').controller('nrgiLeafletCtrl', [
  '$scope',
  '$rootScope',
  'nrgiCountryCoordinatesSrvc',
  function ($scope, $rootScope, nrgiCountryCoordinatesSrvc) {
    $scope.show = false;
    $scope.center = [];
    $scope.polygon = [];
    $scope.alldata = [];
    $scope.location = [];
    $rootScope.projects = [];
    var tilesDict = {
        openstreetmap: {
          url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
          options: {}
        }
      };
    angular.extend($scope, {
      tiles: tilesDict.openstreetmap,
      defaults: { scrollWheelZoom: false },
      controls: { fullscreen: { position: 'topleft' } },
      paths: {
        polygon: {
          type: 'polygon',
          latlngs: [],
          fillColor: 'red',
          weight: 2,
          color: 'red'
        }
      }
    });
    $scope.$watch('id', function (value) {
      if ($scope.type == 'country' && value != undefined || $scope.type == 'company' && value != undefined) {
        $scope.alldata = value;
        $scope.loadCoordinate($scope.alldata, $scope.polygon);
      }
      if ($scope.type != 'country' && value != undefined && $scope.type != 'company') {
        $scope.getCoordinate(value, $scope.type);
      }
    });
    $scope.$watch('data', function (value) {
      if (value != undefined) {
        $scope.alldata = value;
        if (value.polygon != undefined) {
          $scope.polygon = value.polygon;
        }
        $scope.loadCoordinate(value, $scope.polygon);
      }
    });
    $scope.getCoordinate = function (id, type) {
      setTimeout(function () {
        nrgiCountryCoordinatesSrvc.get({
          _id: id,
          type: type
        }, function (response) {
          $scope.alldata = response.proj_coordinates;
          if (response.polygon != undefined) {
            $scope.polygon = response.polygon;
          }
          $scope.loadCoordinate($scope.alldata, $scope.polygon);
        });
      }, 2000);
    };
    $scope.loadCoordinate = function (response, polygon) {
      $scope.polygon = polygon;
      if ($scope.map == true)
        $scope.data_loading = true;
      if ($scope.alldata.length > 0)
        var len = $scope.alldata.length;
      var counter = 0;
      var lat = [];
      var lng = [];
      angular.forEach(response, function (data) {
        counter++;
        if (data.type == 'site') {
          $scope.location.push({
            lat: data.lat,
            lng: data.lng,
            message: '<a href=\'site/' + data._id + '\'>' + data.message + '</a></br>' + data.message
          });
        } else if (data.type == 'field') {
          $scope.location.push({
            lat: data.lat,
            lng: data.lng,
            message: '<a href=\'field/' + data._id + '\'>' + data.message + '</a></br>' + data.message
          });
        } else if ($scope.map == true) {
          if (data.coordinates.length > 0) {
            $scope.location.push(data.coordinates[0]);
          }
        } else {
          $scope.location.push({
            lat: data.lat,
            lng: data.lng,
            message: '<a href=\'site/' + data._id + '\'>' + data.message + '</a></br>' + data.message
          });
        }
        lat.push(data.lat);
        lng.push(data.lng);
        if (len == counter && $scope.map == true) {
          $scope.data_loading = false;
          $scope.center = {
            lat: lat.reduce(function (pv, cv) {
              return pv + parseInt(cv);
            }, 0) / lat.length,
            lng: lng.reduce(function (pv, cv) {
              return pv + parseInt(cv);
            }, 0) / lng.length,
            zoom: 2
          };
        }
        if (len == counter && $scope.map != true && $scope.alldata.length > 1) {
          $scope.center = {
            lat: lat.reduce(function (pv, cv) {
              return pv + parseInt(cv);
            }, 0) / lat.length,
            lng: lng.reduce(function (pv, cv) {
              return pv + parseInt(cv);
            }, 0) / lng.length,
            zoom: 4
          };
        }
        if (len == counter && $scope.map != true && $scope.alldata.length == 1) {
          $scope.center = {
            lat: data.lat,
            lng: data.lng,
            zoom: 3
          };
        }
        $scope.show = true;
      });
      if ($scope.polygon != undefined) {
        if ($scope.polygon.length > 1) {
          angular.forEach($scope.polygon, function (polygon, i) {
            $scope.paths.polygon.latlngs[i] = polygon.coordinate;
          });
          $scope.paths.polygon.type = 'multiPolygon';
        }
        if ($scope.polygon.length == 1) {
          $scope.paths.polygon.type = 'polygon';
          $scope.paths.polygon.latlngs = $scope.polygon[0].coordinate;
        }
      }
    };
  }
]);'use strict';
angular.module('app').controller('rgiListNavCtrl', [
  '$scope',
  function ($scope) {
  }
]);'use strict';
angular.module('app').controller('nrgiMapCtrl', [
  '$scope',
  '$rootScope',
  'nrgiMainMapSrvc',
  '$http',
  'usSpinnerService',
  '$location',
  function ($scope, $rootScope, nrgiMainMapSrvc, $http, usSpinnerService, $location) {
    var zoom = d3.behavior.zoom().scaleExtent([
        0.7,
        8
      ]).on('zoom', zoomed);
    usSpinnerService.spin('spinner-map');
    var width = angular.element('.map_data').width(), height = $scope.height;
    var tooltip = d3.select('.map_data').append('div').attr('class', 'hidden tooltip');
    $scope.projCheckbox = true;
    $scope.paymentsCheckbox = true;
    $scope.count = 2;
    var g, color, coords, circle, element, mouse;
    nrgiMainMapSrvc.get({}, function (success) {
      if (success.data && success.world) {
        $scope.resourceproject = success.data;
        $scope.capitals = success.world;
        drawmap();
      } else {
        console.log('Error');
      }
    });
    function drawmap() {
      d3.xml('../../assets/worldWithAntarcticaHigh.svg', function (xml) {
        d3.select('.map_data').node().appendChild(xml.documentElement);
        d3.select('svg').attr('width', width).attr('height', height);
        if ($scope.type != 'map') {
          d3.select('g').attr('transform', 'translate(0,0)scale(0.7)');
        }
        d3.select('rect').attr('class', 'overlay').attr('width', width).attr('height', height).call(zoom);
        g = d3.select('g');
        $scope.countries = g.selectAll('.land').attr('project_count', function () {
          return 0;
        }).attr('transfer_count', function () {
          return 0;
        }).on('mousemove', mouseover).on('mouseout', mouseout).on('click', clickCountry);
        angular.forEach($scope.resourceproject, function (resourceproject) {
          angular.forEach($scope.countries[0], function (country) {
            if (country.id == resourceproject.iso2) {
              d3.select('#' + country.id).attr('class', function () {
                color = getGroup(resourceproject.project_count);
                return 'subunit-boundary subunit Group' + color + ' ' + country.id;
              }).attr('project_count', function () {
                return resourceproject.project_count;
              }).attr('transfer_count', function () {
                return resourceproject.transfer_count;
              }).on('mousemove', mouseover).on('mouseout', mouseout).on('click', clickCountry);
              coords = $scope.capitals.filter(function (item) {
                return item.iso2 === country.id;
              });
              coords = coords[0];
              if (coords) {
                circle = d3.select('g').append('circle').attr('class', function () {
                  color = 0;
                  if (resourceproject.transfer_count > 0) {
                    color = 1;
                  }
                  return 'bubble-boundary bubble Group' + color + ' ' + country.id;
                }).attr('transfer_count', function () {
                  return resourceproject.transfer_count;
                }).attr('project_count', function () {
                  return resourceproject.project_count;
                }).attr('title', function () {
                  return d3.select('#' + country.id).attr('title');
                }).attr('id', function () {
                  return country.id;
                }).attr('d', $scope.path).attr('transform', function (d) {
                  element = d3.select('#' + country.id).node();
                  if (element.getBBox().width > 50 && element.getBBox().height > 50) {
                    if (coords.lat >= 0 && coords.long >= 0) {
                      return 'translate(' + [
                        element.getBBox().x + coords.lat / 2,
                        element.getBBox().y + coords.long / 2
                      ] + ')';
                    } else {
                      return 'translate(' + [
                        element.getBBox().x + element.getBBox().width - Math.abs(coords.lat),
                        element.getBBox().y + element.getBBox().height - Math.abs(coords.long) / 2
                      ] + ')';
                    }
                  } else {
                    return 'translate(' + [
                      element.getBBox().x + element.getBBox().width / 2,
                      element.getBBox().y + element.getBBox().height / 2
                    ] + ')';
                  }
                }).attr('r', function (d) {
                  return radius(resourceproject.transfer_count);
                }).on('click', clickCountry).on('mousemove', mouseover).on('mouseout', mouseout);
              }
            }
          });
        });
      });
      usSpinnerService.stop('spinner-map');
    }
    function zoomed() {
      g.attr('transform', 'translate(' + zoom.translate() + ')' + 'scale(' + zoom.scale() + ')');
      g.select('land').style('stroke-width', 1 / zoom.scale() + 'px');
    }
    function mouseover() {
      mouse = d3.mouse(d3.select('rect').node()).map(function (d) {
        return parseInt(d);
      });
      d3.select(this).style('cursor', 'pointer');
      tooltip.classed('hidden', false).attr('style', 'left:' + (mouse[0] + 35) + 'px; top:' + mouse[1] + 'px').html('<p>' + d3.select(this).attr('title') + '<br> Projects: ' + d3.select(this).attr('project_count') + '<br> Payments:' + d3.select(this).attr('transfer_count') + '</p>');
    }
    function mouseout() {
      g.selectAll('.' + d3.select(this).attr('id'));
      d3.select(this).style('cursor', 'default');
      tooltip.classed('hidden', true);
    }
    function clickCountry() {
      $location.path('/country/' + d3.select(this).attr('id'));
      $scope.$apply();
    }
    function getGroup(value) {
      if (value < 1)
        return 1;
      else if (value < 2)
        return 2;
      else if (value < 5)
        return 3;
      else if (value < 10)
        return 4;
      else if (value < 15)
        return 5;
      else if (value < 20)
        return 6;
      else if (value < 50)
        return 7;
      else if (value < 100)
        return 8;
      else if (value < 150)
        return 9;
      else
        return 10;
    }
    function radius(value) {
      if (value < 0)
        return 0;
      else if (value < 1)
        return 4;
      else if (value < 10)
        return 5;
      else if (value < 15)
        return 6;
      else if (value < 30)
        return 7;
      else if (value < 50)
        return 8;
      else
        return 9;
    }
    function interpolateZoom(translate, scale) {
      var self = this;
      return d3.transition().duration(350).tween('zoom', function () {
        var iTranslate = d3.interpolate(zoom.translate(), translate), iScale = d3.interpolate(zoom.scale(), scale);
        return function (t) {
          zoom.scale(iScale(t)).translate(iTranslate(t));
          zoomed();
        };
      });
    }
    function zoomClick() {
      var clicked = d3.event.target, direction = 1, factor = 0.2, target_zoom = 1, center = [
          width / 2,
          height / 2
        ], extent = zoom.scaleExtent(), translate = zoom.translate(), translate0 = [], l = [], view = {
          x: translate[0],
          y: translate[1],
          k: zoom.scale()
        };
      d3.event.preventDefault();
      direction = this.id === 'zoomIn' ? 1 : -1;
      target_zoom = zoom.scale() * (1 + factor * direction);
      if (target_zoom < extent[0] || target_zoom > extent[1]) {
        return false;
      }
      translate0 = [
        (center[0] - view.x) / view.k,
        (center[1] - view.y) / view.k
      ];
      view.k = target_zoom;
      l = [
        translate0[0] * view.k + view.x,
        translate0[1] * view.k + view.y
      ];
      view.x += center[0] - l[0];
      view.y += center[1] - l[1];
      interpolateZoom([
        view.x,
        view.y
      ], view.k);
    }
    d3.selectAll('button').on('click', zoomClick);
    d3.select(self.frameElement).style('height', height + 'px');
    $scope.checked = function (check, type) {
      if (check == false) {
        $scope.count--;
      } else {
        $scope.count++;
      }
      if (type == 'paymentsCheckbox' && check == false) {
        d3.select('.map_data').selectAll('.bubble').attr('class', function (d) {
          return 'bubble-boundary bubble Group0 ' + d3.select(this).attr('id');
        });
      }
      if (type == 'projCheckbox' && check == false) {
        d3.select('.map_data').selectAll('.subunit').attr('class', function (d) {
          return 'subunit-boundary subunit Group1 ' + d3.select(this).attr('id');
        });
      }
      if (type == 'projCheckbox' && check == true) {
        g.selectAll('.subunit').attr('class', function (d) {
          color = getGroup(d3.select(this).attr('project_count'));
          return 'subunit-boundary subunit Group' + color + ' ' + d3.select(this).attr('id');
        });
      }
      if (type == 'paymentsCheckbox' && check == true) {
        g.selectAll('.bubble').attr('class', function (d) {
          color = 0;
          if (d3.select(this).attr('transfer_count') > 0) {
            color = 1;
          }
          return 'bubble-boundary bubble Group' + color + ' ' + d3.select(this).attr('id');
        });
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiProductionTableCtrl', [
  '$scope',
  'nrgiProdTablesSrvc',
  'usSpinnerService',
  'nrgiCSV',
  function ($scope, nrgiProdTablesSrvc, usSpinnerService, nrgiCSV) {
    $scope.production = [];
    $scope.loading = false;
    $scope.openClose = true;
    var headerTransfer = [];
    $scope.expression = '';
    var fields = [];
    var headers = [
        {
          name: 'Year',
          status: true,
          field: 'production_year'
        },
        {
          name: 'Volume',
          status: true,
          field: 'production_volume'
        },
        {
          name: 'Unit',
          status: true,
          field: 'production_unit'
        },
        {
          name: 'Commodity',
          status: true,
          field: 'production_commodity'
        },
        {
          name: 'Price',
          status: true,
          field: 'production_price'
        },
        {
          name: 'Price unit',
          status: true,
          field: 'production_price_unit'
        },
        {
          name: 'Level ',
          status: true,
          field: 'production_level'
        },
        {
          name: 'Project ID',
          status: $scope.projectlink,
          field: 'proj_id'
        },
        {
          name: 'Project / Site ',
          status: $scope.projectlink,
          field: 'proj_site'
        }
      ];
    angular.forEach(headers, function (header) {
      if (header.status != false && header.status != undefined) {
        headerTransfer.push(header.name);
        fields.push(header.field);
      }
    });
    $scope.getHeaderProduction = function () {
      return headerTransfer;
    };
    var limit = 50, currentPage = 0;
    usSpinnerService.spin('spinner-production');
    $scope.$watch('id', function (value) {
      if ($scope.type == 'country' && value == undefined || $scope.type == 'company' && value == undefined || $scope.type == 'site' && value == undefined || $scope.type == 'concession' && value == undefined || $scope.type == 'project' && value == undefined) {
        usSpinnerService.stop('spinner-transfers');
        $scope.expression = 'showLast';
      }
      if ($scope.type == 'country' && value != undefined || $scope.type == 'company' && value != undefined || $scope.type == 'site' && value != undefined || $scope.type == 'concession' && value != undefined || $scope.type == 'project' && value != undefined) {
        $scope.production = value;
        usSpinnerService.stop('spinner-production');
        if ($scope.production.length == 0) {
          $scope.expression = 'showLast';
        } else {
          $scope.busy = false;
          currentPage = 1;
        }
      }
      if ($scope.type != 'country' && value != undefined && $scope.type != 'company' && $scope.type != 'site' && $scope.type != 'concession' && $scope.type != 'project') {
        $scope.loading = false;
        $scope.getProduction($scope.id, $scope.type);
      }
    });
    $scope.loadMoreProductions = function () {
      if ($scope.busy)
        return;
      $scope.busy = true;
      nrgiProdTablesSrvc.query({
        _id: $scope.countryid,
        type: $scope.type,
        skip: currentPage * limit,
        limit: limit
      }, function (response) {
        $scope.production = _.union($scope.production, response.production);
        if (response.production.length > 49) {
          currentPage = currentPage + 1;
          $scope.busy = false;
        } else {
          $scope.busy = true;
        }
      });
    };
    $scope.loadProductionsCSV = function () {
      nrgiCSV.setCsv(fields, $scope.production);
      return nrgiCSV.getResult();
    };
    $scope.getAllProductions = function () {
      if ($scope.busy == true && $scope.production.length > 49 || $scope.production.length < 49) {
        setTimeout(function () {
          angular.element(document.getElementById('loadProductionCSV')).trigger('click');
        }, 0);
      } else {
        nrgiProdTablesSrvc.query({
          _id: $scope.countryid,
          type: $scope.type,
          skip: 0,
          limit: 5000000
        }, function (data) {
          $scope.production = data.production;
          $scope.busy = true;
          setTimeout(function () {
            angular.element(document.getElementById('loadProductionCSV')).trigger('click');
          }, 0);
        });
      }
    };
    $scope.getProduction = function (id, type) {
      if ($scope.id != undefined) {
        if ($scope.openClose == true) {
          if ($scope.production.length == 0 || $scope.loading == false) {
            $scope.loading = true;
            nrgiProdTablesSrvc.get({
              _id: id,
              type: type,
              skip: currentPage * limit,
              limit: limit
            }, function (success) {
              $scope.expression = '';
              if (success.production.length == 0 && $scope.production.length == 0) {
                $scope.expression = 'showLast';
              }
              $scope.production = success.production;
              usSpinnerService.stop('spinner-production');
            }, function (error) {
              console.log(error);
              usSpinnerService.stop('spinner-production');
            });
          }
        }
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiProjectTableCtrl', [
  '$scope',
  'nrgiProjectTablesSrvc',
  'usSpinnerService',
  'nrgiCSV',
  function ($scope, nrgiProjectTablesSrvc, usSpinnerService, nrgiCSV) {
    $scope.projects = [];
    $scope.openClose = true;
    $scope.expression = '';
    $scope.count = 0;
    $scope.busy = true;
    var headerProject = [];
    var fields = [];
    var limit = 50, currentPage = 0;
    var headers = [
        {
          name: 'Project ID',
          status: true,
          field: 'project_id'
        },
        {
          name: 'Name',
          status: true,
          field: 'proj_name'
        },
        {
          name: 'Country',
          status: $scope.country,
          field: 'proj_country'
        },
        {
          name: 'Commodity Type ',
          status: $scope.type,
          field: 'proj_type'
        },
        {
          name: 'Commodity ',
          status: $scope.commodity,
          field: 'proj_commodity'
        },
        {
          name: 'Status ',
          status: $scope.status,
          field: 'proj_status'
        },
        {
          name: 'Companies ',
          status: $scope.companies,
          field: 'companies'
        }
      ];
    angular.forEach(headers, function (header) {
      if (header.status != false && header.status != undefined) {
        headerProject.push(header.name);
        fields.push(header.field);
      }
    });
    $scope.getHeaderProjects = function () {
      return headerProject;
    };
    usSpinnerService.spin('spinner-project');
    $scope.$watch('id', function (value) {
      if ($scope.type == 'country' && value == undefined || $scope.type == 'company' && value == undefined || $scope.type == 'concession' && value == undefined) {
        usSpinnerService.stop('spinner-project');
        $scope.expression = 'showLast';
      }
      if ($scope.type == 'country' && value != undefined || $scope.type == 'company' && value != undefined || $scope.type == 'concession' && value != undefined) {
        $scope.projects = value;
        usSpinnerService.stop('spinner-project');
        if ($scope.projects.length == 0) {
          $scope.expression = 'showLast';
        } else {
          $scope.busy = false;
          limit = 50;
          currentPage = 1;
        }
      }
      if ($scope.type != 'country' && value != undefined && $scope.type != 'company' && $scope.type != 'concession') {
        $scope.loading = false;
        $scope.getProjects($scope.id, $scope.type);
      }
    });
    $scope.loadMoreProjects = function () {
      if ($scope.busy)
        return;
      $scope.busy = true;
      nrgiProjectTablesSrvc.query({
        _id: $scope.countryid,
        type: $scope.type,
        skip: currentPage * limit,
        limit: limit
      }, function (response) {
        $scope.projects = _.union($scope.projects, response.projects);
        if (response.projects.length > 49) {
          currentPage = currentPage + 1;
          $scope.busy = false;
        } else {
          $scope.busy = true;
        }
      });
    };
    $scope.loadCSV = function () {
      nrgiCSV.setCsv(fields, $scope.projects);
      return nrgiCSV.getResult();
    };
    $scope.getAllProjects = function () {
      if ($scope.busy == true && $scope.projects.length > 49 || $scope.projects.length < 49) {
        setTimeout(function () {
          angular.element(document.getElementById('loadProjectCSV')).trigger('click');
        }, 0);
      } else {
        nrgiProjectTablesSrvc.query({
          _id: $scope.countryid,
          type: $scope.type,
          skip: 0,
          limit: 5000000
        }, function (data) {
          $scope.projects = data.projects;
          $scope.busy = true;
          setTimeout(function () {
            angular.element(document.getElementById('loadProjectCSV')).trigger('click');
          }, 0);
        });
      }
    };
    $scope.getProjects = function (id, type) {
      if ($scope.id != undefined) {
        if ($scope.openClose == true) {
          if ($scope.projects.length == 0 || $scope.loading == false) {
            $scope.loading = true;
            nrgiProjectTablesSrvc.get({
              _id: id,
              type: type,
              skip: currentPage * limit,
              limit: limit
            }, function (success) {
              $scope.expression = '';
              if (success.projects.length == 0 && $scope.projects.length == 0) {
                $scope.expression = 'showLast';
              }
              $scope.projects = success.projects;
              usSpinnerService.stop('spinner-project');
            }, function (error) {
              console.log(error);
              usSpinnerService.stop('spinner-project');
            });
          }
        }
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiSiteTableCtrl', [
  '$scope',
  '$filter',
  'nrgiSiteFieldTablesSrvc',
  'usSpinnerService',
  'nrgiCSV',
  function ($scope, $filter, nrgiSiteFieldTablesSrvc, usSpinnerService, nrgiCSV) {
    $scope.sites = [];
    $scope.openClose = true;
    $scope.loading = false;
    $scope.csv_site = [];
    $scope.expression = '';
    var headerSite = [];
    var fields = [];
    var limit = 50, currentPage = 0;
    var headers = [
        {
          name: 'Name',
          status: true,
          field: 'site_name'
        },
        {
          name: 'Type',
          status: $scope.type,
          field: 'site_type'
        },
        {
          name: 'Country',
          status: $scope.country,
          field: 'site_country'
        },
        {
          name: 'Commodity Type ',
          status: $scope.commoditytype,
          field: 'site_commodity_type'
        },
        {
          name: 'Commodity ',
          status: $scope.commodity,
          field: 'site_commodity'
        },
        {
          name: 'Status ',
          status: $scope.status,
          field: 'site_status'
        },
        {
          name: 'Companies ',
          status: $scope.company,
          field: 'companies'
        }
      ];
    angular.forEach(headers, function (header) {
      if (header.status != false && header.status != undefined) {
        headerSite.push(header.name);
        fields.push(header.field);
      }
    });
    $scope.getHeaderSites = function () {
      return headerSite;
    };
    usSpinnerService.spin('spinner-site');
    $scope.$watch('id', function (value) {
      if ($scope.name == 'country' && value == undefined || $scope.name == 'company' && value == undefined || $scope.name == 'concession' && value == undefined) {
        usSpinnerService.stop('spinner-site');
        $scope.expression = 'showLast';
      }
      if ($scope.name == 'country' && value != undefined || $scope.name == 'company' && value != undefined || $scope.name == 'concession' && value != undefined) {
        $scope.sites = value;
        usSpinnerService.stop('spinner-site');
        if ($scope.sites.length == 0) {
          $scope.expression = 'showLast';
        } else {
          $scope.busy = false;
          limit = 50;
          currentPage = 1;
        }
      }
      if ($scope.name != 'country' && value != undefined && $scope.name != 'company' && $scope.name != 'concession') {
        $scope.loading = false;
        $scope.getSites($scope.id, $scope.name);
      }
    });
    $scope.loadMoreSites = function () {
      if ($scope.busy)
        return;
      $scope.busy = true;
      nrgiSiteFieldTablesSrvc.query({
        _id: $scope.countryid,
        type: $scope.name,
        skip: currentPage * limit,
        limit: limit
      }, function (response) {
        $scope.sites = _.union($scope.sites, response.sites);
        if (response.sites.length > 49) {
          currentPage = currentPage + 1;
          $scope.busy = false;
        } else {
          $scope.busy = true;
        }
      });
    };
    $scope.loadSitesCSV = function () {
      nrgiCSV.setCsv(fields, $scope.sites);
      return nrgiCSV.getResult();
    };
    $scope.getAllSites = function () {
      if ($scope.busy == true && $scope.sites.length > 49 || $scope.sites.length < 49) {
        setTimeout(function () {
          angular.element(document.getElementById('loadSitesCSV')).trigger('click');
        }, 0);
      } else {
        nrgiSiteFieldTablesSrvc.query({
          _id: $scope.countryid,
          type: $scope.name,
          skip: 0,
          limit: 5000000
        }, function (data) {
          $scope.sites = data.sites;
          $scope.busy = true;
          setTimeout(function () {
            angular.element(document.getElementById('loadSitesCSV')).trigger('click');
          }, 0);
        });
      }
    };
    $scope.getSites = function (id, type) {
      if ($scope.id != undefined) {
        if ($scope.openClose == true) {
          if ($scope.sites.length == 0 || $scope.loading == false) {
            $scope.loading = true;
            nrgiSiteFieldTablesSrvc.get({
              _id: id,
              type: type,
              skip: currentPage * limit,
              limit: limit
            }, function (success) {
              $scope.expression = '';
              if (success.sites.length == 0 && $scope.sites.length == 0) {
                $scope.expression = 'showLast';
              }
              $scope.sites = success.sites;
              usSpinnerService.stop('spinner-site');
            }, function (error) {
              console.log(error);
              usSpinnerService.stop('spinner-site');
            });
          }
        }
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiSourcesTableCtrl', [
  '$scope',
  'nrgiSourceTablesSrvc',
  'usSpinnerService',
  function ($scope, nrgiSourceTablesSrvc, usSpinnerService) {
    $scope.sources = [];
    $scope.csv_sources = [];
    $scope.loading = false;
    $scope.openClose = true;
    $scope.expression = '';
    usSpinnerService.spin('spinner-source');
    $scope.$watch('id', function (value) {
      if (value != undefined) {
        $scope.loading = false;
        $scope.getSources($scope.id, $scope.type);
      }
    });
    $scope.getSources = function (id, type) {
      if ($scope.id != undefined) {
        if ($scope.openClose == true) {
          if ($scope.sources.length == 0 || $scope.loading == false) {
            $scope.loading = true;
            nrgiSourceTablesSrvc.get({
              _id: id,
              type: type
            }, function (success) {
              $scope.expression = '';
              if (success.sources.length == 0 && $scope.sources.length == 0) {
                $scope.expression = 'showLast';
              }
              $scope.sources = _.uniq(success.sources, function (a) {
                if (a && a._id) {
                  return a._id;
                }
              });
              usSpinnerService.stop('spinner-source');
              $scope.getHeaderSources = function () {
                return [
                  'Name',
                  'Type',
                  'Authority'
                ];
              };
              angular.forEach($scope.sources, function (p) {
                $scope.csv_sources.push({
                  'name': p.source_name,
                  'type': p.source_type_id.source_type_name,
                  'authority': p.source_type_id.source_type_authority
                });
              });
            }, function (error) {
              console.log(error);
              usSpinnerService.stop('spinner-source');
            });
          }
        }
      }
    };
  }
]);//For now not used
//'use strict';
//angular
//    .module('app')
//    .controller('nrgiSummaryStatsCtrl', function ($scope, nrgiSummaryStatsSrvc, nrgiSumOfPaymentsSrvc) {
//        $scope.summaryStats=[];
//
//        nrgiSummaryStatsSrvc.get(function (success) {
//            $scope.summaryStats = success;
//        }, function(error) {
//
//        });
//
//        nrgiSumOfPaymentsSrvc.get(function (success) {
//            $scope.usd = success.usd;
//            $scope.bbl = success.bbl;
//            $scope.gbp = success.gbp;
//        }, function(error) {
//
//        });
//    });
'use strict';
angular.module('app').controller('nrgiSunburstByGovCtrl', [
  '$scope',
  'nrgiPaymentsByGovSrvc',
  'usSpinnerService',
  function ($scope, nrgiPaymentsByGovSrvc, usSpinnerService) {
    $scope.sunburst = [];
    $scope.csv_transfers = [];
    var header_transfer = [];
    var total = '';
    var fields = [];
    var country_name = '';
    var company_name = '';
    $scope.options = {
      chart: {
        type: 'sunburstChart',
        height: 450,
        color: d3.scale.category20c(),
        duration: 250,
        mode: 'size',
        noData: '',
        sunburst: {
          dispatch: {
            chartClick: function (e) {
              if (e.pos.target.previousSibling == null) {
                total = e.data[0].name.split('<br>');
                total = total[1];
                e.data[0].name = 'All payments<br>' + total;
              } else {
                total = e.data[0].name.split('<br>');
                total = total[1];
                e.data[0].name = 'All payments(click to zoom out)<br>' + total;
              }
            },
            elementMousemove: function (e) {
              angular.element('path').css('opacity', 0.3);
              angular.element('.hover').css('opacity', 1);
            },
            elementMouseout: function (e) {
              angular.element('path').css('opacity', 1);
            }
          }
        },
        tooltip: {
          valueFormatter: function (d, i) {
            return '';
          },
          keyFormatter: function (d, i) {
            if ($scope.currency_filter && $scope.currency_filter != 'Show all currency') {
              return d + ' ' + $scope.currency_filter;
            } else {
              return d;
            }
          }
        }
      }
    };
    var headers = [
        {
          name: 'Year',
          status: true,
          field: 'transfer_year'
        },
        {
          name: 'Paid by',
          status: true,
          field: 'company'
        },
        {
          name: 'Paid to',
          status: true,
          field: 'country'
        },
        {
          name: 'Gov entity',
          status: true,
          field: 'transfer_gov_entity'
        },
        {
          name: 'Level ',
          status: true,
          field: 'transfer_level'
        },
        {
          name: 'Payment Type',
          status: true,
          field: 'transfer_type'
        },
        {
          name: 'Currency',
          status: true,
          field: 'transfer_unit'
        },
        {
          name: 'Value ',
          status: true,
          field: 'transfer_value'
        }
      ];
    angular.forEach(headers, function (header) {
      if (header.status != false && header.status != undefined) {
        header_transfer.push(header.name);
        fields.push(header.field);
      }
    });
    $scope.getHeaderTransfers = function () {
      return header_transfer;
    };
    $scope.year_selector = [];
    $scope.currency_selector = [];
    $scope.type_selector = [];
    $scope.company_selector = [];
    $scope.year_filter = '2015';
    $scope.currency_filter = 'USD';
    $scope.type_filter = 'Show all types';
    $scope.company_filter = 'Show all companies';
    var searchOptions = {
        transfer_unit: 'USD',
        transfer_year: '2015'
      };
    $scope.load = function (searchOptions) {
      usSpinnerService.spin('spinner-sunburst-by-gov');
      $scope.options.chart.noData = '';
      $scope.sunburst = [];
      nrgiPaymentsByGovSrvc.query(searchOptions, function (response) {
        $scope.total = 0;
        if (response.sunburstNew && response.sunburstNew[0] && response.sunburstNew[0].children) {
          $scope.sunburst = response.sunburstNew;
          $scope.total = response.sunburstNew[0].total_value;
          $scope.all_currency_value = response.total;
          $scope.options.chart.noData = 'No Data Available.';
          usSpinnerService.stop('spinner-sunburst-by-gov');
          $scope.csv_transfers = [];
          angular.forEach(response.transfers, function (transfer, key) {
            $scope.csv_transfers[key] = [];
            angular.forEach(fields, function (field) {
              if (field == 'country') {
                country_name = '';
                if (transfer[field] != undefined) {
                  country_name = transfer[field].name.toString();
                  country_name = country_name.charAt(0).toUpperCase() + country_name.substr(1);
                }
                $scope.csv_transfers[key].push(country_name);
              }
              if (field == 'company') {
                company_name = '';
                if (transfer[field] != undefined) {
                  company_name = transfer[field].company_name.toString();
                  company_name = company_name.charAt(0).toUpperCase() + company_name.substr(1);
                }
                $scope.csv_transfers[key].push(company_name);
              }
              if (field != 'company' && field != 'country') {
                $scope.csv_transfers[key].push(transfer[field]);
              }
            });
          });
        } else {
          $scope.options.chart.noData = 'No Data Available.';
          usSpinnerService.stop('spinner-sunburst-by-gov');
        }
        if (response && response.filters) {
          $scope.year_selector = response.filters.year_selector;
          $scope.currency_selector = response.filters.currency_selector;
          $scope.type_selector = response.filters.type_selector;
          $scope.company_selector = response.filters.company_selector;
        }
      }, function (error) {
        usSpinnerService.stop('spinner-sunburst-by-gov');
      });
    };
    $scope.load(searchOptions);
    $scope.$watch('year_filter', function (year) {
      if (searchOptions.transfer_year != year && year && year != 'Show all years') {
        searchOptions.transfer_year = year;
        $scope.load(searchOptions);
      } else if (searchOptions.transfer_year && year == 'Show all years') {
        delete searchOptions.transfer_year;
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('currency_filter', function (currency) {
      if (searchOptions.transfer_unit != currency && currency && currency != 'Show all currency') {
        searchOptions.transfer_unit = currency;
        $scope.load(searchOptions);
      } else if (searchOptions.transfer_unit && currency == 'Show all currency') {
        delete searchOptions.transfer_unit;
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('type_filter', function (type) {
      $scope.type = type;
      if (type && type != 'Show all types') {
        searchOptions.transfer_type = type;
        $scope.load(searchOptions);
      } else if (searchOptions.transfer_type && type == 'Show all types') {
        delete searchOptions.transfer_type;
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('company_filter', function (company) {
      $scope.company = company;
      if (company && company != 'Show all companies') {
        searchOptions.company = company;
        $scope.load(searchOptions);
      } else if (searchOptions.company && company == 'Show all companies') {
        delete searchOptions.company;
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('sunburst', function (sunburst) {
      if ($scope.api != undefined) {
        $scope.api.refresh();
      } else {
      }
    });
  }
]);'use strict';
angular.module('app').controller('nrgiSunburstCtrl', [
  '$scope',
  'nrgiPaymentsSrvc',
  'usSpinnerService',
  function ($scope, nrgiPaymentsSrvc, usSpinnerService) {
    $scope.sunburst = [];
    $scope.csv_transfers = [];
    var header_transfer = [];
    var total = '';
    var fields = [];
    var country_name = '';
    var company_name = '';
    $scope.year_selector = [];
    $scope.currency_selector = [];
    $scope.type_selector = [];
    $scope.company_selector = [];
    $scope.currency_filter = 'USD';
    $scope.year_filter = '2015';
    $scope.type_filter = 'Show all types';
    $scope.company_filter = 'Show all companies';
    var searchOptions = {
        transfer_unit: 'USD',
        transfer_year: '2015'
      };
    $scope.options = {
      chart: {
        type: 'sunburstChart',
        height: 450,
        color: d3.scale.category20c(),
        duration: 250,
        mode: 'size',
        noData: '',
        sunburst: {
          dispatch: {
            chartClick: function (e) {
              if (e.pos.target.previousSibling == null) {
                total = e.data[0].name.split('<br>');
                total = total[1];
                e.data[0].name = 'All payments<br>' + total;
              } else {
                total = e.data[0].name.split('<br>');
                total = total[1];
                e.data[0].name = 'All payments(click to zoom out)<br>' + total;
              }
            },
            elementMousemove: function (e) {
              angular.element('path').css('opacity', 0.3);
              angular.element('.hover').css('opacity', 1);
            },
            elementMouseout: function (e) {
              angular.element('path').css('opacity', 1);
            }
          }
        },
        tooltip: {
          valueFormatter: function (d, i) {
            return '';
          },
          keyFormatter: function (d, i) {
            if ($scope.currency_filter && $scope.currency_filter != 'Show all currency') {
              return d + ' ' + $scope.currency_filter;
            } else {
              return d;
            }
          }
        }
      }
    };
    var headers = [
        {
          name: 'Year',
          status: true,
          field: 'transfer_year'
        },
        {
          name: 'Paid by',
          status: true,
          field: 'company'
        },
        {
          name: 'Paid to',
          status: true,
          field: 'country'
        },
        {
          name: 'Project',
          status: true,
          field: 'proj_site'
        },
        {
          name: 'Project ID',
          status: true,
          field: 'proj_id'
        },
        {
          name: 'Level ',
          status: true,
          field: 'transfer_gov_entity'
        },
        {
          name: 'Payment Type',
          status: true,
          field: 'transfer_type'
        },
        {
          name: 'Currency',
          status: true,
          field: 'transfer_unit'
        },
        {
          name: 'Value ',
          status: true,
          field: 'transfer_value'
        }
      ];
    angular.forEach(headers, function (header) {
      if (header.status != false && header.status != undefined) {
        header_transfer.push(header.name);
        fields.push(header.field);
      }
    });
    $scope.getHeaderTransfers = function () {
      return header_transfer;
    };
    $scope.load = function (searchOptions) {
      usSpinnerService.spin('spinner-sunburst');
      $scope.options.chart.noData = '';
      $scope.sunburst = [];
      nrgiPaymentsSrvc.query(searchOptions, function (response) {
        $scope.total = 0;
        if (response.sunburstNew && response.sunburstNew[0] && response.sunburstNew[0].children) {
          $scope.sunburst = response.sunburstNew;
          $scope.total = response.sunburstNew[0].total_value;
          $scope.all_currency_value = response.total;
          $scope.options.chart.noData = 'No Data Available.';
          usSpinnerService.stop('spinner-sunburst');
          $scope.csv_transfers = [];
          angular.forEach(response.transfers, function (transfer, key) {
            $scope.csv_transfers[key] = [];
            angular.forEach(fields, function (field) {
              if (field == 'country') {
                country_name = '';
                if (transfer[field] != undefined) {
                  country_name = transfer[field].name.toString();
                  country_name = country_name.charAt(0).toUpperCase() + country_name.substr(1);
                }
                $scope.csv_transfers[key].push(country_name);
              }
              if (field == 'company') {
                company_name = '';
                if (transfer[field] != undefined) {
                  company_name = transfer[field].company_name.toString();
                  company_name = company_name.charAt(0).toUpperCase() + company_name.substr(1);
                }
                $scope.csv_transfers[key].push(company_name);
              }
              if (field == 'proj_site') {
                name = '';
                if (transfer[field] != undefined && transfer[field].name != undefined) {
                  var name = transfer[field].name.toString();
                }
                $scope.csv_transfers[key].push(name);
              }
              if (field == 'transfer_gov_entity') {
                if (transfer[field]) {
                  name = transfer[field];
                }
                if (!transfer[field]) {
                  if (transfer.proj_site != undefined) {
                    name = transfer.proj_site.type;
                  } else {
                    name = '';
                  }
                }
                $scope.csv_transfers[key].push(name);
              }
              if (field == 'proj_id') {
                id = '';
                if (transfer.proj_site != undefined && transfer.proj_site._id != undefined && transfer.proj_site.type == 'project') {
                  var id = transfer.proj_site._id.toString();
                }
                $scope.csv_transfers[key].push(id);
              }
              if (field != 'company' && field != 'transfer_gov_entity' && field != 'country' && field != 'proj_site' && field != 'proj_id') {
                $scope.csv_transfers[key].push(transfer[field]);
              }
            });
          });
        } else {
          $scope.options.chart.noData = 'No Data Available.';
          usSpinnerService.stop('spinner-sunburst');
        }
        if (response && response.filters) {
          $scope.year_selector = response.filters.year_selector;
          $scope.currency_selector = response.filters.currency_selector;
          $scope.type_selector = response.filters.type_selector;
          $scope.company_selector = response.filters.company_selector;
        }
      }, function (error) {
      });
    };
    $scope.load(searchOptions);
    $scope.$watch('year_filter', function (year) {
      if (searchOptions.transfer_year != year && year && year != 'Show all years') {
        searchOptions.transfer_year = year;
        $scope.load(searchOptions);
      } else if (searchOptions.transfer_year && year == 'Show all years') {
        delete searchOptions.transfer_year;
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('currency_filter', function (currency) {
      if (searchOptions.transfer_unit != currency && currency && currency != 'Show all currency') {
        searchOptions.transfer_unit = currency;
        $scope.load(searchOptions);
      } else if (searchOptions.transfer_unit && currency == 'Show all currency') {
        delete searchOptions.transfer_unit;
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('type_filter', function (type) {
      $scope.type = type;
      if (type && type != 'Show all types') {
        searchOptions.transfer_type = type;
        $scope.load(searchOptions);
      } else if (searchOptions.transfer_type && type == 'Show all types') {
        delete searchOptions.transfer_type;
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('company_filter', function (company) {
      $scope.company = company;
      if (company && company != 'Show all companies') {
        searchOptions.company = company;
        $scope.load(searchOptions);
      } else if (searchOptions.company && company == 'Show all companies') {
        delete searchOptions.company;
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('sunburst', function (sunburst) {
      if ($scope.api != undefined) {
        $scope.api.refresh();
      } else {
      }
    });
  }
]);'use strict';
angular.module('app').controller('nrgiTransferByRecipientTableCtrl', [
  '$scope',
  'nrgiTransferTablesSrvc',
  'usSpinnerService',
  'nrgiCSV',
  function ($scope, nrgiTransferTablesSrvc, usSpinnerService, nrgiCSV) {
    $scope.transfers = [];
    $scope.loading = false;
    $scope.openClose = true;
    var headerTransfer = [];
    $scope.expression = '';
    var fields = [];
    var limit = 50, currentPage = 0;
    var headers = [
        {
          name: 'Year',
          status: true,
          field: 'transfer_year'
        },
        {
          name: 'Paid by',
          status: true,
          field: 'company'
        },
        {
          name: 'Paid to',
          status: true,
          field: 'country'
        },
        {
          name: 'Gov entity',
          status: true,
          field: 'transfer_gov_entity'
        },
        {
          name: 'Level ',
          status: true,
          field: 'transfer_level'
        },
        {
          name: 'Payment Type',
          status: true,
          field: 'transfer_type'
        },
        {
          name: 'Currency',
          status: true,
          field: 'transfer_unit'
        },
        {
          name: 'Value ',
          status: true,
          field: 'transfer_value'
        }
      ];
    angular.forEach(headers, function (header) {
      if (header.status != false && header.status != undefined) {
        headerTransfer.push(header.name);
        fields.push(header.field);
      }
    });
    $scope.getHeaderTransfersByRecipient = function () {
      return headerTransfer;
    };
    usSpinnerService.spin('spinner-transfers');
    $scope.$watch('id', function (value) {
      if ($scope.type == 'countries' && value == undefined) {
        usSpinnerService.stop('spinner-transfers');
        $scope.expression = 'showLast';
      }
      if ($scope.type == 'countries' && value != undefined) {
        $scope.transfers = value;
        usSpinnerService.stop('spinner-transfers');
        if ($scope.transfers.length == 0) {
          $scope.expression = 'showLast';
        } else {
          $scope.busy = false;
          currentPage = 1;
        }
      }
      if ($scope.type != 'countries' && value != undefined) {
        $scope.loading = false;
        $scope.getTransfersByRecipient($scope.id, $scope.type);
      }
    });
    $scope.loadMoreTransfersByRecipient = function () {
      if ($scope.busy)
        return;
      $scope.busy = true;
      nrgiTransferTablesSrvc.query({
        _id: $scope.countryid,
        type: $scope.type,
        skip: currentPage * limit,
        limit: limit
      }, function (response) {
        $scope.transfers = _.union($scope.transfers, response.transfers);
        if (response.transfers.length > 49) {
          currentPage = currentPage + 1;
          $scope.busy = false;
        } else {
          $scope.busy = true;
        }
      });
    };
    $scope.loadPaymentsByRecipientCSV = function () {
      nrgiCSV.setCsv(fields, $scope.transfers);
      return nrgiCSV.getResult();
    };
    $scope.getAllPaymentsByRecipient = function () {
      if ($scope.busy == true && $scope.transfers.length > 49 || $scope.transfers.length < 49) {
        setTimeout(function () {
          angular.element(document.getElementById('loadPaymentByRecipientCSV')).trigger('click');
        }, 0);
      } else {
        nrgiTransferTablesSrvc.query({
          _id: $scope.countryid,
          type: $scope.type,
          skip: 0,
          limit: 5000000
        }, function (data) {
          $scope.transfers = data.transfers;
          $scope.busy = true;
          setTimeout(function () {
            angular.element(document.getElementById('loadPaymentByRecipientCSV')).trigger('click');
          }, 0);
        });
      }
    };
    $scope.getTransfersByRecipient = function (id, type) {
      if ($scope.id != undefined) {
        if ($scope.openClose == true) {
          if ($scope.transfers.length == 0 || $scope.loading == false) {
            $scope.loading = true;
            nrgiTransferTablesSrvc.get({
              _id: id,
              type: type,
              skip: currentPage * limit,
              limit: limit
            }, function (success) {
              $scope.expression = '';
              if (success.transfers.length == 0 && $scope.transfers.length == 0) {
                $scope.expression = 'showLast';
              }
              $scope.transfers = success.transfers;
              usSpinnerService.stop('spinner-transfers');
            }, function (error) {
              console.log(error);
              usSpinnerService.stop('spinner-transfers');
            });
          }
        }
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiTransferTableCtrl', [
  '$scope',
  'nrgiTransferTablesSrvc',
  'usSpinnerService',
  'nrgiCSV',
  function ($scope, nrgiTransferTablesSrvc, usSpinnerService, nrgiCSV) {
    $scope.transfers = [];
    $scope.loading = false;
    $scope.openClose = true;
    var headerTransfer = [];
    $scope.expression = '';
    var fields = [];
    var limit = 50, currentPage = 0;
    var headers = [
        {
          name: 'Year',
          status: true,
          field: 'transfer_year'
        },
        {
          name: 'Paid by',
          status: true,
          field: 'company'
        },
        {
          name: 'Paid to',
          status: true,
          field: 'country'
        },
        {
          name: 'Project',
          status: true,
          field: 'proj_site'
        },
        {
          name: 'Project ID',
          status: true,
          field: 'proj_site_id'
        },
        {
          name: 'Level ',
          status: true,
          field: 'proj_site_type'
        },
        {
          name: 'Payment Type',
          status: true,
          field: 'transfer_type'
        },
        {
          name: 'Currency',
          status: true,
          field: 'transfer_unit'
        },
        {
          name: 'Value ',
          status: true,
          field: 'transfer_value'
        }
      ];
    angular.forEach(headers, function (header) {
      if (header.status != false && header.status != undefined) {
        headerTransfer.push(header.name);
        fields.push(header.field);
      }
    });
    $scope.getHeaderTransfers = function () {
      return headerTransfer;
    };
    usSpinnerService.spin('spinner-transfers');
    $scope.$watch('id', function (value) {
      if ($scope.type == 'country' && value == undefined || $scope.type == 'company' && value == undefined || $scope.type == 'project' && value == undefined || $scope.type == 'site' && value == undefined || $scope.type == 'concession' && value == undefined) {
        usSpinnerService.stop('spinner-transfers');
        $scope.expression = 'showLast';
      }
      if ($scope.type == 'country' && value != undefined || $scope.type == 'company' && value != undefined || $scope.type == 'site' && value != undefined || $scope.type == 'project' && value != undefined || $scope.type == 'concession' && value != undefined) {
        $scope.transfers = value;
        usSpinnerService.stop('spinner-transfers');
        if ($scope.transfers.length == 0) {
          $scope.expression = 'showLast';
        } else {
          $scope.busy = false;
          currentPage = 1;
        }
      }
      if ($scope.type != 'country' && value != undefined && $scope.type != 'company' && $scope.type != 'site' && $scope.type != 'concession' && $scope.type != 'project') {
        $scope.loading = false;
        $scope.getTransfers($scope.id, $scope.type);
      }
    });
    $scope.loadMoreTransfers = function () {
      if ($scope.busy)
        return;
      $scope.busy = true;
      nrgiTransferTablesSrvc.query({
        _id: $scope.countryid,
        type: $scope.type,
        skip: currentPage * limit,
        limit: limit
      }, function (response) {
        $scope.transfers = _.union($scope.transfers, response.transfers);
        if (response.transfers.length > 49) {
          currentPage = currentPage + 1;
          $scope.busy = false;
        } else {
          $scope.busy = true;
        }
      });
    };
    $scope.loadPaymentsCSV = function () {
      nrgiCSV.setCsv(fields, $scope.transfers);
      return nrgiCSV.getResult();
    };
    $scope.getAllPayments = function () {
      if ($scope.busy == true && $scope.transfers.length > 49 || $scope.transfers.length < 49) {
        setTimeout(function () {
          angular.element(document.getElementById('loadPaymentCSV')).trigger('click');
        }, 0);
      } else {
        nrgiTransferTablesSrvc.query({
          _id: $scope.countryid,
          type: $scope.type,
          skip: 0,
          limit: 5000000
        }, function (data) {
          $scope.transfers = data.transfers;
          $scope.busy = true;
          setTimeout(function () {
            angular.element(document.getElementById('loadPaymentCSV')).trigger('click');
          }, 0);
        });
      }
    };
    $scope.getTransfers = function (id, type) {
      if ($scope.id != undefined) {
        if ($scope.openClose == true) {
          if ($scope.transfers.length == 0 || $scope.loading == false) {
            $scope.loading = true;
            nrgiTransferTablesSrvc.get({
              _id: id,
              type: type,
              skip: currentPage * limit,
              limit: limit
            }, function (success) {
              $scope.expression = '';
              if (success.transfers.length == 0 && $scope.transfers.length == 0) {
                $scope.expression = 'showLast';
              }
              $scope.transfers = success.transfers;
              usSpinnerService.stop('spinner-transfers');
            }, function (error) {
              console.log(error);
              usSpinnerService.stop('spinner-transfers');
            });
          }
        }
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiTreeMapCtrl', [
  '$scope',
  '$rootScope',
  'nrgiTreeMapSrvc',
  '$http',
  'usSpinnerService',
  function ($scope, $rootScope, nrgiTreeMapSrvc, $http, usSpinnerService) {
    $scope.sunburst = [];
    $scope.currency_filter = 'USD';
    $scope.year_filter = '2015';
    var searchOptions = {
        transfer_year: '2015',
        transfer_unit: 'USD'
      };
    $scope.show_total = true;
    $scope.load = function (searchOptions) {
      usSpinnerService.spin('spinner-treemap');
      $('.tree-map-data').empty();
      nrgiTreeMapSrvc.query(searchOptions, function (success) {
        if (success.sunburstNew && success.sunburstNew[0].children && success.sunburstNew[0].children.length > 0) {
          $scope.year_selector = success.filters.year_selector;
          $scope.currency_selector = success.filters.currency_selector;
          $scope.show_total = true;
          $scope.treemapData = success.sunburstNew[0];
          $scope.total = success.sunburstNew[0].total_value;
          $scope.all_currency_value = success.total;
          usSpinnerService.stop('spinner-treemap');
          drawmap($scope.treemapData);
        } else {
          $scope.treemapData = [];
          $scope.show_total = false;
          usSpinnerService.stop('spinner-treemap');
        }
      });
    };
    $scope.load(searchOptions);
    if (parent.document.getElementsByTagName('iframe')[0]) {
      parent.document.getElementsByTagName('iframe')[0].setAttribute('style', 'height: 700px !important');
    }
    var margin = {
        top: 20,
        right: 0,
        bottom: 0,
        left: 0
      }, width = $('.container').innerWidth(), height = 600 - margin.top - margin.bottom, formatNumber = d3.format(',d'), transitioning;
    /* create x and y scales */
    var x = d3.scale.linear().domain([
        0,
        width
      ]).range([
        0,
        width
      ]);
    var y = d3.scale.linear().domain([
        0,
        height
      ]).range([
        0,
        height
      ]);
    var color = d3.scale.category20c();
    $scope.$watch('year_filter', function (year) {
      if (year && year != 'Show all years' && searchOptions.transfer_year != year) {
        searchOptions.transfer_year = year;
        $scope.load(searchOptions);
      } else if (searchOptions.transfer_year && year == 'Show all years') {
        delete searchOptions.transfer_year;
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('currency_filter', function (currency) {
      if (currency && currency != 'Show all currency' && searchOptions.transfer_unit != currency) {
        searchOptions.transfer_unit = currency;
        $scope.load(searchOptions);
      } else if (searchOptions.transfer_unit && currency == 'Show all currency') {
        delete searchOptions.transfer_unit;
        $scope.load(searchOptions);
      }
    });
    var drawmap = function (treemap) {
      $scope.treemap = d3.layout.treemap().children(function (d) {
        return d.children;
      }).sort(function (a, b) {
        return a.size - b.size;
      }).ratio(height / width * 0.5 * (1 + Math.sqrt(5))).round(false);
      $scope.svg = d3.select('.tree-map-data').append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.bottom + margin.top).style('margin-left', -margin.left + 'px').style('margin.right', -margin.right + 'px').append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').style('shape-rendering', 'crispEdges');
      $scope.grandparent = $scope.svg.append('g').attr('class', 'grandparent');
      $scope.grandparent.append('rect').attr('y', -margin.top).attr('width', width).attr('height', margin.top);
      $scope.grandparent.append('text').attr('x', 6).attr('y', 6 - margin.top).attr('dy', '.75em');
      $scope.grandparent.append('text').attr('font-size', function (d) {
        return 'x-large';
      }).attr('class', 'back_button').attr('x', width - 30).attr('y', -1).text(function (d) {
        return '\u2b05';
      });
      initialize(treemap);
      accumulate(treemap);
      layout(treemap);
      display(treemap);
    };
    function initialize(root) {
      root.x = root.y = 0;
      root.dx = width;
      root.dy = height;
    }
    function accumulate(d) {
      return d.children ? d.size = d.children.reduce(function (p, v) {
        return p + accumulate(v);
      }, 0) : d.size;
    }
    function layout(d) {
      if (d.children) {
        var uniques = _.map(_.groupBy(d.children, function (doc) {
            if (doc.name != '') {
              return doc.name;
            }
          }), function (grouped) {
            var sum = _.reduce(grouped, function (memo, num) {
                return memo + num.value;
              }, 0);
            grouped[0].value = sum;
            return grouped[0];
          });
        if (uniques.length > 0) {
          $scope.treemap.nodes({ children: uniques });
          uniques.forEach(function (c) {
            c.x = d.x + c.x * d.dx;
            c.y = d.y + c.y * d.dy;
            c.dx *= d.dx;
            c.dy *= d.dy;
            c.parent = d;
            layout(c);
          });
        }
      }
    }
    function display(d) {
      $scope.grandparent.datum(d.parent).on('click', transition).select('text').html(name(d));
      var g1 = $scope.svg.insert('g', '.grandparent').datum(d);
      var g = g1.selectAll('g').data(d.children).enter().append('g').on('mousemove', mousemove).on('mouseout', mouseout);
      g.filter(function (d) {
        return d.children;
      }).classed('children', true).on('click', transition);
      g.filter(function (d) {
        return d;
      }).classed('children', true);
      /* write children rectangles */
      g.selectAll('.child').data(function (d) {
        return d.children || [d];
      }).enter().append('rect').attr('class', 'child').call(rect);
      g.append('rect').attr('class', 'parent').call(rect);
      g.append('foreignObject').call(rect).attr('class', 'foreignobj').append('xhtml:div').attr('dy', '.75em').html(function (d) {
        return '<i style="font-size: 10px;">Payment:</i> </br>' + d.name + '</br> <b>' + (d.value / 1000000).toFixed(1) + ' Million</b>';
      }).attr('class', 'textdiv');
      function transition(d) {
        if (transitioning || !d)
          return;
        transitioning = true;
        if (d.name == 'Payments') {
          d3.select('.back_button').style('visibility', 'hidden');
        } else {
          d3.select('.back_button').style('visibility', 'visible');
        }
        var g2 = display(d), t1 = g1.transition().duration(750), t2 = g2.transition().duration(750);
        x.domain([
          d.x,
          d.x + d.dx
        ]);
        y.domain([
          d.y,
          d.y + d.dy
        ]);
        $scope.svg.style('shape-rendering', null);
        g2.selectAll('text').style('fill-opacity', 0);
        g2.selectAll('foreignObject div').style('display', 'none');
        t1.selectAll('text').call(text).style('fill-opacity', 0);
        t2.selectAll('text').call(text).style('fill-opacity', 1);
        t1.selectAll('rect').call(rect);
        t2.selectAll('rect').call(rect);
        t1.selectAll('.textdiv').style('display', 'none');
        /* added */
        t1.selectAll('.foreignobj').call(foreign);
        /* added */
        t2.selectAll('.textdiv').style('display', 'block');
        /* added */
        t2.selectAll('.foreignobj').call(foreign);
        /* added */
        // Remove the old node when the transition is finished.
        t1.remove().each('end', function () {
          $scope.svg.style('shape-rendering', 'crispEdges');
          transitioning = false;
        });
      }
      //endfunc transition
      return g;
    }
    function text(text) {
      text.attr('x', function (d) {
        return x(d.x) + 6;
      }).attr('y', function (d) {
        return y(d.y) + 6;
      });
    }
    function rect(rect) {
      rect.attr('x', function (d) {
        return x(d.x);
      }).attr('y', function (d) {
        return y(d.y);
      }).attr('width', function (d) {
        return x(d.x + d.dx) - x(d.x);
      }).attr('height', function (d) {
        return y(d.y + d.dy) - y(d.y);
      }).style('fill', function (d) {
        return d.parent ? color(d.name) : null;
      });
    }
    function foreign(foreign) {
      /* added */
      foreign.attr('x', function (d) {
        return x(d.x);
      }).attr('y', function (d) {
        return y(d.y);
      }).attr('width', function (d) {
        return x(d.x + d.dx) - x(d.x);
      }).attr('height', function (d) {
        return y(d.y + d.dy) - y(d.y);
      });
    }
    function name(d) {
      if (d.parent) {
      }
      return d.parent ? name(d.parent) + ' > ' + d.name : d.name;
    }
    var mousemove = function (d) {
      var xPosition = d3.event.pageX + 5;
      var yPosition = d3.event.pageY + 5;
      d3.selectAll('.children').style('opacity', 0.5);
      if (d3.event.target && d3.event.target.parentNode && d3.event.target.parentNode.nodeName == 'g') {
        d3.select(d3.event.target.parentNode).style('opacity', 1);
      }
      if (d3.event.target && d3.event.target.parentNode && d3.event.target.parentNode.parentNode && d3.event.target.parentNode.parentNode.nodeName == 'g') {
        d3.select(d3.event.target.parentNode.parentNode).style('opacity', 1);
      }
      if (d3.event.target && d3.event.target.parentNode && d3.event.target.parentNode.parentNode && d3.event.target.parentNode.parentNode.parentNode && d3.event.target.parentNode.parentNode.parentNode.nodeName == 'g') {
        d3.select(d3.event.target.parentNode.parentNode.parentNode).style('opacity', 1);
      }
      d3.select('#tooltip').style('left', xPosition + 'px').style('top', yPosition + 'px');
      d3.select('#tooltip').html('<span class="text-center"><i style="font-size: 12px;">Payment:</i> </br>' + d.name + '</br> <b>' + (d.value / 1000000).toFixed(1) + ' Million</b></p>');
      d3.select('#tooltip').style('visibility', 'visible');
    };
    var mouseout = function () {
      d3.selectAll('.children').style('opacity', 1);
      d3.select('#tooltip').style('visibility', 'hidden');
    };
  }
]);'use strict';
angular.module('app').directive('nrgiCompanyOperationTable', function () {
  return {
    restrict: 'EA',
    controller: 'nrgiCompanyOperationTableCtrl',
    scope: {
      group: '=',
      countryid: '=',
      type: '=',
      stake: '=',
      project: '=',
      site: '=',
      contract: '=',
      concession: '=',
      incorporated: '=',
      operation: '=',
      id: '='
    },
    templateUrl: '/partials/directives/templates/nrgi-company-of-operation-table'
  };
});'use strict';
angular.module('app').directive('nrgiCompanyTable', function () {
  return {
    restrict: 'EA',
    controller: 'nrgiCompanyTableCtrl',
    scope: {
      group: '=',
      type: '=',
      stake: '=',
      project: '=',
      countryid: '=',
      site: '=',
      contract: '=',
      concession: '=',
      incorporated: '=',
      operation: '=',
      id: '='
    },
    templateUrl: '/partials/directives/templates/nrgi-company-table'
  };
});'use strict';
angular.module('app').directive('nrgiConcessionTable', function () {
  return {
    restrict: 'EA',
    controller: 'nrgiConcessionTableCtrl',
    scope: {
      commodity: '=',
      country: '=',
      countryid: '=',
      type: '=',
      status: '=',
      projects: '=',
      name: '=',
      id: '='
    },
    templateUrl: '/partials/directives/templates/nrgi-concession-table'
  };
});'use strict';
angular.module('app').directive('nrgiContractTable', function () {
  return {
    restrict: 'EA',
    controller: 'nrgiContractTableCtrl',
    scope: {
      type: '=',
      id: '=',
      companies: '=',
      commodity: '=',
      country: '='
    },
    templateUrl: '/partials/directives/templates/nrgi-contract-table'
  };
});'use strict';
angular.module('app').directive('iframeOnload', [function () {
    return {
      scope: { callBack: '&iframeOnload' },
      link: function (scope, element, attrs) {
        element.on('load', function () {
          return scope.callBack();
        });
      }
    };
  }]);//For now not used
//'use strict';
//
//angular
//    .module('app')
//    .directive('nrgiLastAdded', function() {
//        return {
//            restrict: 'EA',
//            controller: 'nrgiLastAddedCtrl',
//            templateUrl: '/partials/directives/templates/nrgi-last-added'
//        };
//    });
'use strict';
angular.module('app').directive('nrgiLeaflet', function () {
  return {
    restrict: 'EA',
    controller: 'nrgiLeafletCtrl',
    scope: {
      project: '=',
      map: '=',
      site: '=',
      data: '=',
      id: '=',
      type: '='
    },
    templateUrl: '/partials/directives/templates/nrgi-leaflet'
  };
});'use strict';
angular.module('app').directive('nrgiListNav', function () {
  return {
    restrict: 'E',
    scope: {
      page: '=',
      type: '=',
      show: '=',
      count: '=',
      limit: '=',
      last: '=',
      first: '=',
      prev: '=',
      next: '=',
      select: '='
    },
    templateUrl: '/partials/directives/templates/nrgi-list-nav',
    link: function (scope) {
      scope.lastPage = function () {
        scope.last(scope.page);
      };
      scope.firstPage = function () {
        scope.first(scope.page);
      };
      scope.prevPage = function () {
        scope.prev(scope.page);
      };
      scope.nextPage = function () {
        scope.next(scope.page, scope.show);
      };
      scope.selectLimit = function () {
        scope.select(scope.limit);
      };
    }
  };
});'use strict';
angular.module('app').directive('nrgiMap', function () {
  return {
    restrict: 'EA',
    controller: 'nrgiMapCtrl',
    scope: {
      height: '=',
      type: '='
    },
    templateUrl: '/partials/directives/templates/nrgi-map'
  };
});'use strict';
angular.module('app').directive('nrgiProductionTable', function () {
  return {
    restrict: 'EA',
    controller: 'nrgiProductionTableCtrl',
    scope: {
      projectlink: '=',
      id: '=',
      countryid: '=',
      type: '='
    },
    templateUrl: '/partials/directives/templates/nrgi-production-table'
  };
});'use strict';
angular.module('app').directive('nrgiProjectTable', function () {
  return {
    restrict: 'EA',
    controller: 'nrgiProjectTableCtrl',
    scope: {
      country: '=',
      type: '=',
      commoditytype: '=',
      countryid: '=',
      companies: '=',
      commodity: '=',
      status: '=',
      id: '='
    },
    templateUrl: '/partials/directives/templates/nrgi-project-table'
  };
});'use strict';
angular.module('app').directive('whenScrolled', function () {
  return {
    restrict: 'EA',
    link: function (scope, elem, attrs) {
      var raw = elem[0];
      elem.bind('scroll', function () {
        if (raw.scrollTop + raw.offsetHeight + 5 >= raw.scrollHeight) {
          scope.loading = true;
          scope.$apply(attrs.whenScrolled);
        }
      });
    }
  };
});'use strict';
angular.module('app').directive('nrgiSiteTable', function () {
  return {
    restrict: 'EA',
    controller: 'nrgiSiteTableCtrl',
    scope: {
      name: '=',
      id: '=',
      commodity: '=',
      status: '=',
      countryid: '=',
      country: '=',
      type: '=',
      commoditytype: '=',
      company: '='
    },
    templateUrl: '/partials/directives/templates/nrgi-site-table'
  };
});'use strict';
angular.module('app').directive('nrgiSourcesTable', function () {
  return {
    restrict: 'EA',
    controller: 'nrgiSourcesTableCtrl',
    scope: {
      id: '=',
      type: '='
    },
    templateUrl: '/partials/directives/templates/nrgi-sources-table'
  };
});//For now not used
//'use strict';
//
//angular
//    .module('app')
//    .directive('nrgiSummaryStats', function() {
//        return {
//            restrict: 'EA',
//            controller: 'nrgiSummaryStatsCtrl',
//            templateUrl: '/partials/directives/templates/nrgi-summary-stats'
//        };
//    });
'use strict';
angular.module('app').directive('nrgiSunburstByGov', function () {
  return {
    restrict: 'EA',
    controller: 'nrgiSunburstByGovCtrl',
    templateUrl: '/partials/directives/templates/nrgi-sunburst-by-gov'
  };
});'use strict';
angular.module('app').directive('nrgiSunburst', function () {
  return {
    restrict: 'EA',
    controller: 'nrgiSunburstCtrl',
    templateUrl: '/partials/directives/templates/nrgi-sunburst'
  };
});'use strict';
angular.module('app').directive('nrgiTransferByRecipientTable', function () {
  return {
    restrict: 'EA',
    controller: 'nrgiTransferByRecipientTableCtrl',
    scope: {
      id: '=',
      type: '=',
      countryid: '='
    },
    templateUrl: '/partials/directives/templates/nrgi-transfer-by-recipient-table'
  };
});'use strict';
angular.module('app').directive('nrgiTransferTable', function () {
  return {
    restrict: 'EA',
    controller: 'nrgiTransferTableCtrl',
    scope: {
      id: '=',
      type: '=',
      project: '=',
      countryid: '=',
      projectlink: '='
    },
    templateUrl: '/partials/directives/templates/nrgi-transfer-table'
  };
});'use strict';
angular.module('app').directive('nrgiTreeMap', function () {
  return {
    restrict: 'EA',
    controller: 'nrgiTreeMapCtrl',
    scope: { data: '=' },
    templateUrl: '/partials/directives/templates/nrgi-tree-map'
  };
});'use strict';
angular.module('app').directive('navigate', function () {
  return {
    restrict: 'E',
    scope: {
      page: '=',
      show: '=',
      count: '=',
      limit: '=',
      last: '=',
      first: '=',
      prev: '=',
      next: '=',
      select: '='
    },
    template: '<div class="dropdown"><div class="col-md-12"><div class="pager"><ul class="inline">' + '<li><button class="btn btn-link navigate" ng-disabled="page==0" ng-click="firstPage()"> << </button></li>' + '<li><button class="btn btn-link navigate" ng-disabled="page==0" ng-click="prevPage(page)"> < </button></li>' + '<li>Showing {{page}} to {{show}} of {{count}} projects. Number of records per page:' + '<form class="inline">' + '<select name="limit" ng-model="limit" ng-change="selectLimit(limit)">' + '<option selected="">50</option>' + '<option>200</option>' + '<option>1000</option>' + '</select>' + '</form>' + '</li>' + '<li><button class="btn btn-link navigate" ng-disabled="show>=count" ng-click="nextPage(page,show)"> > </button></li>' + '<li><button class="btn btn-link navigate" ng-disabled="show>=count" ng-click="lastPage()"> >> </button></li>' + '</ul></div></div></div>',
    link: function (scope) {
      scope.lastPage = function () {
        scope.last(scope.page);
      };
      scope.firstPage = function () {
        scope.first(scope.page);
      };
      scope.prevPage = function () {
        scope.prev(scope.page);
      };
      scope.nextPage = function () {
        scope.next(scope.page, scope.show);
      };
      scope.selectLimit = function () {
        scope.select(scope.limit);
      };
    }
  };
});'use strict';
angular.module('app').controller('nrgiCommodityDetailCtrl', [
  '$scope',
  '$rootScope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiCommoditiesSrvc',
  '$routeParams',
  function ($scope, $rootScope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiCommoditiesSrvc, $routeParams) {
    nrgiCommoditiesSrvc.get({ _id: $routeParams.id }, function (response) {
      $scope.commodity = response.commodity;
      $scope.id = response.commodity._id;
    });
  }
]);'use strict';
angular.module('app').controller('nrgiCommodityListCtrl', [
  '$scope',
  '$rootScope',
  'nrgiNotifier',
  'nrgiCommoditiesSrvc',
  function ($scope, $rootScope, nrgiNotifier, nrgiCommoditiesSrvc) {
    var fields = [
        'commodity_name',
        'projects'
      ];
    var header_commodities = [
        'Name',
        'No. Projects'
      ];
    var limit = 50, currentPage = 0, totalPages = 0;
    $scope.count = 0;
    $scope.busy = false;
    $scope.csv_commodities = [];
    nrgiCommoditiesSrvc.query({
      skip: currentPage * limit,
      limit: limit
    }, function (response) {
      $scope.count = response.count;
      $scope.commodities = response.commodities;
      totalPages = Math.ceil(response.count / limit);
      currentPage = currentPage + 1;
    });
    $scope.getAllCommodities = function () {
      if ($scope.count < 50 || $scope.commodities.length === $scope.count) {
        $scope.createDownloadList($scope.commodities);
        setTimeout(function () {
          angular.element(document.getElementById('loadCommoditiesCSV')).trigger('click');
        }, 0);
      } else {
        nrgiCommoditiesSrvc.query({
          skip: 0,
          limit: $scope.count
        }, function (response) {
          $scope.commodities = response.commodities;
          $scope.createDownloadList($scope.commodities);
          setTimeout(function () {
            angular.element(document.getElementById('loadCommoditiesCSV')).trigger('click');
          }, 0);
        });
      }
    };
    $scope.createDownloadList = function (commodities) {
      angular.forEach(commodities, function (commodity, key) {
        $scope.csv_commodities[key] = [];
        angular.forEach(fields, function (field) {
          $scope.csv_commodities[key].push(commodity[field]);
        });
      });
    };
    $scope.getHeaderCommodities = function () {
      return header_commodities;
    };
    $scope.loadMore = function () {
      if ($scope.busy || $scope.commodities.length === $scope.count)
        return;
      $scope.busy = true;
      if (currentPage < totalPages) {
        nrgiCommoditiesSrvc.query({
          skip: currentPage * limit,
          limit: limit
        }, function (response) {
          $scope.commodities = _.union($scope.commodities, response.commodities);
          currentPage = currentPage + 1;
          $scope.busy = false;
        });
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiCompanyDetailCtrl', [
  '$scope',
  '$routeParams',
  'nrgiCompaniesSrvc',
  'nrgiCompanyDataSrvc',
  function ($scope, $routeParams, nrgiCompaniesSrvc, nrgiCompanyDataSrvc) {
    $scope.company = [];
    nrgiCompaniesSrvc.get({ _id: $routeParams.id }, function (success) {
      if (success.company) {
        $scope.company = success.company;
        $scope.id = success.company._id;
      } else {
        console.log(success.errorList);
      }
    });
    nrgiCompanyDataSrvc.get({ _id: $routeParams.id }, function (response) {
      $scope.data = response;
      $scope.company.company_groups = [];
      $scope.company.company_commodity = [];
      angular.forEach(response.company_groups, function (company_groups) {
        $scope.company.company_groups.push(company_groups);
      });
      angular.forEach(response.company_commodity, function (company_commodity) {
        $scope.company.company_commodity.push(company_commodity);
      });
    });
  }
]);'use strict';
angular.module('app').controller('nrgiCompanyListCtrl', [
  '$scope',
  '$rootScope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiCompaniesSrvc',
  function ($scope, $rootScope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiCompaniesSrvc) {
    var fields = [
        'company_name',
        'company_groups',
        'project_count',
        'site_count',
        'field_count',
        'transfer_count'
      ];
    var header_companies = [
        'Company',
        'Group(s)',
        'Projects',
        'Sites',
        'Fields',
        'Payments'
      ];
    var company_group_name, str;
    var com = ', ';
    var limit = 50, currentPage = 0, totalPages = 0;
    $scope.count = 0;
    $scope.busy = false;
    $scope.csv_companies = [];
    nrgiCompaniesSrvc.query({
      skip: currentPage * limit,
      limit: limit
    }, function (response) {
      $scope.count = response.company_count;
      $scope.companies = response.companies;
      totalPages = Math.ceil(response.company_count / limit);
      currentPage = currentPage + 1;
    });
    $scope.getAllCompanies = function () {
      if ($scope.count < 50 || $scope.companies.length === $scope.count) {
        $scope.createDownloadList($scope.companies);
        setTimeout(function () {
          angular.element(document.getElementById('loadCompaniesCSV')).trigger('click');
        }, 0);
      } else {
        nrgiCompaniesSrvc.query({
          skip: 0,
          limit: $scope.count
        }, function (response) {
          $scope.companies = response.companies;
          $scope.createDownloadList($scope.companies);
          setTimeout(function () {
            angular.element(document.getElementById('loadCompaniesCSV')).trigger('click');
          }, 0);
        });
      }
    };
    $scope.createDownloadList = function (companies) {
      angular.forEach(companies, function (company, key) {
        $scope.csv_companies[key] = [];
        angular.forEach(fields, function (field) {
          if (field == 'company_groups') {
            if (company[field] != undefined && company[field].length > 0) {
              str = '';
              angular.forEach(company[field], function (group, i) {
                company_group_name = '';
                if (group != undefined && group.company_group_name) {
                  company_group_name = group.company_group_name.toString();
                  company_group_name = company_group_name.charAt(0).toUpperCase() + company_group_name.substr(1);
                }
                if (i != company[field].length - 1 && company_group_name != '') {
                  str = str + company_group_name + com;
                } else {
                  str = str + company_group_name;
                  $scope.csv_companies[key].push(str);
                }
              });
            } else {
              $scope.csv_companies[key].push('');
            }
          }
          if (field != 'company_groups') {
            $scope.csv_companies[key].push(company[field]);
          }
        });
      });
    };
    $scope.getHeaderCompanies = function () {
      return header_companies;
    };
    $scope.loadMore = function () {
      if ($scope.busy || $scope.companies.length === $scope.count)
        return;
      $scope.busy = true;
      if (currentPage < totalPages) {
        nrgiCompaniesSrvc.query({
          skip: currentPage * limit,
          limit: limit
        }, function (response) {
          $scope.companies = _.union($scope.companies, response.companies);
          currentPage = currentPage + 1;
          $scope.busy = false;
        });
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiConcessionDetailCtrl', [
  '$scope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiConcessionsSrvc',
  'nrgiConcessionDataSrvc',
  '$routeParams',
  function ($scope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiConcessionsSrvc, nrgiConcessionDataSrvc, $routeParams) {
    nrgiConcessionsSrvc.get({ _id: $routeParams.id }, function (success) {
      $scope.concession = success.concession;
      $scope.id = $routeParams.id;
    });
    nrgiConcessionDataSrvc.get({ _id: $routeParams.id }, function (success) {
      $scope.data = success;
    });
  }
]);'use strict';
angular.module('app').controller('nrgiConcessionListCtrl', [
  '$scope',
  '$rootScope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiConcessionsSrvc',
  '$filter',
  function ($scope, $rootScope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiConcessionsSrvc, $filter) {
    var fields = [
        'concession_name',
        'concession_country',
        'commodity_type',
        'concession_commodity',
        'concession_status',
        'project_count',
        'site_count',
        'field_count',
        'transfer_count',
        'production_count'
      ];
    var header_concessions = [
        'Name',
        'Country',
        'Commodity Type',
        'Commodity',
        'Status',
        'Projects',
        'Sites',
        'Fields',
        'Payment records',
        'Production records'
      ];
    var country_name, status, timestamp, commodity_type, commodity_name, str;
    var com = ', ';
    var limit = 50, currentPage = 0, totalPages = 0;
    $scope.count = 0;
    $scope.busy = false;
    $scope.csv_concessions = [];
    nrgiConcessionsSrvc.query({
      skip: currentPage * limit,
      limit: limit
    }, function (response) {
      $scope.count = response.count;
      $scope.concessions = response.concessions;
      totalPages = Math.ceil(response.count / limit);
      currentPage = currentPage + 1;
    });
    $scope.getAllConcessions = function () {
      if ($scope.count < 50 || $scope.concessions.length === $scope.count) {
        $scope.createDownloadList($scope.concessions);
        setTimeout(function () {
          angular.element(document.getElementById('loadConcessionsCSV')).trigger('click');
        }, 0);
      } else {
        nrgiConcessionsSrvc.query({
          skip: 0,
          limit: $scope.count
        }, function (response) {
          $scope.concessions = response.concessions;
          $scope.createDownloadList($scope.concessions);
          setTimeout(function () {
            angular.element(document.getElementById('loadConcessionsCSV')).trigger('click');
          }, 0);
        });
      }
    };
    $scope.createDownloadList = function (concessions) {
      angular.forEach(concessions, function (concession, key) {
        $scope.csv_concessions[key] = [];
        angular.forEach(fields, function (field) {
          if (field == 'concession_country') {
            if (concession[field] != undefined && concession[field].length > 0) {
              str = '';
              angular.forEach(concession[field], function (country, i) {
                country_name = '';
                if (country != undefined && country.name) {
                  country_name = country.name.toString();
                  country_name = country_name.charAt(0).toUpperCase() + country_name.substr(1);
                }
                if (i != concession[field].length - 1 && country_name != '') {
                  str = str + country_name + com;
                } else {
                  str = str + country_name;
                  $scope.csv_concessions[key].push(str);
                }
              });
            } else {
              $scope.csv_concessions[key].push('');
            }
          }
          if (field == 'concession_commodity') {
            if (concession[field] != undefined && concession[field].length > 0) {
              str = '';
              concession[field] = _.map(_.groupBy(concession[field], function (doc) {
                if (doc && doc.commodity_name) {
                  return doc.commodity_name;
                }
              }), function (grouped) {
                return grouped[0];
              });
              angular.forEach(concession[field], function (commodity, i) {
                commodity_name = '';
                if (commodity != undefined && commodity.commodity_name) {
                  commodity_name = commodity.commodity_name.toString();
                  commodity_name = commodity_name.charAt(0).toUpperCase() + commodity_name.substr(1);
                }
                if (i != concession[field].length - 1 && commodity_name != '') {
                  str = str + commodity_name + com;
                } else {
                  str = str + commodity_name;
                  $scope.csv_concessions[key].push(str);
                }
              });
            } else {
              $scope.csv_concessions[key].push('');
            }
          }
          if (field == 'concession_status') {
            if (concession[field] != undefined && concession[field].length > 0) {
              str = '';
              angular.forEach(concession[field], function (concession_status, i) {
                status = '';
                if (concession_status != undefined) {
                  status = concession_status.string.toString();
                  status = status.charAt(0).toUpperCase() + status.substr(1);
                  timestamp = $filter('date')(concession_status.timestamp, 'MM/dd/yyyy @ h:mma');
                  str = status + '(true at ' + timestamp + ')';
                  $scope.csv_concessions[key].push(str);
                }
              });
            } else {
              $scope.csv_concessions[key].push('');
            }
          }
          if (field == 'commodity_type') {
            if (concession['concession_commodity'] != undefined && concession['concession_commodity'].length > 0) {
              str = '';
              concession['concession_commodity'] = _.map(_.groupBy(concession['concession_commodity'], function (doc) {
                if (doc && doc.commodity_type) {
                  return doc.commodity_type;
                }
              }), function (grouped) {
                return grouped[0];
              });
              angular.forEach(concession['concession_commodity'], function (commodity, i) {
                commodity_type = '';
                if (commodity != undefined && commodity.commodity_type) {
                  commodity_type = commodity.commodity_type.toString();
                  commodity_type = commodity_type.charAt(0).toUpperCase() + commodity_type.substr(1);
                }
                if (i != concession['concession_commodity'].length - 1 && commodity_type != '') {
                  str = str + commodity_type + com;
                } else {
                  str = str + commodity_type;
                  $scope.csv_concessions[key].push(str);
                }
              });
            } else {
              $scope.csv_concessions[key].push('');
            }
          }
          if (field != 'concession_country' && field != 'commodity_type' && field != 'concession_commodity' && field != 'concession_status') {
            $scope.csv_concessions[key].push(concession[field]);
          }
        });
      });
    };
    $scope.getHeaderConcessions = function () {
      return header_concessions;
    };
    $scope.loadMore = function () {
      if ($scope.busy || $scope.concessions.length === $scope.count)
        return;
      $scope.busy = true;
      if (currentPage < totalPages) {
        nrgiConcessionsSrvc.query({
          skip: currentPage * limit,
          limit: limit
        }, function (response) {
          $scope.concessions = _.union($scope.concessions, response.concessions);
          currentPage = currentPage + 1;
          $scope.busy = false;
        });
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiContractDetailCtrl', [
  '$scope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiContractsSrvc',
  '$routeParams',
  function ($scope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiContractsSrvc, $routeParams) {
    nrgiContractsSrvc.get({ _id: $routeParams.id }, function (success) {
      $scope.contract = success;
    });
  }
]);'use strict';
angular.module('app').controller('nrgiContractListCtrl', [
  '$scope',
  '$rootScope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  '$sce',
  'nrgiContractsSrvc',
  function ($scope, $rootScope, nrgiAuthSrvc, nrgiIdentitySrvc, $sce, nrgiContractsSrvc) {
    var fields = [
        'contract_id',
        'rc_info',
        'contract_type',
        'commodity_type',
        'commodity',
        'projects',
        'sites',
        'fields'
      ];
    var header_contracts = [
        'RC-ID',
        'Country',
        'Contract Type',
        'Commodity Type',
        'Commodity',
        'Projects',
        'Sites',
        'Fields'
      ];
    var contract_country, contract_type, commodity_type, commodity_name, str;
    var com = ', ';
    var limit = 50, currentPage = 0, totalPages = 0;
    $scope.count = 0;
    $scope.busy = false;
    $scope.csv_contracts = [];
    nrgiContractsSrvc.query({
      skip: currentPage * limit,
      limit: limit
    }, function (response) {
      $scope.count = response.count;
      $scope.contracts = response.data;
      totalPages = Math.ceil(response.count / limit);
      currentPage = currentPage + 1;
    });
    $scope.getAllContracts = function () {
      if ($scope.count < 50 || $scope.contracts.length === $scope.count) {
        $scope.createDownloadList($scope.contracts);
        setTimeout(function () {
          angular.element(document.getElementById('loadContractsCSV')).trigger('click');
        }, 0);
      } else {
        nrgiContractsSrvc.query({
          skip: 0,
          limit: $scope.count
        }, function (response) {
          $scope.contracts = response.contracts;
          $scope.createDownloadList($scope.contracts);
          setTimeout(function () {
            angular.element(document.getElementById('loadContractsCSV')).trigger('click');
          }, 0);
        });
      }
    };
    $scope.createDownloadList = function (contracts) {
      angular.forEach(contracts, function (contract, key) {
        $scope.csv_contracts[key] = [];
        angular.forEach(fields, function (field) {
          if (field == 'rc_info') {
            if (contract[field] != undefined && contract[field].length > 0) {
              str = '';
              angular.forEach(contract[field], function (rc_info, i) {
                contract_country = '';
                if (rc_info != undefined && rc_info.contract_country != undefined) {
                  contract_country = rc_info.contract_country.name.toString();
                  contract_country = contract_country.charAt(0).toUpperCase() + contract_country.substr(1);
                }
                if (i != contract[field].length - 1 && contract_country != '') {
                  str = str + contract_country + com;
                } else {
                  str = str + contract_country;
                  $scope.csv_contracts[key].push(str);
                }
              });
            } else {
              $scope.csv_contracts[key].push('');
            }
          }
          if (field == 'contract_type') {
            if (contract['rc_info'] != undefined && contract['rc_info'].length > 0) {
              str = '';
              angular.forEach(contract['rc_info'], function (rc_info, i) {
                contract_type = '';
                if (rc_info != undefined && rc_info.contract_type != undefined) {
                  contract_type = rc_info.contract_type.toString();
                  contract_type = contract_type.charAt(0).toUpperCase() + contract_type.substr(1);
                }
                if (i != contract['rc_info'].length - 1 && contract_type != '') {
                  str = str + contract_type + com;
                } else {
                  str = str + contract_type;
                  $scope.csv_contracts[key].push(str);
                }
              });
            } else {
              $scope.csv_contracts[key].push('');
            }
          }
          if (field == 'commodity_type') {
            if (contract['commodity'] != undefined && contract['commodity'].length > 0) {
              str = '';
              contract['commodity'] = _.map(_.groupBy(contract['commodity'], function (doc) {
                return doc.commodity_type;
              }), function (grouped) {
                return grouped[0];
              });
              angular.forEach(contract['commodity'], function (commodity, i) {
                commodity_type = '';
                if (commodity != undefined && commodity.commodity_type != undefined) {
                  commodity_type = commodity.commodity_type.toString();
                  commodity_type = commodity_type.charAt(0).toUpperCase() + commodity_type.substr(1);
                }
                if (i != contract['commodity'].length - 1 && commodity_type != '') {
                  str = str + commodity_type + com;
                } else {
                  str = str + commodity_type;
                  $scope.csv_contracts[key].push(str);
                }
              });
            } else {
              $scope.csv_contracts[key].push('');
            }
          }
          if (field == 'commodity') {
            if (contract[field] != undefined && contract[field].length > 0) {
              str = '';
              contract[field] = _.map(_.groupBy(contract[field], function (doc) {
                return doc.commodity_name;
              }), function (grouped) {
                return grouped[0];
              });
              angular.forEach(contract[field], function (commodity, i) {
                commodity_name = '';
                if (commodity != undefined && commodity.commodity_type != undefined) {
                  commodity_name = commodity.commodity_name.toString();
                  commodity_name = commodity_name.charAt(0).toUpperCase() + commodity_name.substr(1);
                }
                if (i != contract[field].length - 1 && commodity_name != '') {
                  str = str + commodity_name + com;
                } else {
                  str = str + commodity_name;
                  $scope.csv_contracts[key].push(str);
                }
              });
            } else {
              $scope.csv_contracts[key].push('');
            }
          }
          if (field != 'rc_info' && field != 'contract_type' && field != 'commodity_type' && field != 'commodity') {
            $scope.csv_contracts[key].push(contract[field]);
          }
        });
      });
    };
    $scope.getHeaderContracts = function () {
      return header_contracts;
    };
    $scope.loadMore = function () {
      if ($scope.busy || $scope.contracts.length === $scope.count)
        return;
      $scope.busy = true;
      if (currentPage < totalPages) {
        nrgiContractsSrvc.query({
          skip: currentPage * limit,
          limit: limit
        }, function (response) {
          $scope.contracts = _.union($scope.contracts, response.data);
          currentPage = currentPage + 1;
          $scope.busy = false;
        });
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiCountryDetailCtrl', [
  '$scope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiCountriesSrvc',
  'nrgiCountryCommoditiesSrvc',
  '$routeParams',
  function ($scope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiCountriesSrvc, nrgiCountryCommoditiesSrvc, $routeParams) {
    nrgiCountriesSrvc.get({ _id: $routeParams.id }, function (response) {
      if (response.error) {
      } else {
        $scope.country = response.country;
        $scope.country.commodities = response.commodities;
        $scope.id = response.country._id;
      }
    });
    $scope.$watch('country._id', function (value) {
      if (value != undefined) {
        nrgiCountryCommoditiesSrvc.get({ _id: value }, function (response) {
          $scope.data = response;
        });
      }
    });
  }
]);'use strict';
angular.module('app').controller('nrgiCountryListCtrl', [
  '$scope',
  '$rootScope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  '$sce',
  'nrgiCountriesSrvc',
  function ($scope, $rootScope, nrgiAuthSrvc, nrgiIdentitySrvc, $sce, nrgiCountriesSrvc) {
    var limit = 300, currentPage = 0, totalPages = 0;
    $scope.count = 0;
    $scope.busy = false;
    $scope.csv_countries = [];
    var fields = [
        'name',
        'project_count',
        'site_count',
        'field_count',
        'concession_count',
        'transfer_count'
      ];
    var header_countries = [
        'Country',
        'Projects',
        'Sites',
        'Fields',
        'Concessions',
        'Payments'
      ];
    $scope.getHeaderCountries = function () {
      return header_countries;
    };
    $scope.createDownloadList = function (countries) {
      angular.forEach(countries, function (country, key) {
        $scope.csv_countries[key] = [];
        angular.forEach(fields, function (field) {
          $scope.csv_countries[key].push(country[field]);
        });
      });
    };
    nrgiCountriesSrvc.query({
      skip: currentPage * limit,
      limit: limit
    }, function (response) {
      $scope.count = response.count;
      $scope.countries = response.countries;
      totalPages = Math.ceil(response.count / limit);
      ++currentPage;
      $scope.createDownloadList($scope.countries);
    });  // $scope.loadMore = function() {
         //     if ($scope.busy) return;
         //     $scope.busy = true;
         //     if(currentPage < totalPages) {
         //         nrgiCountriesSrvc.query({skip: currentPage*limit, limit: limit}, function (response) {
         //             $scope.countries = _.union($scope.countries, response.data);
         //             ++currentPage;
         //             $scope.busy = false;
         //             $scope.createDownloadList($scope.countries);
         //         });
         //     }
         // };
  }
]);'use strict';
angular.module('app').controller('nrgiGroupDetailCtrl', [
  '$scope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiGroupsSrvc',
  'nrgiGroupDataSrvc',
  '$routeParams',
  function ($scope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiGroupsSrvc, nrgiGroupDataSrvc, $routeParams) {
    $scope.group = [];
    nrgiGroupsSrvc.get({ _id: $routeParams.id }, function (success) {
      $scope.group = success;
    });
    nrgiGroupDataSrvc.get({ _id: $routeParams.id }, function (response) {
      $scope.group.companies = [];
      $scope.group.commodities = [];
      angular.forEach(response.companies, function (company) {
        $scope.group.companies.push(company);
      });
      angular.forEach(response.commodities, function (commodity) {
        $scope.group.commodities.push(commodity);
      });
    });
  }
]);'use strict';
angular.module('app').controller('nrgiGroupListCtrl', [
  '$scope',
  '$rootScope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiGroupsSrvc',
  function ($scope, $rootScope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiGroupsSrvc) {
    var limit = 50, currentPage = 0, totalPages = 0;
    $scope.count = 0;
    $scope.busy = false;
    $scope.csv_groups = [];
    var fields = [
        'company_group_name',
        'company_count',
        'project_count'
      ];
    var header_groups = [
        'Company Group',
        'Companies',
        'Projects'
      ];
    $scope.getHeaderGroups = function () {
      return header_groups;
    };
    $scope.createDownloadList = function (groups) {
      angular.forEach(groups, function (group, key) {
        $scope.csv_groups[key] = [];
        angular.forEach(fields, function (field) {
          $scope.csv_groups[key].push(group[field]);
        });
      });
    };
    nrgiGroupsSrvc.query({
      skip: currentPage * limit,
      limit: limit
    }, function (response) {
      $scope.count = response.count;
      $scope.groups = response.data;
      totalPages = Math.ceil(response.count / limit);
      currentPage = currentPage + 1;
      $scope.createDownloadList($scope.groups);
    });
    $scope.loadMore = function () {
      if ($scope.busy)
        return;
      $scope.busy = true;
      if (currentPage < totalPages) {
        nrgiGroupsSrvc.query({
          skip: currentPage * limit,
          limit: limit
        }, function (response) {
          $scope.groups = _.union($scope.groups, response.data);
          currentPage = currentPage + 1;
          $scope.busy = false;
          $scope.createDownloadList($scope.groups);
        });
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiPieChartCtrl', [
  '$scope',
  'nrgiPieChartSrvc',
  'usSpinnerService',
  function ($scope, nrgiPieChartSrvc, usSpinnerService) {
    $scope.currency_filter = 'USD';
    $scope.year_filter = '2015';
    var searchOptions = {
        transfer_unit: $scope.currency_filter,
        transfer_year: $scope.year_filter
      };
    $scope.options = {
      chart: {
        type: 'pieChart',
        height: 500,
        x: function (d) {
          return d.key + ', ' + d.value.toFixed(1);
        },
        y: function (d) {
          return d.value * 100 / $scope.total;
        },
        showLabels: false,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        noData: '',
        showLegend: false,
        tooltip: {
          valueFormatter: function (d, i) {
            return d.toFixed(3) + '%';
          },
          keyFormatter: function (d, i) {
            return d + ' million ' + $scope.currency_filter;
          }
        }
      }
    };
    $scope.load = function (searchOptions) {
      usSpinnerService.spin('spinner-pie-chart');
      $scope.options.chart.noData = '';
      $scope.pie = [];
      nrgiPieChartSrvc.query(searchOptions, function (response) {
        $scope.total = 0;
        if (response.data) {
          $scope.pie = response.data[0].children;
          $scope.total = response.data[0].total_value.toFixed(1);
          $scope.count = response.data[0].count;
          $scope.options.chart.noData = 'No Data Available.';
          usSpinnerService.stop('spinner-pie-chart');
        } else {
          $scope.options.chart.noData = 'No Data Available.';
          usSpinnerService.stop('spinner-pie-chart');
        }
        $scope.year_selector = response.filters.year_selector;
        $scope.currency_selector = response.filters.currency_selector;
      });
    };
    $scope.load(searchOptions);
    $scope.$watch('year_filter', function (year) {
      $scope.year = year;
      if (year && year != searchOptions.transfer_year) {
        searchOptions.transfer_year = year;
        if ($scope.currency) {
          searchOptions.transfer_unit = $scope.currency;
        }
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('currency_filter', function (currency) {
      $scope.currency = currency;
      if (currency && currency != searchOptions.transfer_unit) {
        searchOptions.transfer_unit = currency;
        if ($scope.year) {
          searchOptions.transfer_year = $scope.year;
        }
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('pie', function (pie) {
      if ($scope.api != undefined) {
        $scope.api.refresh();
      } else {
      }
    });
  }
]);'use strict';
angular.module('app').controller('nrgiAllProjectListCtrl', [
  '$scope',
  '$rootScope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiAllProjectsSrvc',
  '$filter',
  function ($scope, $rootScope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiAllProjectsSrvc, $filter) {
    var limit = 50, currentPage = 0, totalPages = 0;
    $scope.count = 0;
    $scope.busy = false;
    var country_name, str, proj_commodity_type, company_name, com = ', ';
    $scope.csv_projects = [];
    var fields = [
        'proj_id',
        'proj_name',
        'proj_country',
        'companies'
      ];
    var header_projects = [
        'Project ID',
        'Name',
        'Country',
        'Companies'
      ];
    $scope.getHeaderProjects = function () {
      return header_projects;
    };
    $scope.createDownloadList = function (projects) {
      angular.forEach(projects, function (project, key) {
        $scope.csv_projects[key] = [];
        angular.forEach(fields, function (field) {
          if (field == 'proj_country') {
            if (project[field] != undefined && project[field].length > 0) {
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
              $scope.csv_projects[key].push('');
            }
          }
          if (field == 'companies') {
            if (project[field] != undefined && project[field].length > 0) {
              str = '';
              angular.forEach(project[field], function (proj, i) {
                company_name = '';
                if (proj != undefined && proj && proj.company_name) {
                  company_name = proj.company_name.toString();
                  company_name = company_name.charAt(0).toUpperCase() + company_name.substr(1);
                }
                if (i != project[field].length - 1 && company_name != '') {
                  str = str + company_name + com;
                } else {
                  str = str + company_name;
                  $scope.csv_projects[key].push(str);
                }
              });
            } else {
              $scope.csv_projects[key].push('');
            }
          }
          if (field != 'companies' && field != 'proj_country') {
            $scope.csv_projects[key].push(project[field]);
          }
        });
      });
    };
    nrgiAllProjectsSrvc.query({
      skip: currentPage * limit,
      limit: limit
    }, function (response) {
      $scope.count = response.count;
      $scope.projects = response.projects;
      totalPages = Math.ceil(response.count / limit);
      currentPage = currentPage + 1;
      $scope.createDownloadList($scope.projects);
    });
    $scope.loadMore = function () {
      if ($scope.busy)
        return;
      $scope.busy = true;
      if (currentPage < totalPages) {
        nrgiAllProjectsSrvc.query({
          skip: currentPage * limit,
          limit: limit,
          record_type: $scope.record_type
        }, function (response) {
          $scope.projects = _.union($scope.projects, response.projects);
          currentPage = currentPage + 1;
          $scope.busy = false;
          $scope.createDownloadList($scope.projects);
        });
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiProjectDetailCtrl', [
  '$scope',
  '$rootScope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiProjectsSrvc',
  '$sce',
  'usSpinnerService',
  '$routeParams',
  'nrgiProjectDataSrvc',
  function ($scope, $rootScope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiProjectsSrvc, $sce, usSpinnerService, $routeParams, nrgiProjectDataSrvc) {
    $scope.openClose = true;
    usSpinnerService.spin('spinner-filing');
    nrgiProjectsSrvc.get({ _id: $routeParams.id }, function (success) {
      if (success.error) {
        $scope.error = success.error;
      } else {
        $scope.id = success.project._id;
        $scope.url = 'http://newaleph.openoil.net/clients/resourceprojects/?project_name=' + success.project.proj_name;
        $scope.project = success.project;
      }
    });
    $scope.$watch('id', function (value) {
      if (value != undefined) {
        nrgiProjectDataSrvc.get({ _id: $scope.id }, function (success) {
          $scope.data = success;
        });
      }
    });
    $scope.trustSrc = function (src) {
      return $sce.trustAsResourceUrl(src);
    };
    $scope.iframeLoadedCallBack = function () {
      usSpinnerService.stop('spinner-filing');
      angular.element(document.getElementsByTagName('iframe')).addClass('iframedata');
    };
  }
]);'use strict';
angular.module('app').controller('nrgiProjectListCtrl', [
  '$scope',
  '$rootScope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiProjectsSrvc',
  '$filter',
  function ($scope, $rootScope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiProjectsSrvc, $filter) {
    var fields = [
        'proj_id',
        'proj_name',
        'verified',
        'proj_country',
        'proj_commodity_type',
        'proj_commodity',
        'proj_status',
        'company_count',
        'transfer_count',
        'production_count'
      ];
    var header_projects = [
        'Project ID',
        'Name',
        'Verified Project',
        'Country',
        'Type',
        'Commodity',
        'Status',
        'Companies',
        'Payments',
        'Production'
      ];
    var country_name, str, proj_commodity_type, commodity_name, companyName, timestamp, status, com = ', ';
    var limit = 50, currentPage = 0, totalPages = 0;
    $scope.count = 0;
    $scope.busy = false;
    $scope.csv_projects = [];
    nrgiProjectsSrvc.query({
      skip: currentPage * limit,
      limit: limit
    }, function (response) {
      $scope.count = response.count;
      $scope.projects = response.projects;
      totalPages = Math.ceil(response.count / limit);
      currentPage = currentPage + 1;
    });
    $scope.getAllProjects = function () {
      if ($scope.count < 50 || $scope.projects.length === $scope.count) {
        $scope.createDownloadList($scope.projects);
        setTimeout(function () {
          angular.element(document.getElementById('loadProjectsCSV')).trigger('click');
        }, 0);
      } else {
        nrgiProjectsSrvc.query({
          skip: 0,
          limit: $scope.count
        }, function (response) {
          $scope.projects = response.projects;
          $scope.createDownloadList($scope.projects);
          setTimeout(function () {
            angular.element(document.getElementById('loadProjectsCSV')).trigger('click');
          }, 0);
        });
      }
    };
    $scope.createDownloadList = function (projects) {
      angular.forEach(projects, function (project, key) {
        $scope.csv_projects[key] = [];
        angular.forEach(fields, function (field) {
          if (field == 'verified') {
            if (project[field] != undefined) {
              project[field] = project[field].charAt(0).toUpperCase() + project[field].substr(1);
              $scope.csv_projects[key].push(project[field]);
            } else {
              $scope.csv_projects[key].push('');
            }
          }
          if (field == 'proj_country') {
            if (project[field] != undefined && project[field].length > 0) {
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
              $scope.csv_projects[key].push('');
            }
          }
          if (field == 'proj_commodity_type') {
            if (project['proj_commodity'] != undefined && project['proj_commodity'].length > 0) {
              str = '';
              project['proj_commodity'] = _.map(_.groupBy(project['proj_commodity'], function (doc) {
                if (doc && doc != null) {
                  return doc.commodity_type;
                }
              }), function (grouped) {
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
              $scope.csv_projects[key].push('');
            }
          }
          if (field == 'proj_commodity') {
            if (project[field] != undefined && project[field].length > 0) {
              str = '';
              project[field] = _.map(_.groupBy(project[field], function (doc) {
                if (doc && doc != null) {
                  return doc.commodity_name;
                }
              }), function (grouped) {
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
              $scope.csv_projects[key].push('');
            }
          }
          if (field == 'proj_status') {
            if (project[field] != undefined && project[field].length > 0) {
              str = '';
              var proj_status = project[field];
              status = '';
              if (proj_status[project[field].length - 1] != undefined) {
                status = proj_status[project[field].length - 1].string.toString();
                status = status.charAt(0).toUpperCase() + status.substr(1);
                timestamp = $filter('date')(proj_status[project[field].length - 1].timestamp, 'MM/dd/yyyy @ h:mma');
                str = status + '(true at ' + timestamp + ')';
                $scope.csv_projects[key].push(str);
              } else {
                $scope.csv_projects[key].push(str);
              }
            } else {
              $scope.csv_projects[key].push('');
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
              $scope.csv_projects[key].push(str);
            } else {
              $scope.csv_projects[key].push(project[field]);
            }
          }
          if (field != 'verified' && field != 'proj_country' && field != 'proj_commodity_type' && field != 'proj_commodity' && field != 'proj_status' && field != 'company_count') {
            $scope.csv_projects[key].push(project[field]);
          }
        });
      });
    };
    $scope.getHeaderProjects = function () {
      return header_projects;
    };
    $scope.loadMore = function () {
      if ($scope.busy || $scope.projects.length === $scope.count)
        return;
      $scope.busy = true;
      if (currentPage < totalPages) {
        nrgiProjectsSrvc.query({
          skip: currentPage * limit,
          limit: limit,
          record_type: $scope.record_type
        }, function (response) {
          $scope.projects = _.union($scope.projects, response.projects);
          currentPage = currentPage + 1;
          $scope.busy = false;
        });
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiMapSiteCtrl', [
  '$scope',
  'nrgiSitesSrvc',
  '$location',
  function ($scope, nrgiSitesSrvc, $location) {
    $scope.field = false;
    if ($location.path() == '/sites/map') {
      $scope.field = false;
      $scope.record_type = 'sites';
      $scope.header = 'Site';
    } else {
      $scope.field = true;
      $scope.record_type = 'fields';
      $scope.header = 'Field';
    }
    nrgiSitesSrvc.get({
      map: 'map',
      field: $scope.field
    }, function (success) {
      $scope.siteMarkers = success.data;
    });
  }
]);'use strict';
angular.module('app').controller('nrgiSiteDetailCtrl', [
  '$scope',
  '$rootScope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiSitesSrvc',
  '$routeParams',
  function ($scope, $rootScope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiSitesSrvc, $routeParams) {
    nrgiSitesSrvc.get({ _id: $routeParams.id }, function (success, error) {
      if (success.site) {
        $scope.id = success.site._id;
        $scope.site = success.site;
      } else {
        console.log(error);
      }  //var _ = $rootScope._;
         //_.each($scope.site.companies, function(company) {
         //    company.operator = false;
         //    _.each($scope.site.site_company_share, function(company_share) {
         //        if (company._id==company_share.company) {
         //            company.stake = {share: company_share.number, timestamp: company_share.timestamp}
         //        }
         //    });
         //    // _.each($scope.project.proj_operated_by, function(company_op) {
         //    //     if (company._id==company_op.company) {
         //    //         company.operator = true;
         //    //     }
         //    // })
         //});
    });
    nrgiSitesSrvc.get({
      data: 'data',
      _id: $routeParams.id
    }, function (success, error) {
      if (success) {
        $scope.data = success;
      } else {
        console.log(error);
      }
    });
  }
]);'use strict';
angular.module('app').controller('nrgiSiteListCtrl', [
  '$scope',
  '$rootScope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiSitesSrvc',
  '$location',
  '$filter',
  function ($scope, $rootScope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiSitesSrvc, $location, $filter) {
    var fields = [
        'site_name',
        'site_country',
        'site_commodity_type',
        'site_commodity',
        'site_status',
        'company_count',
        'project_count',
        'concession_count',
        'transfer_count',
        'production_count'
      ];
    var header_projects = [
        'Name',
        'Country',
        'Commodity Type',
        'Commodity',
        'Status',
        'Companies',
        'Projects',
        'Concessions',
        'Payments',
        'Production'
      ];
    var country_name, str, commodity_type, commodity_name, timestamp, status, com = ', ';
    var limit = 50, currentPage = 0, totalPages = 0;
    $scope.count = 0;
    $scope.field = false;
    $scope.busy = false;
    $scope.csv_file = [];
    if ($location.path() == '/sites') {
      $scope.field = false;
      $scope.record_type = 'sites';
      $scope.route = 'site';
      $scope.header = 'Sites';
    } else if ($location.path() == '/fields') {
      $scope.field = true;
      $scope.route = 'field';
      $scope.record_type = 'fields';
      $scope.header = 'Fields';
    }
    nrgiSitesSrvc.query({
      skip: currentPage * limit,
      limit: limit,
      field: $scope.field
    }, function (response) {
      $scope.count = response.count;
      $scope.sites = response.sites;
      totalPages = Math.ceil(response.count / limit);
      currentPage = currentPage + 1;
    });
    $scope.getAllSites = function () {
      if ($scope.count < 50 || $scope.sites.length === $scope.count) {
        $scope.createDownloadList($scope.sites);
        setTimeout(function () {
          angular.element(document.getElementById('loadSitesCSV')).trigger('click');
        }, 0);
      } else {
        nrgiSitesSrvc.query({
          skip: 0,
          limit: $scope.count,
          field: $scope.field
        }, function (response) {
          $scope.sites = response.sites;
          $scope.createDownloadList($scope.sites);
          setTimeout(function () {
            angular.element(document.getElementById('loadSitesCSV')).trigger('click');
          }, 0);
        });
      }
    };
    $scope.createDownloadList = function (sites) {
      angular.forEach(sites, function (site, key) {
        $scope.csv_file[key] = [];
        angular.forEach(fields, function (field) {
          if (field == 'site_country') {
            if (site[field] != undefined && site[field].length > 0) {
              str = '';
              angular.forEach(site[field], function (country, i) {
                country_name = '';
                if (country != undefined && country.name) {
                  country_name = country.name.toString();
                  country_name = country_name.charAt(0).toUpperCase() + country_name.substr(1);
                }
                if (i != site[field].length - 1 && country_name != '') {
                  str = str + country_name + com;
                } else {
                  str = str + country_name;
                  $scope.csv_file[key].push(str);
                }
              });
            } else {
              $scope.csv_file[key].push('');
            }
          }
          if (field == 'site_commodity_type') {
            if (site['site_commodity'] != undefined && site['site_commodity'].length > 0) {
              str = '';
              site['site_commodity'] = _.map(_.groupBy(site['site_commodity'], function (doc) {
                if (doc && doc.commodity_type) {
                  return doc.commodity_type;
                }
              }), function (grouped) {
                return grouped[0];
              });
              angular.forEach(site['site_commodity'], function (commodity, i) {
                commodity_type = '';
                if (commodity != undefined && commodity.commodity_type) {
                  commodity_type = commodity.commodity_type.toString();
                  commodity_type = commodity_type.charAt(0).toUpperCase() + commodity_type.substr(1);
                }
                if (i != site['site_commodity'].length - 1 && commodity_type != '') {
                  str = str + commodity_type + com;
                } else {
                  str = str + commodity_type;
                  $scope.csv_file[key].push(str);
                }
              });
            } else {
              $scope.csv_file[key].push('');
            }
          }
          if (field == 'site_commodity') {
            if (site[field] != undefined && site[field].length > 0) {
              str = '';
              site[field] = _.map(_.groupBy(site[field], function (doc) {
                if (doc && doc.commodity_name) {
                  return doc.commodity_name;
                }
              }), function (grouped) {
                return grouped[0];
              });
              angular.forEach(site[field], function (commodity, i) {
                commodity_name = '';
                if (commodity != undefined && commodity.commodity_name) {
                  commodity_name = commodity.commodity_name.toString();
                  commodity_name = commodity_name.charAt(0).toUpperCase() + commodity_name.substr(1);
                }
                if (i != site[field].length - 1 && commodity_name != '') {
                  str = str + commodity_name + com;
                } else {
                  str = str + commodity_name;
                  $scope.csv_file[key].push(str);
                }
              });
            } else {
              $scope.csv_file[key].push('');
            }
          }
          if (field == 'site_status') {
            if (site[field] != undefined && site[field].length > 0) {
              str = '';
              angular.forEach(site[field], function (site_status, i) {
                status = '';
                if (site_status != undefined) {
                  status = site_status.string.toString();
                  status = status.charAt(0).toUpperCase() + status.substr(1);
                  timestamp = $filter('date')(site_status.timestamp, 'MM/dd/yyyy @ h:mma');
                  str = status + '(true at ' + timestamp + ')';
                  $scope.csv_file[key].push(str);
                }
              });
            } else {
              $scope.csv_file[key].push('');
            }
          }
          if (field != 'site_country' && field != 'site_commodity_type' && field != 'site_commodity' && field != 'site_status') {
            $scope.csv_file[key].push(site[field]);
          }
        });
      });
    };
    $scope.getHeader = function () {
      return header_projects;
    };
    $scope.loadMore = function () {
      if ($scope.busy || $scope.sites.length === $scope.count)
        return;
      $scope.busy = true;
      if (currentPage < totalPages) {
        nrgiSitesSrvc.query({
          skip: currentPage * limit,
          limit: limit,
          field: $scope.field
        }, function (response) {
          $scope.sites = _.union($scope.sites, response.sites);
          currentPage = currentPage + 1;
          $scope.busy = false;
        });
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiSourceDetailCtrl', [
  '$scope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiSourcesSrvc',
  '$routeParams',
  function ($scope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiSourcesSrvc, $routeParams) {
    nrgiSourcesSrvc.get({ _id: $routeParams.id }, function (success) {
      $scope.source = success.source;
    });
  }
]);'use strict';
angular.module('app').controller('nrgiSourceListCtrl', [
  '$scope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiSourcesSrvc',
  '$filter',
  function ($scope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiSourcesSrvc, $filter) {
    var fields = [
        'source_name',
        'source_type_id',
        'source_url',
        'source_date',
        'retrieve_date'
      ];
    var header_projects = [
        'Source',
        'Source type',
        'Access source',
        'Source date',
        'Retrieved date'
      ];
    var limit = 50, currentPage = 0, totalPages = 0, query_options;
    $scope.count = 0;
    $scope.busy = false;
    $scope.csv_sources = [];
    nrgiSourcesSrvc.query({
      skip: currentPage * limit,
      limit: limit
    }, function (response) {
      $scope.count = response.count;
      $scope.sources = response.sources;
      $scope.types = [];
      totalPages = Math.ceil(response.count / limit);
      currentPage = currentPage + 1;
      _.each(response.sources, function (sources) {
        $scope.types.push(sources.source_type_id);
      });
      $scope.source_type_id = _.countBy($scope.types, 'source_type_name');
    });
    $scope.$watch('source_type_filter', function (source_type) {
      currentPage = 0;
      totalPages = 0;
      var searchOptions = {
          skip: currentPage,
          limit: limit
        };
      if (source_type) {
        _.each($scope.types, function (type) {
          if (type && type.source_type_name.toString() == source_type.toString()) {
            searchOptions.source_type_id = type._id;
          }
        });
        filteredQuery(searchOptions);
      }
      if (source_type !== undefined && source_type == '') {
        delete searchOptions.source_type_id;
        filteredQuery(searchOptions);
      }
    });
    function filteredQuery(options) {
      query_options = options.source_type_id;
      nrgiSourcesSrvc.query(options, function (response) {
        if (response.reason) {
          nrgiNotifier.error('Load document data failure');
        } else {
          $scope.count = response.count;
          $scope.sources = response.sources;
          totalPages = Math.ceil(response.count / limit);
          currentPage = currentPage + 1;
        }
      });
    }
    ;
    $scope.getAllSources = function () {
      if ($scope.count < 50 || $scope.sources.length === $scope.count) {
        $scope.createDownloadList($scope.sources);
        setTimeout(function () {
          angular.element(document.getElementById('loadSourcesCSV')).trigger('click');
        }, 0);
      } else {
        var searchOptions = {
            skip: 0,
            limit: $scope.count
          };
        if (query_options !== undefined) {
          searchOptions.source_type_id = query_options;
        }
        nrgiSourcesSrvc.query(searchOptions, function (response) {
          $scope.sources = response.sources;
          $scope.createDownloadList($scope.sources);
          setTimeout(function () {
            angular.element(document.getElementById('loadSourcesCSV')).trigger('click');
          }, 0);
        });
      }
    };
    $scope.createDownloadList = function (sources) {
      $scope.csv_sources = [];
      angular.forEach(sources, function (source, key) {
        $scope.csv_sources[key] = [];
        angular.forEach(fields, function (field) {
          if (field == 'source_type_id') {
            if (source[field] && source[field].source_type_name) {
              $scope.csv_sources[key].push(source[field].source_type_name);
            } else {
              $scope.csv_sources[key].push('');
            }
          }
          if (field == 'source_date' || field == 'retrieve_date') {
            source[field] = $filter('date')(source[field], 'yyyy-MM-dd');
            $scope.csv_sources[key].push(source[field]);
          }
          if (field != 'source_date' && field != 'retrieve_date' && field != 'source_type_id') {
            $scope.csv_sources[key].push(source[field]);
          }
        });
      });
    };
    $scope.getHeaderSources = function () {
      return header_projects;
    };
    $scope.loadMore = function () {
      if ($scope.busy || $scope.sources.length === $scope.count)
        return;
      $scope.busy = true;
      if (currentPage < totalPages) {
        nrgiSourcesSrvc.query({
          skip: currentPage * limit,
          limit: limit
        }, function (response) {
          $scope.sources = _.union($scope.sources, response.sources);
          currentPage = currentPage + 1;
          $scope.busy = false;
        });
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiSourceTypeDetailCtrl', [
  '$scope',
  'nrgiSourceTypesSrvc',
  '$routeParams',
  function ($scope, nrgiSourceTypesSrvc, $routeParams) {
    nrgiSourceTypesSrvc.get({ _id: $routeParams.id }, function (success) {
      $scope.source_type = success.sourceTypes;
    });
  }
]);'use strict';
angular.module('app').controller('nrgiSourceTypeListCtrl', [
  '$scope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiSourceTypesSrvc',
  '$rootScope',
  function ($scope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiSourceTypesSrvc, $rootScope) {
    var limit = 50, currentPage = 0, totalPages = 0;
    $scope.count = 0;
    $scope.field = false;
    $scope.busy = false;
    $scope.csv_source_types = [];
    var fields = [
        'source_type_name',
        'source_type_authority',
        'project_count'
      ];
    var header_projects = [
        'Source',
        'Type',
        'Projects',
        'Countries'
      ];
    $scope.getHeaderSourceTypes = function () {
      return header_projects;
    };
    $scope.createDownloadList = function (sourceTypes) {
      angular.forEach(sourceTypes, function (source_type, key) {
        $scope.csv_source_types[key] = [];
        angular.forEach(fields, function (field) {
          $scope.csv_source_types[key].push(source_type[field]);
        });
      });
    };
    nrgiSourceTypesSrvc.query({
      skip: currentPage * limit,
      limit: limit
    }, function (response) {
      $scope.count = response.count;
      $scope.sourceTypes = response.data;
      totalPages = Math.ceil(response.count / limit);
      currentPage = currentPage + 1;
      $scope.createDownloadList($scope.sourceTypes);
    });
    $scope.loadMore = function () {
      if ($scope.busy)
        return;
      $scope.busy = true;
      if (currentPage < totalPages) {
        nrgiSourceTypesSrvc.query({
          skip: currentPage * limit,
          limit: limit
        }, function (response) {
          $scope.sourceTypes = _.union($scope.sourceTypes, response.data);
          currentPage = currentPage + 1;
          $scope.busy = false;
          $scope.createDownloadList($scope.sourceTypes);
        });
      }
    };
  }
]);'use strict';
angular.module('app').controller('nrgiTransferListCtrl', [
  '$scope',
  '$rootScope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiTransfersSrvc',
  'nrgiTransferFilters',
  '$filter',
  function ($scope, $rootScope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiTransfersSrvc, nrgiTransferFilters, $filter) {
    var currentPage = 0, totalPages = 0, searchOptions = {}, headerTransfer = [], fields = [], countryName = '', companyName = '', transferValue = '';
    var headers = [
        {
          name: 'Year',
          status: true,
          field: 'transfer_year'
        },
        {
          name: 'Company',
          status: true,
          field: 'company'
        },
        {
          name: 'Country',
          status: true,
          field: 'country'
        },
        {
          name: 'Project',
          status: true,
          field: 'proj_site'
        },
        {
          name: 'Project ID',
          status: true,
          field: 'proj_id'
        },
        {
          name: 'Level ',
          status: true,
          field: 'transfer_gov_entity'
        },
        {
          name: 'Payment Type',
          status: true,
          field: 'transfer_type'
        },
        {
          name: 'Currency',
          status: true,
          field: 'transfer_unit'
        },
        {
          name: 'Value ',
          status: true,
          field: 'transfer_value'
        }
      ];
    $scope.limit = 500;
    $scope.skip = currentPage * $scope.limit;
    $scope.count = 0;
    $scope.busy = false;
    $scope.new = true;
    $scope.transfers = [];
    $scope.currency = '';
    $scope.year = '';
    $scope.type_filter = 'Show all types';
    $scope.company_filter = 'Show all companies';
    $scope.country_filter = 'Show all countries';
    $scope.csv_transfers = [];
    nrgiTransferFilters.query({ country: false }, function (response) {
      if (response.filters && Object.keys(response.filters).length > 0) {
        $scope.year_selector = response.filters.year_selector;
        $scope.currency_selector = response.filters.currency_selector;
        $scope.type_selector = response.filters.type_selector;
        $scope.company_selector = response.filters.company_selector;
        $scope.country_selector = response.filters.country_selector;
        if (_.indexOf($scope.currency_selector, 'USD')) {
          $scope.currency_filter = 'USD';
        } else if ($scope.currency_selector && $scope.currency_selector[0]) {
          $scope.currency_filter = $scope.currency_selector[0];
        }
        if (_.indexOf($scope.year_selector, '2015')) {
          $scope.year_filter = '2015';
        } else if ($scope.year_selector && $scope.year_selector[0]) {
          $scope.year_filter = $scope.year_selector[0];
        }
        searchOptions = {
          skip: $scope.skip,
          limit: $scope.limit,
          transfer_year: $scope.year_filter,
          transfer_unit: $scope.currency_filter
        };
      } else {
        $scope.currency_filter = 'Show all currency';
        $scope.year_filter = 'Show all years';
        searchOptions = {
          skip: $scope.skip,
          limit: $scope.limit
        };
      }
      $scope.load(searchOptions);
    });
    angular.forEach(headers, function (header) {
      if (header.status != false && header.status != undefined) {
        headerTransfer.push(header.name);
        fields.push(header.field);
      }
    });
    $scope.$watch('year_filter', function (year) {
      $scope.year = year;
      $scope.new = true;
      if (searchOptions.transfer_year != year && year && year != 'Show all years') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        searchOptions.transfer_year = year;
        $scope.load(searchOptions);
      } else if (searchOptions.transfer_year && year == 'Show all years') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        delete searchOptions.transfer_year;
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('currency_filter', function (currency) {
      $scope.currency = currency;
      $scope.new = true;
      if (searchOptions.transfer_unit != currency && currency && currency != 'Show all currency') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        searchOptions.transfer_unit = currency;
        $scope.load(searchOptions);
      } else if (searchOptions.transfer_unit && currency == 'Show all currency') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        delete searchOptions.transfer_unit;
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('type_filter', function (type) {
      $scope.type = type;
      if (type && type != 'Show all types') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        searchOptions.transfer_type = type;
        $scope.load(searchOptions);
      } else if (searchOptions.transfer_type && type == 'Show all types') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        delete searchOptions.transfer_type;
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('company_filter', function (company) {
      $scope.company = company;
      if (company && company != 'Show all companies') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        searchOptions.company = company;
        $scope.load(searchOptions);
      } else if (searchOptions.company && company == 'Show all companies') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        delete searchOptions.company;
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('country_filter', function (country) {
      $scope.country = country;
      if (country && country != 'Show all countries') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        searchOptions.country = country;
        $scope.load(searchOptions);
      } else if (searchOptions.country && country == 'Show all countries') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        delete searchOptions.country;
        $scope.load(searchOptions);
      }
    });
    $scope.getAllTransfers = function () {
      if ($scope.count < $scope.limit || $scope.transfers.length === $scope.count) {
        $scope.createDownloadList($scope.transfers);
        setTimeout(function () {
          angular.element(document.getElementById('loadTransfersCSV')).trigger('click');
        }, 0);
      } else {
        searchOptions.limit = $scope.count;
        nrgiTransfersSrvc.query(searchOptions, function (response) {
          $scope.transfers = response.transfers;
          $scope.createDownloadList($scope.transfers);
          setTimeout(function () {
            angular.element(document.getElementById('loadTransfersCSV')).trigger('click');
          }, 0);
        });
      }
    };
    $scope.createDownloadList = function (transfers) {
      $scope.csv_transfers = [];
      angular.forEach(transfers, function (transfer, key) {
        $scope.csv_transfers[key] = [];
        angular.forEach(fields, function (field) {
          if (field == 'transfer_value') {
            transferValue = '';
            transferValue = $filter('currency')(transfer[field], '', 0);
            $scope.csv_transfers[key].push(transferValue);
          }
          if (field == 'country') {
            countryName = '';
            if (transfer[field] != undefined && transfer[field].name) {
              countryName = transfer[field].name.toString();
              countryName = countryName.charAt(0).toUpperCase() + countryName.substr(1);
            }
            $scope.csv_transfers[key].push(countryName);
          }
          if (field == 'company') {
            companyName = '';
            if (transfer[field] != undefined && transfer[field].company_name) {
              companyName = transfer[field].company_name.toString();
              companyName = companyName.charAt(0).toUpperCase() + companyName.substr(1);
            }
            $scope.csv_transfers[key].push(companyName);
          }
          if (field == 'transfer_gov_entity') {
            if (transfer[field]) {
              name = transfer[field];
            }
            if (!transfer[field]) {
              if (transfer.proj_site != undefined) {
                name = transfer.proj_site.type;
              } else {
                name = '';
              }
            }
            $scope.csv_transfers[key].push(name);
          }
          if (field == 'proj_site') {
            name = '';
            if (transfer[field] != undefined && transfer[field].name != undefined) {
              var name = transfer[field].name.toString();
            }
            $scope.csv_transfers[key].push(name);
          }
          if (field == 'proj_id') {
            id = '';
            if (transfer.proj_site != undefined && transfer.proj_site._id != undefined && transfer.proj_site.type == 'project') {
              var id = transfer.proj_site._id.toString();
            }
            $scope.csv_transfers[key].push(id);
          }
          if (field != 'company' && field != 'transfer_gov_entity' && field != 'country' && field != 'proj_site' && field != 'proj_id' && field != 'transfer_value') {
            $scope.csv_transfers[key].push(transfer[field]);
          }
        });
      });
    };
    $scope.getHeaderTransfers = function () {
      return headerTransfer;
    };
    $scope.loadMore = function () {
      if ($scope.busy || $scope.transfers.length === $scope.count)
        return;
      $scope.busy = true;
      if (currentPage < totalPages) {
        $scope.new = false;
        $scope.load(searchOptions);
      }
    };
    $scope.load = function (searchOptions) {
      searchOptions.skip = $scope.skip;
      nrgiTransfersSrvc.query(searchOptions, function (response) {
        if (response.transfers) {
          $scope.count = response.count;
          if ($scope.new) {
            $scope.transfers = response.transfers;
          } else {
            $scope.transfers = _.union($scope.transfers, response.transfers);
          }
          $scope.transfer_count = response.transfers.length;
          totalPages = Math.ceil(response.count / $scope.limit);
          currentPage = currentPage + 1;
          $scope.skip = currentPage * $scope.limit;
          $scope.busy = false;
        } else {
          $scope.transfers = [];
        }
      });
    };
  }
]);'use strict';
angular.module('app').controller('nrgiTransferByGovListCtrl', [
  '$scope',
  '$rootScope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiTransfersByGovSrvc',
  'nrgiTransferFilters',
  '$filter',
  function ($scope, $rootScope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiTransfersByGovSrvc, nrgiTransferFilters, $filter) {
    var currentPage = 0, totalPages = 0, searchOptions = {}, header_transfer = [], fields = [], country_name = '', transfer_value = '', company_name = '';
    var headers = [
        {
          name: 'Year',
          status: true,
          field: 'transfer_year'
        },
        {
          name: 'Company',
          status: true,
          field: 'company'
        },
        {
          name: 'Country',
          status: true,
          field: 'country'
        },
        {
          name: 'Government entity',
          status: true,
          field: 'transfer_gov_entity'
        },
        {
          name: 'Level ',
          status: true,
          field: 'transfer_level'
        },
        {
          name: 'Payment Type',
          status: true,
          field: 'transfer_type'
        },
        {
          name: 'Currency',
          status: true,
          field: 'transfer_unit'
        },
        {
          name: 'Value ',
          status: true,
          field: 'transfer_value'
        }
      ];
    $scope.limit = 500;
    $scope.skip = currentPage * $scope.limit;
    $scope.new = true;
    $scope.count = 0;
    $scope.busy = false;
    $scope.transfers = [];
    $scope.currency = '';
    $scope.year = '';
    $scope.type_filter = 'Show all types';
    $scope.company_filter = 'Show all companies';
    $scope.country_filter = 'Show all countries';
    $scope.csv_transfers = [];
    nrgiTransferFilters.query({ country: true }, function (response) {
      if (Object.keys(response.filters).length > 0) {
        $scope.year_selector = response.filters.year_selector;
        $scope.currency_selector = response.filters.currency_selector;
        $scope.type_selector = response.filters.type_selector;
        $scope.company_selector = response.filters.company_selector;
        $scope.country_selector = response.filters.country_selector;
        if (_.indexOf($scope.currency_selector, 'USD')) {
          $scope.currency_filter = 'USD';
        } else if ($scope.currency_selector && $scope.currency_selector[0]) {
          $scope.currency_filter = $scope.currency_selector[0];
        }
        if (_.indexOf($scope.year_selector, '2015')) {
          $scope.year_filter = '2015';
        } else if ($scope.year_selector && $scope.year_selector[0]) {
          $scope.year_filter = $scope.year_selector[0];
        }
        searchOptions = {
          skip: $scope.skip,
          limit: $scope.limit,
          transfer_year: $scope.year_filter,
          transfer_unit: $scope.currency_filter
        };
      } else {
        searchOptions = {
          skip: $scope.skip,
          limit: $scope.limit
        };
        $scope.currency_filter = 'Show all currency';
        $scope.year_filter = 'Show all years';
      }
      $scope.load(searchOptions);
    });
    angular.forEach(headers, function (header) {
      if (header.status != false && header.status != undefined) {
        header_transfer.push(header.name);
        fields.push(header.field);
      }
    });
    $scope.$watch('year_filter', function (year) {
      $scope.year = year;
      $scope.new = true;
      if (searchOptions.transfer_year != year && year && year != 'Show all years') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        searchOptions.transfer_year = year;
        $scope.load(searchOptions);
      } else if (searchOptions.transfer_year && year == 'Show all years') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        delete searchOptions.transfer_year;
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('currency_filter', function (currency) {
      $scope.currency = currency;
      $scope.new = true;
      if (searchOptions.transfer_unit != currency && currency && currency != 'Show all currency') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        searchOptions.transfer_unit = currency;
        $scope.load(searchOptions);
      } else if (searchOptions.transfer_unit && currency == 'Show all currency') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        delete searchOptions.transfer_unit;
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('type_filter', function (type) {
      $scope.type = type;
      if (type && type != 'Show all types') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        searchOptions.transfer_type = type;
        $scope.load(searchOptions);
      } else if (searchOptions.transfer_type && type == 'Show all types') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        delete searchOptions.transfer_type;
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('company_filter', function (company) {
      $scope.company = company;
      if (company && company != 'Show all companies') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        searchOptions.company = company;
        $scope.load(searchOptions);
      } else if (searchOptions.company && company == 'Show all companies') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        delete searchOptions.company;
        $scope.load(searchOptions);
      }
    });
    $scope.$watch('country_filter', function (country) {
      $scope.country = country;
      if (country && country != 'Show all countries') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        searchOptions.country = country;
        $scope.load(searchOptions);
      } else if (searchOptions.country && country == 'Show all countries') {
        $scope.skip = 0;
        searchOptions.skip = 0;
        searchOptions.limit = 500;
        currentPage = 0;
        delete searchOptions.country;
        $scope.load(searchOptions);
      }
    });
    $scope.getAllTransfers = function () {
      if ($scope.count < $scope.limit || $scope.transfers.length === $scope.count) {
        $scope.createDownloadList($scope.transfers);
        setTimeout(function () {
          angular.element(document.getElementById('loadTransfersCSV')).trigger('click');
        }, 0);
      } else {
        searchOptions.limit = $scope.count;
        nrgiTransfersByGovSrvc.query(searchOptions, function (response) {
          $scope.transfers = response.transfers;
          $scope.createDownloadList($scope.transfers);
          setTimeout(function () {
            angular.element(document.getElementById('loadTransfersCSV')).trigger('click');
          }, 0);
        });
      }
    };
    $scope.createDownloadList = function (transfers) {
      $scope.csv_transfers = [];
      angular.forEach(transfers, function (transfer, key) {
        $scope.csv_transfers[key] = [];
        angular.forEach(fields, function (field) {
          if (field == 'transfer_value') {
            transfer_value = '';
            transfer_value = $filter('currency')(transfer[field], '', 0);
            $scope.csv_transfers[key].push(transfer_value);
          }
          if (field == 'country') {
            country_name = '';
            if (transfer[field] != undefined && transfer[field].name) {
              country_name = transfer[field].name.toString();
              country_name = country_name.charAt(0).toUpperCase() + country_name.substr(1);
            }
            $scope.csv_transfers[key].push(country_name);
          }
          if (field == 'company') {
            company_name = '';
            if (transfer[field] != undefined && transfer[field].company_name) {
              company_name = transfer[field].company_name.toString();
              company_name = company_name.charAt(0).toUpperCase() + company_name.substr(1);
            }
            $scope.csv_transfers[key].push(company_name);
          }
          if (field != 'company' && field != 'country' && field != 'transfer_value') {
            $scope.csv_transfers[key].push(transfer[field]);
          }
        });
      });
    };
    $scope.getHeaderTransfers = function () {
      return header_transfer;
    };
    $scope.loadMore = function () {
      if ($scope.busy || $scope.transfers.length === $scope.count)
        return;
      $scope.busy = true;
      if (currentPage < totalPages) {
        $scope.new = false;
        $scope.load(searchOptions);
      }
    };
    $scope.load = function (searchOptions) {
      searchOptions.skip = $scope.skip;
      nrgiTransfersByGovSrvc.query(searchOptions, function (response) {
        if (response.transfers) {
          $scope.count = response.count;
          if ($scope.new) {
            $scope.transfers = response.transfers;
          } else {
            $scope.transfers = _.union($scope.transfers, response.transfers);
          }
          $scope.transfer_count = response.transfers.length;
          totalPages = Math.ceil(response.count / $scope.limit);
          currentPage = currentPage + 1;
          $scope.skip = currentPage * $scope.limit;
          $scope.busy = false;
        } else {
          $scope.transfers = [];
        }
      });
    };
  }
]);'use strict';
angular.module('app').controller('nrgiMainCtrl', [
  '$scope',
  'nrgiAuthSrvc',
  'nrgiIdentitySrvc',
  'nrgiLandingPageContentSrvc',
  function ($scope, nrgiAuthSrvc, nrgiIdentitySrvc, nrgiLandingPageContentSrvc) {
    $scope.current_user = nrgiIdentitySrvc.currentUser;
    nrgiLandingPageContentSrvc.get(function (success) {
      $scope.content = success;
    }, function (error) {
    });
  }
]);'use strict';
angular.module('app').controller('nrgiNavBarCtrl', [
  '$scope',
  '$http',
  '$location',
  'nrgiNotifier',
  'nrgiIdentitySrvc',
  'nrgiAuthSrvc',
  function ($scope, $http, $location, nrgiNotifier, nrgiIdentitySrvc, nrgiAuthSrvc) {
    // assign the identity resource with the current identity using identity service
    $scope.identity = nrgiIdentitySrvc;
    // signout function for signout button
    $scope.signout = function () {
      nrgiAuthSrvc.logoutUser().then(function () {
        $scope.username = '';
        $scope.password = '';
        nrgiNotifier.notify('You have successfully signed out!');
        $location.path('/');
      });
    };
  }
]);angular.module('app').factory('nrgiCommoditiesMethodSrvc', [
  '$q',
  'nrgiCommoditiesSrvc',
  function ($q, nrgiCommoditiesSrvc) {
    return {
      createCommodity: function (new_commodity_data) {
        var new_commodity = new nrgiCommoditiesSrvc(new_commodity_data);
        var dfd = $q.defer();
        new_commodity.$save().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      updateCommodity: function (new_commodity_data) {
        var dfd = $q.defer();
        new_commodity_data.$update().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      deleteCommodity: function (commodity_deletion) {
        var dfd = $q.defer();
        var delete_ID = new nrgiCommoditiesSrvc();
        delete_ID.id = commodity_deletion;
        delete_ID.$delete().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      }
    };
  }
]);angular.module('app').factory('nrgiCompaniesMethodSrvc', [
  '$q',
  'nrgiCompaniesSrvc',
  function ($q, nrgiCompaniesSrvc) {
    return {
      createCompany: function (new_company_data) {
        var new_company = new nrgiCompaniesSrvc(new_company_data);
        var dfd = $q.defer();
        new_company.$save().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      updateCompany: function (new_company_data) {
        var dfd = $q.defer();
        new_company_data.$update().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      deleteCompany: function (company_deletion) {
        var dfd = $q.defer();
        var delete_ID = new nrgiCompaniesSrvc();
        delete_ID.id = company_deletion;
        delete_ID.$delete().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      }
    };
  }
]);angular.module('app').factory('nrgiConcessionsMethodSrvc', [
  '$q',
  'nrgiConcessionsSrvc',
  function ($q, nrgiConcessionsSrvc) {
    return {
      createConcession: function (new_concession_data) {
        var new_concession = new nrgiConcessionsSrvc(new_concession_data);
        var dfd = $q.defer();
        new_concession.$save().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      updateConcession: function (new_concession_data) {
        var dfd = $q.defer();
        new_concession_data.$update().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      deleteConcession: function (concession_deletion) {
        var dfd = $q.defer();
        var delete_ID = new nrgiConcessionsSrvc();
        delete_ID.id = concession_deletion;
        delete_ID.$delete().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      }
    };
  }
]);angular.module('app').factory('nrgiContentMethodSrvc', [
  '$q',
  function ($q) {
    return {
      updateContentPage: function (new_about_page_data) {
        var dfd = $q.defer();
        new_about_page_data.$update().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      }
    };
  }
]);angular.module('app').factory('nrgiContractsMethodSrvc', [
  '$q',
  'nrgiContractsSrvc',
  function ($q, nrgiContractsSrvc) {
    return {
      createContract: function (new_contract_data) {
        var new_contract = new nrgiContractsSrvc(new_contract_data);
        var dfd = $q.defer();
        new_contract.$save().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      deleteContract: function (contract_deletion) {
        var dfd = $q.defer();
        var delete_ID = new nrgiContractsSrvc();
        delete_ID.id = contract_deletion;
        delete_ID.$delete().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      updateContract: function (new_contract_data) {
        var dfd = $q.defer();
        new_contract_data.$update().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      }
    };
  }
]);  //'use strict';
     //
     //angular.module('app')
     //    .factory('nrgiContractsSrvc', function($http,$q) {
     //        return {
     //            getAllContracts:function(limit,skip) {
     //                var dfd = $q.defer();
     //                $http.get('/api/contracts/'+limit+"/"+skip).then(function (response) {
     //                    if(response.data) {
     //                        dfd.resolve(response.data);
     //                    } else {
     //                        dfd.resolve(false);
     //                    }
     //                });
     //                return dfd.promise;
     //            },
     //            getContractById:function(id) {
     //                var dfd = $q.defer();
     //                $http.get('/api/contract/'+id).then(function (response) {
     //                    if(response.data) {
     //                        dfd.resolve(response.data);
     //                    } else {
     //                        dfd.resolve(false);
     //                    }
     //                });
     //                return dfd.promise;
     //            }
     //        }
     //    });
'use strict';
angular.module('app').factory('nrgiCountriesMethodSrvc', [
  '$q',
  'nrgiCountriesSrvc',
  function ($q, nrgiCountriesSrvc) {
    return {
      createCountry: function (new_country_data) {
        var new_country = new nrgiCountriesSrvc(new_country_data);
        var dfd = $q.defer();
        new_country.$save().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      updateCountry: function (new_country_data) {
        var dfd = $q.defer();
        new_country_data.$update().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      deleteCountry: function (country_deletion) {
        var dfd = $q.defer();
        var delete_ID = new nrgiCountriesSrvc();
        delete_ID.id = country_deletion;
        delete_ID.$delete().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      }
    };
  }
]);'use strict';
angular.module('app').factory('nrgiDatasetActionMethodSrvc', [
  '$http',
  '$q',
  'nrgiDatasetActionSrvc',
  function ($http, $q, nrgiDatasetActionSrvc) {
    return {
      createAction: function (new_action_data) {
        var new_action = new nrgiDatasetActionSrvc(new_action_data);
        var dfd = $q.defer();
        new_action.$save().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      }
    };
  }
]);'use strict';
angular.module('app').factory('nrgiDatasetMethodSrvc', [
  '$http',
  '$q',
  'nrgiDatasetSrvc',
  function ($http, $q, nrgiDatasetSrvc) {
    return {
      createDataset: function (new_dataset_data) {
        var new_dataset = new nrgiDatasetSrvc(new_dataset_data);
        var dfd = $q.defer();
        new_dataset.$save().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      updateDataset: function (new_dataset_data) {
        var dfd = $q.defer();
        new_dataset_data.$update().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      createAction: function (new_action_data) {
        var new_action = new nrgiActionSrvc(new_action_data);
        var dfd = $q.defer();
        new_action.$save().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      deleteDataset: function (dataset_deletion) {
        var dfd = $q.defer();
        var delete_ID = new nrgiDatasetSrvc();
        delete_ID.id = dataset_deletion;
        delete_ID.$delete().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      }
    };
  }
]);angular.module('app').factory('nrgiGroupsMethodSrvc', [
  '$q',
  'nrgiGroupsSrvc',
  function ($q, nrgiGroupsSrvc) {
    return {
      createGroup: function (new_group_data) {
        var new_group = new nrgiGroupsSrvc(new_group_data);
        var dfd = $q.defer();
        new_group.$save().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      updateGroup: function (new_group_data) {
        var dfd = $q.defer();
        new_group_data.$update().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      deleteGroup: function (group_deletion) {
        var dfd = $q.defer();
        var delete_ID = new nrgiGroupsSrvc();
        delete_ID.id = group_deletion;
        delete_ID.$delete().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      }
    };
  }
]);angular.module('app').factory('nrgiMethodSrvc', [
  '$q',
  'nrgiCommoditiesSrvc',
  function ($q, nrgiCommoditiesSrvc) {
    //TODO combine methods into a single controller
    var getTypeSrvc = function (type) {
      var srvc;
      switch (type) {
      }
      return srvc;  // return function (response) {
                    //     dfd.reject(rgiHttpResponseProcessorSrvc.getMessage(response, 'Save answer failure'));
                    //     rgiHttpResponseProcessorSrvc.handle(response);
                    // };
    };
    return {
      create: function (new_data, type) {
        var new_data_load = new srvc(new_data);
        var dfd = $q.defer();
        new_data_load.$save().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      update: function (new_data) {
        var dfd = $q.defer();
        new_data.$update().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      deleteCommodity: function (deletion_id) {
        var dfd = $q.defer();
        var delete_ID = new srvc();
        delete_ID.id = deletion_id;
        delete_ID.$delete().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      }
    };
  }
]);angular.module('app').factory('nrgiProjectsMethodSrvc', [
  '$q',
  'nrgiProjectsSrvc',
  function ($q, nrgiProjectsSrvc) {
    return {
      createProject: function (new_project_data) {
        var new_project = new nrgiProjectsSrvc(new_project_data);
        var dfd = $q.defer();
        new_project.$save().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      updateProject: function (new_project_data) {
        var dfd = $q.defer();
        new_project_data.$update().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      deleteProject: function (project_deletion) {
        var dfd = $q.defer();
        var delete_ID = new nrgiProjectsSrvc();
        delete_ID.id = project_deletion;
        delete_ID.$delete().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      }
    };
  }
]);angular.module('app').factory('nrgiSitesMethodSrvc', [
  '$q',
  'nrgiSitesSrvc',
  function ($q, nrgiSitesSrvc) {
    return {
      createSite: function (new_site_data) {
        var new_site = new nrgiSitesSrvc(new_site_data);
        var dfd = $q.defer();
        new_site.$save().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      updateSite: function (new_site_data) {
        var dfd = $q.defer();
        new_site_data.$update().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      deleteSite: function (site_deletion) {
        var dfd = $q.defer();
        var delete_ID = new nrgiSitesSrvc();
        delete_ID.id = site_deletion;
        delete_ID.$delete().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      }
    };
  }
]);angular.module('app').factory('nrgiSourcesMethodSrvc', [
  '$q',
  'nrgiSourcesSrvc',
  function ($q, nrgiSourcesSrvc) {
    return {
      createSource: function (new_source_data) {
        var new_source = new nrgiSourcesSrvc(new_source_data);
        var dfd = $q.defer();
        new_source.$save().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      updateSource: function (new_source_data) {
        var dfd = $q.defer();
        new_source_data.$update().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      deleteSource: function (source_deletion) {
        var dfd = $q.defer();
        var delete_ID = new nrgiSourcesSrvc();
        delete_ID.id = source_deletion;
        delete_ID.$delete().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      }
    };
  }
]);angular.module('app').factory('nrgiSourceTypesMethodSrvc', [
  '$q',
  'nrgiSourceTypesSrvc',
  function ($q, nrgiSourceTypesSrvc) {
    return {
      createSourceType: function (new_sourceType_data) {
        var new_sourceType = new nrgiSourceTypesSrvc(new_sourceType_data);
        var dfd = $q.defer();
        new_sourceType.$save().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      updateSourceType: function (new_sourceType_data) {
        var dfd = $q.defer();
        new_sourceType_data.$update().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      deleteSourceType: function (sourceType_deletion) {
        var dfd = $q.defer();
        var delete_ID = new nrgiSourceTypesSrvc();
        delete_ID.id = sourceType_deletion;
        delete_ID.$delete().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      }
    };
  }
]);'use strict';
angular.module('app').factory('nrgiUserMethodSrvc', [
  '$http',
  '$q',
  'nrgiIdentitySrvc',
  'nrgiUserSrvc',
  function ($http, $q, nrgiIdentitySrvc, nrgiUserSrvc) {
    return {
      createUser: function (new_user_data) {
        var new_user = new nrgiUserSrvc(new_user_data);
        var dfd = $q.defer();
        new_user.$save().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      updateUser: function (new_user_data) {
        var dfd = $q.defer();
        new_user_data.$update().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },
      deleteUser: function (user_deletion) {
        var dfd = $q.defer();
        var delete_ID = new nrgiUserSrvc();
        delete_ID.id = user_deletion;
        delete_ID.$delete().then(function () {
          dfd.resolve();
        }, function (response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      }
    };
  }
]);'use strict';
angular.module('app').factory('nrgiAuthSrvc', [
  '$http',
  '$q',
  'nrgiIdentitySrvc',
  'nrgiUserSrvc',
  function ($http, $q, nrgiIdentitySrvc, nrgiUserSrvc) {
    return {
      authenticateUser: function (username, password) {
        var dfd = $q.defer();
        $http.post('/login', {
          username: username,
          password: password
        }).then(function (response) {
          if (response.data.success) {
            var user = new nrgiUserSrvc();
            angular.extend(user, response.data.user);
            nrgiIdentitySrvc.currentUser = user;
            dfd.resolve(true);
          } else {
            dfd.resolve(false);
          }
        });
        return dfd.promise;
      },
      logoutUser: function () {
        var dfd = $q.defer();
        $http.post('/logout', { logout: true }).then(function () {
          nrgiIdentitySrvc.currentUser = undefined;
          dfd.resolve();
        });
        return dfd.promise;
      },
      authorizeCurrentUserForRoute: function (role) {
        if (nrgiIdentitySrvc.isAuthorized(role)) {
          return true;
        } else {
          return $q.reject('not authorized');
        }
      },
      authorizeAuthenticatedUserForRoute: function () {
        if (nrgiIdentitySrvc.isAuthenticated()) {
          return true;
        } else {
          return $q.reject('not authorized');
        }
      }
    };
  }
]);'use strict';
angular.module('app').factory('nrgiCommoditiesSrvc', [
  '$resource',
  function ($resource) {
    var CommodityResource = $resource('/api/commodities/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return CommodityResource;
  }
]);'use strict';
angular.module('app').factory('nrgiCompaniesSrvc', [
  '$resource',
  function ($resource) {
    var CompanyResource = $resource('/api/companies/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return CompanyResource;
  }
]).factory('nrgiCompanyDataSrvc', [
  '$resource',
  function ($resource) {
    var CompanyResource = $resource('/api/companydata/:_id', { _id: '@id' }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return CompanyResource;
  }
]);'use strict';
angular.module('app').factory('nrgiConcessionsSrvc', [
  '$resource',
  function ($resource) {
    var ConcessionResource = $resource('/api/concessions/:limit/:skip/:data/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip',
        data: '@data'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return ConcessionResource;
  }
]).factory('nrgiConcessionDataSrvc', [
  '$resource',
  function ($resource) {
    var ConcessionResource = $resource('/api/concession/data/:_id', {
        _id: '@id',
        data: '@data'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return ConcessionResource;
  }
]);'use strict';
angular.module('app').factory('nrgiAboutPageContentSrvc', [
  '$resource',
  function ($resource) {
    var ContentResource = $resource('/api/about', {}, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return ContentResource;
  }
]).factory('nrgiGlossaryPageContentSrvc', [
  '$resource',
  function ($resource) {
    var ContentResource = $resource('/api/glossary', {}, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return ContentResource;
  }
]).factory('nrgiLandingPageContentSrvc', [
  '$resource',
  function ($resource) {
    var ContentResource = $resource('/api/landing', {}, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return ContentResource;
  }
]);'use strict';
angular.module('app').factory('nrgiContractsSrvc', [
  '$resource',
  function ($resource) {
    var ContractResource = $resource('/api/contracts/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return ContractResource;
  }
]);'use strict';
angular.module('app').factory('nrgiCountriesSrvc', [
  '$resource',
  function ($resource) {
    var CountriesResource = $resource('/api/countries/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return CountriesResource;
  }
]).factory('nrgiCountryCommoditiesSrvc', [
  '$resource',
  function ($resource) {
    var CountriesResource = $resource('/api/countrycommodity/:_id', { _id: '@id' }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return CountriesResource;
  }
]);'use strict';
angular.module('app').factory('nrgiDatasetActionSrvc', [
  '$resource',
  function ($resource) {
    var DatasetActionResource = $resource('/api/datasets/:_id/actions', { _id: '@id' }, {
        save: {
          method: 'POST',
          isArray: false
        }
      });
    return DatasetActionResource;
  }
]);'use strict';
angular.module('app').factory('nrgiDatasetSrvc', [
  '$resource',
  function ($resource) {
    var DatasetResource = $resource('/api/datasets/:_id', { _id: '@id' }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        },
        save: {
          method: 'POST',
          isArray: false
        }
      });
    return DatasetResource;
  }
]);'use strict';
angular.module('app').factory('nrgiDestroySrvc', [
  '$resource',
  function ($resource) {
    var DestroyResource = $resource('/api/destroy', {}, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return DestroyResource;
  }
]);'use strict';
angular.module('app').factory('nrgiDuplicatesSrvc', [
  '$resource',
  function ($resource) {
    var DuplicateResource = $resource('/api/duplicates/:type/:limit/:skip/:id/:action', {
        id: '@id',
        action: '@action',
        limit: '@limit',
        skip: '@skip',
        type: '@type'
      }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return DuplicateResource;
  }
]).factory('nrgiResolveSrvc', [
  '$resource',
  function ($resource) {
    var DuplicateResource = $resource('/api/resolve/:type', { type: '@type' }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return DuplicateResource;
  }
]);'use strict';
angular.module('app').factory('nrgiGroupsSrvc', [
  '$resource',
  function ($resource) {
    var GroupResource = $resource('/api/companyGroups/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return GroupResource;
  }
]).factory('nrgiGroupDataSrvc', [
  '$resource',
  function ($resource) {
    var GroupResource = $resource('/api/companyGroupData/:_id', { _id: '@id' }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return GroupResource;
  }
]);'use strict';
angular.module('app').factory('nrgiIdentitySrvc', [
  '$window',
  'nrgiUserSrvc',
  function ($window, nrgiUserSrvc) {
    var currentUser;
    // bootstrapped object to keep session alive
    if (!!$window.bootstrappedUserObject) {
      currentUser = new nrgiUserSrvc();
      angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
      currentUser: currentUser,
      isAuthenticated: function () {
        return !!this.currentUser;
      },
      isAuthorized: function (role) {
        return !!this.currentUser && this.currentUser.role.indexOf(role) > -1;
      }  // user id test
    };
  }
]);'use strict';
angular.module('app').factory('nrgiLastAddedSrvc', [
  '$resource',
  function ($resource) {
    var LastAddedResource = $resource('/api/last_added', {}, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return LastAddedResource;
  }
]);'use strict';
angular.module('app').factory('nrgiCountryCoordinatesSrvc', [
  '$resource',
  function ($resource) {
    var CountriesResource = $resource('/api/coordinate/:type/:_id', {
        _id: '@id',
        type: '@type'
      }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return CountriesResource;
  }
]).factory('nrgiMainMapSrvc', [
  '$resource',
  function ($resource) {
    var CountriesResource = $resource('/api/main_map/', {}, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return CountriesResource;
  }
]).factory('nrgiTreeMapSrvc', [
  '$resource',
  function ($resource) {
    var CountriesResource = $resource('/api/treemap/', {}, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return CountriesResource;
  }
]);'use strict';
angular.module('app').factory('nrgiProjectsSrvc', [
  '$resource',
  function ($resource) {
    var ProjectResource = $resource('/api/projects/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return ProjectResource;
  }
]).factory('nrgiAllProjectsSrvc', [
  '$resource',
  function ($resource) {
    var ProjectResource = $resource('/api/all_projects/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return ProjectResource;
  }
]).factory('nrgiProjectDataSrvc', [
  '$resource',
  function ($resource) {
    var ProjectResource = $resource('/api/project/data/:_id', { _id: '@id' }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return ProjectResource;
  }
]);  //.factory('nrgiProjectsWithIsoSrvc', function($resource) {
     //    var ProjectResource = $resource('/api/projects/:_iso2/:limit/:skip', {_iso2: "@iso2", limit: "@limit", skip: "@skip"}, {
     //        query:  {method:'GET', isArray: false},
     //        update: {method: 'PUT', isArray: false}
     //    });
     //
     //    return ProjectResource;
     //});
'use strict';
angular.module('app').factory('nrgiCommoditiesSrvc', [
  '$resource',
  function ($resource) {
    var CommodityResource = $resource('/api/commodities/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return CommodityResource;
  }
]).factory('nrgiCompaniesSrvc', [
  '$resource',
  function ($resource) {
    var CompanyResource = $resource('/api/companies/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return CompanyResource;
  }
]).factory('nrgiCompanyDataSrvc', [
  '$resource',
  function ($resource) {
    var CompanyResource = $resource('/api/companydata/:_id', { _id: '@id' }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return CompanyResource;
  }
]).factory('nrgiConcessionsSrvc', [
  '$resource',
  function ($resource) {
    var ConcessionResource = $resource('/api/concessions/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return ConcessionResource;
  }
]).factory('nrgiContractsSrvc', [
  '$resource',
  function ($resource) {
    var ContractResource = $resource('/api/contracts/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return ContractResource;
  }
]).factory('nrgiCountriesSrvc', [
  '$resource',
  function ($resource) {
    var CountriesResource = $resource('/api/countries/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return CountriesResource;
  }
]).factory('nrgiCountryCommoditiesSrvc', [
  '$resource',
  function ($resource) {
    var CountriesResource = $resource('/api/countrycommodity/:_id', { _id: '@id' }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return CountriesResource;
  }
]).factory('nrgiCountryCoordinatesSrvc', [
  '$resource',
  function ($resource) {
    var CountriesResource = $resource('/api/coordinate/:type/:_id', {
        _id: '@id',
        type: '@type'
      }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return CountriesResource;
  }
]).factory('nrgiDatasetSrvc', [
  '$resource',
  function ($resource) {
    var DatasetResource = $resource('/api/datasets/:_id', { _id: '@id' }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        },
        save: {
          method: 'POST',
          isArray: false
        }
      });
    return DatasetResource;
  }
]).factory('nrgiDatasetActionSrvc', [
  '$resource',
  function ($resource) {
    var DatasetActionResource = $resource('/api/datasets/:_id/actions', { _id: '@id' }, {
        save: {
          method: 'POST',
          isArray: false
        }
      });
    return DatasetActionResource;
  }
]).factory('nrgiGroupsSrvc', [
  '$resource',
  function ($resource) {
    var GroupResource = $resource('/api/companyGroups/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return GroupResource;
  }
]).factory('nrgiGroupDataSrvc', [
  '$resource',
  function ($resource) {
    var GroupResource = $resource('/api/companyGroupData/:_id', { _id: '@id' }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return GroupResource;
  }
]).factory('nrgiProjectsSrvc', [
  '$resource',
  function ($resource) {
    var ProjectResource = $resource('/api/projects/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return ProjectResource;
  }
]).factory('nrgiSitesSrvc', [
  '$resource',
  function ($resource) {
    var SiteResource = $resource('/api/sites/:limit/:skip/:map/:field/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip',
        field: '@field',
        map: '@map'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return SiteResource;
  }
]).factory('nrgiSourcesSrvc', [
  '$resource',
  function ($resource) {
    var SourceResource = $resource('/api/sources/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return SourceResource;
  }
]).factory('nrgiSourceTypesSrvc', [
  '$resource',
  function ($resource) {
    var SourceTypeResource = $resource('/api/sourcetypes/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return SourceTypeResource;
  }
]).factory('nrgiTransfersSrvc', [
  '$resource',
  function ($resource) {
    var TransferResource = $resource('/api/transfers/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return TransferResource;
  }
]);'use strict';
angular.module('app').factory('nrgiSitesSrvc', [
  '$resource',
  function ($resource) {
    var SiteResource = $resource('/api/sites/:limit/:skip/:map/:data/:field/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip',
        field: '@field',
        map: '@map',
        data: '@data'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return SiteResource;
  }
]);'use strict';
angular.module('app').factory('nrgiSourcesSrvc', [
  '$resource',
  function ($resource) {
    var SourceResource = $resource('/api/sources/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return SourceResource;
  }
]);'use strict';
angular.module('app').factory('nrgiSourceTypesSrvc', [
  '$resource',
  function ($resource) {
    var SourceTypeResource = $resource('/api/sourcetypes/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return SourceTypeResource;
  }
]);'use strict';
angular.module('app').factory('nrgiPaymentsSrvc', [
  '$resource',
  function ($resource) {
    var PaymentsResource = $resource('/api/transfers', {}, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return PaymentsResource;
  }
]).factory('nrgiPieChartSrvc', [
  '$resource',
  function ($resource) {
    var TransferResource = $resource('/api/pie_chart', {}, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return TransferResource;
  }
]).factory('nrgiPaymentsByGovSrvc', [
  '$resource',
  function ($resource) {
    var PaymentsByGov = $resource('/api/transfers_by_gov', {}, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return PaymentsByGov;
  }
]);'use strict';
angular.module('app').factory('nrgiTablesSrvc', [
  '$resource',
  function ($resource) {
    var CompanyTableResource = $resource('/api/company_table/:type/:_id/:limit/:skip', {
        _id: '@id',
        type: '@type',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return CompanyTableResource;
  }
]).factory('nrgiProjectTablesSrvc', [
  '$resource',
  function ($resource) {
    var ProjectTableResource = $resource('/api/project_table/:type/:_id/:limit/:skip', {
        _id: '@id',
        type: '@type',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return ProjectTableResource;
  }
]).factory('nrgiProdTablesSrvc', [
  '$resource',
  function ($resource) {
    var ProdTableResource = $resource('/api/prod_table/:type/:_id/:limit/:skip', {
        _id: '@id',
        type: '@type',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return ProdTableResource;
  }
]).factory('nrgiTransferTablesSrvc', [
  '$resource',
  function ($resource) {
    var TransferTableResource = $resource('/api/transfer_table/:type/:_id/:limit/:skip', {
        _id: '@id',
        type: '@type',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return TransferTableResource;
  }
]).factory('nrgiSourceTablesSrvc', [
  '$resource',
  function ($resource) {
    var SourceTableResource = $resource('/api/source_table/:type/:_id', {
        _id: '@id',
        type: '@type'
      }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return SourceTableResource;
  }
]).factory('nrgiSiteFieldTablesSrvc', [
  '$resource',
  function ($resource) {
    var SiteFieldTableResource = $resource('/api/site_table/:type/:_id/:limit/:skip', {
        _id: '@id',
        type: '@type',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return SiteFieldTableResource;
  }
]).factory('nrgiContractTablesSrvc', [
  '$resource',
  function ($resource) {
    var ContractTableResource = $resource('/api/contract_table/:type/:_id', {
        _id: '@id',
        type: '@type'
      }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return ContractTableResource;
  }
]).factory('nrgiConcessionTablesSrvc', [
  '$resource',
  function ($resource) {
    var ConcessionTableResource = $resource('/api/concession_table/:type/:_id/:limit/:skip', {
        _id: '@id',
        type: '@type',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return ConcessionTableResource;
  }
]);'use strict';
angular.module('app').factory('nrgiTransfersSrvc', [
  '$resource',
  function ($resource) {
    var TransferResource = $resource('/api/transfers/:limit/:skip/:_id', {
        _id: '@id',
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return TransferResource;
  }
]).factory('nrgiTransfersByGovSrvc', [
  '$resource',
  function ($resource) {
    var TransferResource = $resource('/api/transfersGov/:limit/:skip', {
        limit: '@limit',
        skip: '@skip'
      }, {
        query: {
          method: 'GET',
          isArray: false
        },
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    return TransferResource;
  }
]).factory('nrgiTransferFilters', [
  '$resource',
  function ($resource) {
    var TransferResource = $resource('/api/transfer_filters/:country', { country: '@country' }, {
        query: {
          method: 'GET',
          isArray: false
        }
      });
    return TransferResource;
  }
]);'use strict';
angular.module('app').factory('nrgiUserListSrvc', [
  '$resource',
  function ($resource) {
    var UserResource = $resource('/api/user-list/:_id', { _id: '@id' }, {});
    return UserResource;
  }
]);'use strict';
angular.module('app').factory('nrgiUserSrvc', [
  '$resource',
  function ($resource) {
    var UserResource = $resource('/api/users/:_id', { _id: '@id' }, {
        update: {
          method: 'PUT',
          isArray: false
        }
      });
    // add role features to resource
    UserResource.prototype.isSupervisor = function () {
      return this.roles && this.roles.indexOf('supervisor') > -1;
    };
    UserResource.prototype.isReviewer = function () {
      return this.roles && this.roles.indexOf('reviewer') > -1;
    };
    UserResource.prototype.isResearcher = function () {
      return this.roles && this.roles.indexOf('researcher') > -1;
    };
    return UserResource;
  }
]);'use strict';
angular.module('app').controller('nrgiAboutCtrl', [
  '$scope',
  'nrgiAboutPageContentSrvc',
  function ($scope, nrgiAboutPageContentSrvc) {
    nrgiAboutPageContentSrvc.get(function (success) {
      $scope.content = success;
    }, function (error) {
    });
  }
]);'use strict';
angular.module('app').controller('nrgiGlossaryCtrl', [
  '$scope',
  'nrgiGlossaryPageContentSrvc',
  function ($scope, nrgiGlossaryPageContentSrvc) {
    nrgiGlossaryPageContentSrvc.get(function (success) {
      $scope.content = success;
    }, function (error) {
    });
  }
]);