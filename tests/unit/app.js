angular.module('app', ['angular.filter','ngResource', 'ngRoute','angularSpinner'])
    .run(function($templateCache) {
        $templateCache.put('/partials/directives/templates/nrgi-transfer-table','<button type="button" data-toggle="collapse" ng-click="openClose=!openClose; getTransfers(id,type)" data-target="#transfers" class="btn btn-primary-outline btn-block"><h4 class="text-justify">Payments</h4></button><div id="transfers" class="panel-collapse collapse in"> <table ng-class="transfers.length &gt;= 8 ? \'header-fixed\' : \'\'" ts-wrapper="ts-wrapper" width="100%" height="100%" id="transfer-info" class="load_table table table-striped projects"> <thead><tr> <th ts-criteria="transfer_year|parseInt" class="tablesort-sortable-th">Year</th> <th ng-if="project==true" ts-criteria="project.project_name" class="tablesort-sortable-th">Project</th><th ts-criteria="company.company_name" class="tablesort-sortable-th">Paid by</th> <th ng-if="project!=true" ts-criteria="country.name" class="tablesort-sortable-th">Paid to</th> <th ts-criteria="transfer_type" class="tablesort-sortable-th">Payment Type</th> <th ts-criteria="transfer_unit" class="tablesort-sortable-th">Currency</th> <th ts-criteria="transfer_value|parseInt" class="text-center tablesort-sortable-th">Value</th> <th ts-criteria="transfer_level" class="tablesort-sortable-th">Level</th><th ts-criteria="transfer_audit_type" class="tablesort-sortable-th">Payment or receipt?</th><th ng-if="projectlink==true" ts-criteria="transfer_links.name" class="tablesort-sortable-th">Projects and Sites</th> </tr></thead><tbody>     <tr ng-repeat="transfer in transfers" ts-repeat="ts-repeat" ng-class="expression"> <td class="transfer_year">{{transfer.transfer_year}}</td><td class="transfer_company"><a href="company/{{transfer.company._id}}"><span ng-bind-html="transfer.company.company_name|sanitize"></span></a></td><td ng-if="project==true" class="transfer_project"><a href="project/{{transfer.transfer_company._id}}"><span ng-bind-html="transfer.transfer_company.company_name|sanitize"></span></a></td><td ng-if="project!=true" class="transfer_country"><a href="country/{{transfer.country.iso2}}"><span ng-bind-html="transfer.country.name|sanitize"></span></a></td><td class="transfer_type">{{transfer.transfer_type}}</td><td class="transfer_unit">{{transfer.transfer_unit}}</td><td class="text-right transfer_value">{{transfer.transfer_value | number}}</td><td class="transfer_level">{{transfer.transfer_level}}</td><td class="transfer_audit_type">{{transfer.transfer_audit_type | addSpaces}}</td><td ng-if="projectlink===true" class="project_links"></td></tr></tbody></table><div ng-if="transfers.length&gt;0"><div class="download"><span aria-hidden="true" class="glyphicon glyphicon-download"></span><span> Download: <a href="" ng-csv="csv_transfers" csv-header="getHeaderTransfers()" filename="payments.csv">Payments CSV</a></span></div></div></div>');
        $templateCache.put('/partials/directives/templates/nrgi-production-table','<button type="button" data-toggle="collapse" ng-click="openClose=!openClose; getProduction(id,type)" data-target="#productions" class="btn btn-primary-outline btn-block"><h4 class="text-justify">Production Stats</h4></button><div id="productions" class="panel-collapse collapse in"><table ts-wrapper="ts-wrapper" ng-class="production.length &gt;= 8 ? \'header-fixed\' : \'\'" id="transfer-info" class="load_table table table-striped projects"><thead><tr><th ts-criteria="production_year|parseInt" class="tablesort-sortable-th">Year</th><th ts-criteria="production_volume" class="text-right tablesort-sortable-th">Volume</th><th ts-criteria="production_unit" class="tablesort-sortable-th">Unit</th><th ts-criteria="production_commodity.commodity_name" class="tablesort-sortable-th">Commodity</th><th ts-criteria="production_price|parseInt" class="text-right tablesort-sortable-th">Price</th><th ts-criteria="production_price_unit" class="text-right tablesort-sortable-th">Price unit</th><th ts-criteria="production_level" class="text-center tablesort-sortable-th">Level</th><th ng-if="projectlink==true" ts-criteria="production_links.name" class="tablesort-sortable-th">Projects and Sites</th></tr></thead><tbody><tr ng-repeat="prod in production" ts-repeat="ts-repeat" ng-class="expression"><td class="production_year">{{prod.production_year}}</td><td class="text-right production_volume"> {{prod.production_volume | number}}</td><td class="production_unit">{{prod.production_unit}}</td><td class="production_commodity"><a href="commodity/{{prod.production_commodity.commodity_id}}"><span ng-bind-html="prod.production_commodity.commodity_name|sanitize"></span></a></td><td class="text-right production_price"><text ng-if="prod.production_price">{{prod.production_price}}</text><em ng-if="!prod.production_price">..</em></td><td class="text-right production_price_per_unit">{{prod.production_price_unit}}<text ng-if="prod.production_price">{{prod.production_price_unit}}</text><em ng-if="!prod.production_price">..</em></td><td class="text-center production_level">{{prod.production_level}}</td><td ng-if="projectlink===true" class="project_links"><a href="{{prod.proj_site.type}}/{{prod.proj_site._id}}"><span ng-bind-html="prod.proj_site.name|sanitize"></span></a></td></tr></tbody></table><div ng-if="production.length&gt;0"><div class="download"><span aria-hidden="true" class="glyphicon glyphicon-download"></span><span> Download: <a href="" ng-csv="csv_production" csv-header="getHeaderProduction()" filename="productions.csv">Production Stats CSV</a></span></div></div></div>');
        $templateCache.put('/partials/directives/templates/nrgi-company-of-operation-table','<button type="button" data-toggle="collapse" ng-click="openClose=!openClose;getCompanyOperation(id,type)" data-target="#companies_operation" class="btn btn-primary-outline btn-block"><h4 class="text-justify">Companies Operating In</h4></button><div id="companies_operation" class="panel-collapse collapse in"><table ng-class="companies.length &gt;= 8 ? \'header-fixed\' : \'\'" ts-wrapper="ts-wrapper" id="company-info" class="load_table table table-striped companies"><thead><tr><th ts-criteria="company_name" class="tablesort-sortable-th">Name</th><th ng-if="group==true" ts-criteria="company_groups[company_groups.length-1].company_group_name" class="tablesort-sortable-th">Group</th><th ng-if="stake==true" class="tablesort-sortable-th">Stake</th></tr></thead><tbody>{{company_of_operation}}<tr ng-repeat="company in companies" ts-repeat="ts-repeat" ng-class="expression"><td class="company_name"><a href="company/{{company._id}}"><span ng-bind-html="company.company_name|sanitize"></span></a></td><td ng-if="group==true" class="company_groups"><text ng-repeat="group in company.company_groups | unique: \'_id\'"><a href="group/{{ group._id }}"><span ng-bind-html="group.company_group_name|sanitize"></span></a>{{$last ? \'\' : \', \'}}</text></td><td ng-if="stake==true" class="company_stake">{{company.stake}}</td></tr></tbody></table><div ng-if="companies.length&gt;0"><div class="download"><span aria-hidden="true" class="glyphicon glyphicon-download"></span><span> Download:</span> <a href="" ng-csv="csv_company" csv-header="getHeaderCompany()" filename="companies.csv">Companies CSV</a></div></div></div>');
        $templateCache.put('/partials/directives/templates/nrgi-company-table','<button type="button" data-toggle="collapse" ng-click="openClose=!openClose; getCompany(id,type)" data-target="#companies" class="btn btn-primary-outline btn-block"><h4 ng-if="incorporated!=true &amp;&amp; operation!=true" class="text-justify">Companies</h4><h4 ng-if="incorporated==true" class="text-justify">Companies Incorporated</h4></button><div id="companies" class="panel-collapse collapse in"><table ng-class="companies.length &gt;= 8 ? \'header-fixed\' : \'\'" ts-wrapper="ts-wrapper" id="company-info" class="load_table table table-striped companies"><thead><tr><th ts-criteria="company_name" class="tablesort-sortable-th">Name</th><th ng-if="group==true" ts-criteria="company_groups[company_groups.length-1].company_group_name" class="tablesort-sortable-th">Group</th><th ng-if="stake==true" class="tablesort-sortable-th">Stake</th></tr></thead><tbody><tr ng-repeat="company in companies | unique:\'_id\'" ts-repeat="ts-repeat" ng-class="expression"><td class="company_name"><a href="company/{{company._id}}"><span ng-bind-html="company.company_name|sanitize"></span></a></td><td ng-if="group==true" class="company_groups"><text ng-repeat="group in company.company_groups | unique: \'_id\'"><a href="group/{{ group._id }}"><span ng-bind-html="group.company_group_name|sanitize"></span></a>{{$last ? \'\' : \', \'}}</text></td><td ng-if="stake==true &amp;&amp; !company.stake" class="company_stake"></td><td ng-if="stake==true &amp;&amp; company.stake" class="company_stake">{{company.stake.share*100}}%<em ng-if="company.stake.timestamp"><small> (True at: {{company.stake.timestamp|date:\'yyyy-MM-dd\'}})</small></em></td></tr></tbody></table><div ng-if="companies.length&gt;0"><div class="download"><span aria-hidden="true" class="glyphicon glyphicon-download"></span><span> Download: <a href="" ng-csv="csv_company" csv-header="getHeaderCompany()" filename="companies.csv">Companies CSV</a></span></div></div></div>');
        $templateCache.put('/partials/directives/templates/nrgi-concession-table','<button type="button" data-toggle="collapse" ng-click="openClose=!openClose; getConcessions(id,name)" data-target="#concessions" class="btn btn-primary-outline btn-block"><h4 class="text-justify">Concessions</h4></button><div id="concessions" class="panel-collapse collapse in"><table ts-wrapper="ts-wrapper" ng-class="concessions.length &gt;= 8 ? \'header-fixed\' : \'\'" id="concessions-info" class="load_table table table-striped concessions"><thead><tr><th ts-criteria="concession_name" class="tablesort-sortable-th">Name</th><th ng-if="country==true" ts-criteria="concession_country.name" class="tablesort-sortable-th">Country</th><th ng-if="type==true" ts-criteria="concession_type.string" class="tablesort-sortable-th">Commodity Type</th><th ng-if="commodity==true" ts-criteria="concession_commodities[concession_commodities.length-1].commodity.commodity_name" class="tablesort-sortable-th">Commodity</th><th ng-if="status==true" ts-criteria="count|parseInt" class="tablesort-sortable-th">Status</th><th ng-if="projects==true" ts-criteria="projects|parseInt" class="tablesort-sortable-th">No. Projects</th></tr></thead><tbody><tr ng-repeat="concession in concessions | unique: \'_id\'" ts-repeat="ts-repeat" ng-class="expression"><td class="concession_name"><a href="/concession/{{concession._id}}"><span ng-bind-html="concession.concession_name|sanitize"></span></a></td><td ng-if="country==true" class="concession_country"><a href="/country/{{concession.concession_country.iso2}}"><span ng-bind-html="concession.concession_country.name|sanitize"></span></a></td><td ng-if="type==true" class="concession_type"><text ng-repeat="commodity in concession.concession_commodities | unique: \'commodity.commodity_type\'">{{commodity.commodity.commodity_type| ucfirst}}{{$last ? \'\' : \', \'}}</text></td><td ng-if="commodity==true" class="concession_commodity"><text ng-repeat="commodity in concession.concession_commodities | unique: \'commodity._id\'"><a href="commodity/{{commodity.commodity.commodity_id}}"><span ng-bind-html="commodity.commodity.commodity_name|sanitize"></span></a>{{$last ? \'\' : \', \'}}</text></td><td ng-if="status==true" class="concession_status"><text ng-repeat="status in concession.concession_status" ng-if="concession.concession_status.length &gt; 0"><text ng-if="$last">{{status.string | ucfirst}}<text class="small"> (true at {{status.timestamp | date:\'MM/dd/yyyy @ h:mma\' : timezone}})</text></text></text></td><td class="concession_projects">{{concession.projects}}</td></tr></tbody></table><div ng-if="concessions.length&gt;0"><div class="download"><span aria-hidden="true" class="glyphicon glyphicon-download"></span><span> Download: <a href="" ng-csv="csv_concessions" csv-header="getHeaderConcessions()" filename="companies.csv">Concessions CSV</a></span></div></div></div>');
        $templateCache.put('/partials/directives/templates/nrgi-contract-table','<button type="button" data-toggle="collapse" ng-click="openClose=!openClose; getContracts(id,type)" data-target="#contracts" class="btn btn-primary-outline btn-block"><h4 class="text-justify">Contracts</h4></button><div id="contracts" class="panel-collapse collapse in"><table ts-wrapper="ts-wrapper" ng-class="contracts.length &gt;= 8 ? \'header-fixed\' : \'\'" id="contract-info" class="load_table table table-striped projects"><thead><tr><th ng-if="companies!=true" ts-criteria="contract_name" class="tablesort-sortable-th">Name</th><th ng-if="companies==true" ts-criteria="_id" class="tablesort-sortable-th">RC-ID</th><th ng-if="country==true" ts-criteria="contract_country.code" class="tablesort-sortable-th">Country</th><th ng-if="commodity==true" ts-criteria="contract_commodity.toString()" class="tablesort-sortable-th">Commodity</th><th ng-if="companies!=true" ts-criteria="_id" class="tablesort-sortable-th">RC-ID</th><th ng-if="companies==true" ts-criteria="companies" class="tablesort-sortable-th">Companies</th></tr></thead><tbody><tr ng-repeat="contract in contracts | unique: \'_id\'" ts-repeat="ts-repeat" ng-class="expression"><td ng-if="companies!=true" class="contract_name"><a href="/contract/{{contract.contract_id}}">{{contract.contract_name}}</a></td><td ng-if="companies==true" class="contract_rc_id"><a href="/contract/{{contract._id}}">{{contract._id}}</a></td><td ng-if="country==true" class="contract_country"><a href="/country/{{contract.contract_country.code}}"><span ng-bind-html="contract.contract_country.name|sanitize"></span></a></td><td ng-if="commodity==true" class="contract_commodity_name"><text ng-if="contract.commodity.length&gt;0" ng-repeat="commodity in contract.commodity"><a href="/commodity/{{commodity.commodity_id}}"><span ng-bind="commodity.commodity_name|sanitize"></span></a>{{$last ? \'\' : \', \'}}</text><text ng-if="!contract.commodity.length&gt;0"><span ng-bind="contract.contract_commodity.toString()"></span></text></td><td ng-if="companies!=true" class="contract_rc_id"><a target="_blank" href="http://www.resourcecontracts.org/contract/{{contract.contract_id}}">{{contract.contract_id}}</a></td><td ng-if="companies==true" class="contract_companies">{{contract.companies}}</td></tr></tbody></table><div ng-if="contracts.length&gt;0"><div class="download"><span aria-hidden="true" class="glyphicon glyphicon-download"></span><span> Download: <a href="" ng-csv="csv_contracts" csv-header="getHeaderContracts()" filename="contracts.csv">Contracts CSV</a></span></div></div></div>');
        $templateCache.put('/partials/directives/templates/nrgi-leaflet','<div ng-if="data_loading" class="row"><h2 class="text-center">Data Loading</h2><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div><leaflet center="center" controls="controls" markers="location" tiles="tiles" height="height" paths="paths" ng-if="show!=false"></leaflet>');
        $templateCache.put('/partials/directives/templates/nrgi-project-table','<button type="button" data-toggle="collapse" ng-click="openClose=!openClose; getProjects(id,type)" data-target="#projects" class="btn btn-primary-outline btn-block"><h4 class="text-justify">Projects</h4></button><div id="projects" class="panel-collapse collapse in"><table ts-wrapper="ts-wrapper" ng-class="projects.length &gt;= 8 ? \'header-fixed\' : \'\'" width="100%" height="100%" class="load_table table table-striped projects"><thead><tr><th ts-criteria="proj_name" class="tablesort-sortable-th">Name</th><th ng-if="country==true" ts-criteria="proj_country[proj_country.length - 1].country.name" class="tablesort-sortable-th">Country</th><th ng-if="commoditytype==true" ts-criteria="proj_type[proj_type.length - 1].string" class="tablesort-sortable-th">Commodity Type</th><th ng-if="commodity==true" ts-criteria="proj_commodity[proj_commodity.length - 1].commodity.commodity_name" class="tablesort-sortable-th">Commodity</th><th ng-if="status==true" ts-criteria="proj_status[proj_status.length - 1].string" class="tablesort-sortable-th">Status</th><th ng-if="companies==true" ts-criteria="companies|parseInt" class="text-center tablesort-sortable-th">Companies</th></tr></thead><tbody><tr ng-repeat="project in projects | unique: \'_id\'" ts-repeat="ts-repeat" ng-class="expression"><td class="proj_id"><a href="project/{{project.proj_id}}"><span ng-bind-html="project.proj_name|sanitize"></span></a></td><td ng-if="country==true" class="proj_country"><text ng-repeat="country in project.proj_country | unique: \'country._id\'"><a href="country/{{country.country.iso2}}"><span ng-bind-html="country.country.name|sanitize"></span></a>{{$last ? \'\' : \', \'}}</text></td><td ng-if="commoditytype==true" class="proj_commodity_type"><text ng-repeat="commodity in project.proj_commodity | unique: \'commodity.commodity_type\'">{{commodity.commodity.commodity_type | ucfirst | addSpaces}}{{$last ? \'\' : \', \'}}</text></td><td ng-if="commodity==true" class="proj_commodity"><text ng-repeat="commodity in project.proj_commodity | unique: \'commodity._id\'"><a href="commodity/{{commodity.commodity.commodity_id}}"><span ng-bind-html="commodity.commodity.commodity_name|sanitize"></span></a>{{$last ? \'\' : \', \'}}</text></td><td ng-if="status==true" class="proj_status"><em ng-if="project.proj_status.length&lt;1">..</em><text ng-if="project.proj_status.length&gt;0" ng-repeat="status in project.proj_status"><text ng-if="$last">{{status.string | ucfirst}}<text ng-if="status.timestamp" class="small"> (true at {{status.timestamp | date:\'MM/dd/yyyy @ h:mma\' : timezone}})</text></text></text></td><td ng-if="companies==true" class="text-center">{{project.companies}}</td></tr></tbody></table><div ng-if="projects.length&gt;0"><div class="download"><span aria-hidden="true" class="glyphicon glyphicon-download"></span><span> Download: <a href="" ng-csv="csv_project" csv-header="getHeaderProjects()" filename="projects.csv">Projects CSV</a></span></div></div></div>');
        $templateCache.put('/partials/directives/templates/nrgi-site-table','<button type="button" data-toggle="collapse" ng-click="openClose=!openClose; getSites(id,name)" data-target="#sites" class="btn btn-primary-outline btn-block"><h4 class="text-justify">Sites and Fields</h4></button><div id="sites" class="panel-collapse collapse in"><table ts-wrapper="ts-wrapper" ng-class="sites.length &gt;= 8 ? \'header-fixed\' : \'\'" id="site-info" class="load_table table table-striped sites"><thead><tr><th ts-criteria="site_name" class="tablesort-sortable-th">Name</th><th ng-if="type==true" ts-criteria="site.field" class="tablesort-sortable-th">Type</th><th ng-if="country==true" ts-criteria="site_country[site_country.length - 1].country.name" class="tablesort-sortable-th">Country</th><th ng-if="commoditytype==true" ts-criteria="site_commodity[site_commodity.length - 1].commodity.commodity_type" class="tablesort-sortable-th">Commodity Type</th><th ng-if="commodity==true" ts-criteria="site_commodity[site_commodity.length - 1].commodity.commodity_name" class="tablesort-sortable-th">Commodity</th><th ng-if="status==true" ts-criteria="site_status[site_status.length - 1].string" class="tablesort-sortable-th">Status</th><th ng-if="company==true" ts-criteria="site_status[site_status.length - 1].string" class="tablesort-sortable-th">Companies</th></tr></thead><tbody><tr ng-repeat="site in sites" ts-repeat="ts-repeat" ng-class="expression"><td class="site_id"><a ng-if="site.field" href="field/{{site._id}}"><span ng-bind-html="site.site_name|sanitize"></span></a><a ng-if="!site.field" href="site/{{site._id}}"><span ng-bind-html="site.site_name|sanitize"></span></a></td><td ng-if="type==true" class="site_country"><text ng-if="site.field">field</text><text ng-if="!site.field">site</text></td><td ng-if="country==true" class="site_country"><text ng-repeat="country in site.site_country | unique: \'country._id\'"><a href="country/{{country.country.iso2}}"><span ng-bind-html="country.country.name|sanitize"></span></a>{{$last ? \'\' : \', \'}}</text></td><td ng-if="commoditytype==true" class="site_type"><text ng-repeat="commodity in site.site_commodity | unique: \'commodity.commodity_type\'">{{commodity.commodity.commodity_type | ucfirst | addSpaces}}{{$last ? \'\' : \', \'}}</text></td><td ng-if="commodity==true" class="site_commodity"><text ng-repeat="commodity in site.site_commodity | unique: \'commodity._id\'"><a href="commodity/{{commodity.commodity.commodity_id}}"><span ng-bind-html="commodity.commodity.commodity_name|sanitize"></span></a>{{$last ? \'\' : \', \'}}</text></td><td ng-if="status==true" class="site_status"><text ng-repeat="status in site.site_status"><text ng-if="$last">{{status.string | ucfirst}}</text><text class="small"> (true at {{status.timestamp | date:\'MM/dd/yyyy @ h:mma\' : timezone}})</text></text></td><td ng-if="company==true" class="site_status">{{site.companies}}</td></tr></tbody></table><div ng-if="sites.length&gt;0"><div class="download"><span aria-hidden="true" class="glyphicon glyphicon-download"></span><span> Download: <a href="" ng-csv="csv_site" csv-header="getHeaderSites()" filename="sites.csv">Site and Fields CSV</a></span></div></div></div>');
        $templateCache.put('/partials/directives/templates/nrgi-sources-table','<button type="button" data-toggle="collapse" ng-click="openClose=!openClose; getSources(id,type)" data-target="#sources" class="btn btn-primary-outline btn-block"><h4 class="text-justify">Sources</h4></button><div id="sources" class="panel-collapse collapse in"><table ts-wrapper="ts-wrapper" ng-class="sources.length &gt;= 8 ? \'header-fixed\' : \'\'" id="project-sources" class="load_table table table-striped projects"><thead><tr><th ts-criteria="source_name" class="tablesort-sortable-th">Name</th><th ts-criteria="source_type_id.source_type_name" class="tablesort-sortable-th">Type</th><th ts-criteria="source_type_id.source_type_authority" class="tablesort-sortable-th">Authority</th></tr></thead><tbody><tr ng-repeat="source in sources | unique: \'_id\'" ts-repeat="ts-repeat" ng-class="expression"><td class="source_id"><a href="source/{{source._id}}"><span ng-bind-html="source.source_name|sanitize"></span></a></td><td class="source_type"><a ng-if="source.source_type_display" href="source_type/{{source.source_type_id._id}}"><span ng-bind-html="source.source_type_id.source_type_name|sanitize"></span></a></td><td class="source_authority">{{source.source_type_id.source_type_authority}}</td></tr></tbody></table><div ng-if="sources.length&gt;0"><div class="download"><span aria-hidden="true" class="glyphicon glyphicon-download"></span><span> Download: <a href="" ng-csv="csv_sources" csv-header="getHeaderSources()" filename="sources.csv">Sources CSV</a></span></div></div></div>');
        $templateCache.put('/partials/directives/templates/nrgi-last-added','<div><h2>Latest 10 additons Projects and Sources</h2><div class="row pagetitle"><div class="col-lg-6"><button class="btn btn-primary-outline btn-block"><h4 class="text-justify">Projects</h4></button><table ts-wrapper="ts-wrapper" class="load_table table table-striped projects"><thead><tr><th ts-criteria="proj_name" class="tablesort-sortable-th">Name</th></tr></thead><tbody><tr ng-repeat="project in projects | unique: \'_id\'" ts-repeat="ts-repeat" ng-class="expression"><td class="contract_name"><a href="/project/{{project.proj_id}}">{{project.proj_name}}</a></td> </tr></tbody></table></div><div class="col-lg-6"><button class="btn btn-primary-outline btn-block"><h4 class="text-justify">Sources</h4></button><table ts-wrapper="ts-wrapper" class="load_table table table-striped sources"> <thead><tr><th ts-criteria="source_name" class="tablesort-sortable-th">Name</th></tr></thead><tbody><tr ng-repeat="source in sources | unique: \'_id\'" ts-repeat="ts-repeat" ng-class="expression"> <td class="source_name"><a href="/source/{{source._id}}">{{source.source_name}}</a></td></tr></tbody></table></div></div></div>')
        $templateCache.put('/partials/directives/templates/nrgi-summary-stats','<div><h2>Lists total # of varified, context and disclosure projects.</h2><p>Varified: {{summaryStats.verified}}</p><p>Context: {{summaryStats.context}}</p><p>Payment: {{summaryStats.payment}}</p><p>None: {{summaryStats.none}}</p><h2>Sum of payment records</h2><p>USD: {{usd}}</p><p>BBL: {{bbl}}</p><p>GBP: {{gbp}}</p></div>')
        $templateCache.put('/partials/directives/templates/nrgi-sunburst','<div><h2 class="text-center">Payments</h2><nvd3 options="options" data="sunburst" class="with-3d-shadow with-transitions"></nvd3></div>')
    });


