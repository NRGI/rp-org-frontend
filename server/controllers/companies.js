var Company 		= require('mongoose').model('Company'),
    CompanyGroup 	= require('mongoose').model('CompanyGroup'),
    Link 	        = require('mongoose').model('Link'),
    Country			= require('mongoose').model('Country'),
    async           = require('async'),
    encrypt 		= require('../utilities/encryption');

exports.getCompanies = function(req, res) {
    var company_len, link_len, company_counter, link_counter,
        limit = Number(req.params.limit),
        skip = Number(req.params.skip);

    async.waterfall([
        companyCount,
        getCompanySet,
        getCompanyLinks,
    ], function (err, result) {
        if (err) {
            res.send(err);
        }
    });

    function companyCount(callback) {
        Company.find({}).count().exec(function(err, company_count) {
            if(company_count) {
                callback(null, company_count);
            } else {
                callback(err);
            }
        });
    }

    function getCompanySet(company_count, callback) {
        Company.find(req.query)
            .sort({
                company_name: 'asc'
            })
            .skip(skip * limit)
            .limit(limit)
            .populate('country_of_incorporation.country', '_id iso2 name')
            .populate('company_aliases', ' _id alias')
            .lean()
            .exec(function(err, companies) {
                if(companies) {
                    callback(null, company_count, companies);
                } else {
                    callback(err);
                }
            });
    }

    function getCompanyLinks(company_count, companies, callback) {
        company_len = companies.length;
        company_counter = 0;

        companies.forEach(function (c) {
            Link.find({company: c._id})
                .populate('company_group','_id company_group_name')
                .populate('project')
                .exec(function(err, links) {
                    ++company_counter;
                    link_len = links.length;
                    link_counter = 0;
                    c.company_groups = [];
                    c.projects = 0;
                    links.forEach(function(link) {
                        ++link_counter;
                        switch (link.entities.pop('company')) {
                            case 'company_group':
                                c.company_groups.push({
                                    _id: link.company_group._id,
                                    company_group_name: link.company_group.company_group_name
                                });
                                break;
                            //
                            case 'project':
                                c.projects += 1;
                                break;
                            //
                            default:
                                console.log('error');
                        }
                        if(company_counter == company_len && link_counter == link_len) {
                            res.send({data:companies, count:company_count});
                        }
                    });

                });
        });
    }
};


exports.getCompanyByID = function(req, res) {
    var link_counter, link_len;

    async.waterfall([
        getCompany,
        getCompanyLinks,
    ], function (err, result) {
        if (err) {
            res.send(err);
        }
    });

    function getCompany(callback) {
        Company.findOne({_id:req.params.id})
            .populate('company_aliases', ' _id alias')
            .populate('company_group','_id company_group_name')
            .populate('country.country')
            .lean()
            .exec(function(err, company) {
                if(company) {
                    callback(null, company);
                } else {
                    callback(err);
                }
            });
    }
    function getCompanyLinks(company, callback) {
        Link.find({company: company._id})
            .populate('company_group','_id company_group_name')
            .populate('commodity')
            .populate('contract')
            .deepPopulate('project project.proj_country.country project.proj_commodity.commodity')
            .exec(function(err, links) {
                link_len = links.length;
                link_counter = 0;
                company.company_groups = [];
                company.commodities = {};
                company.projects = [];
                company.contracts = [];
                links.forEach(function(link) {
                    ++link_counter;
                    switch (link.entities.pop('company')) {
                        case 'commodity':
                            if (!company.commodities.hasOwnProperty(link.commodity_code)) {
                                company.commodities[link.commodity.commodity_code] = link.commodity.commodity_name;
                            }
                            break;
                        case 'company_group':
                            //company_array[company_array.length - 1].company_groups.push('YES');
                            company.company_groups.push({
                                _id: link.company_group._id,
                                company_group_name: link.company_group.company_group_name
                            });
                            break;
                        case 'contract':
                            company.contracts.push(link);
                            break;
                        case 'project':
                            company.projects.push(link);
                            break;

                        default:
                            console.log('error');
                    }
                    if(link_counter == link_len) {
                        res.send(company);
                    }
                });
            });
    }
};