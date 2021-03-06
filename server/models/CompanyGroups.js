///////////////////////////
///COMPANY GROUPS SCHEMA///
///////////////////////////
'use strict';
var mongoose = require('mongoose');
require('mongoose-html-2').loadType(mongoose);

var companyGroupSchema, CompanyGroup,
    deepPopulate    = require('mongoose-deep-populate')(mongoose),
    Schema          = mongoose.Schema,
    ObjectId        = mongoose.Schema.Types.ObjectId,
    HTML            = mongoose.Types.Html,
    alias           = require("./Aliases"),
    fact            = require("./Facts"),
    htmlSettings    = {
        type: HTML,
        setting: {
            allowedTags: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'del'],
            allowedAttributes: {
                'a': ['href']
            }
        }
    };

companyGroupSchema = new Schema({
    //Metadata
    company_group_name: String,
    company_group_aliases: [alias],
    company_group_record_established: {
        type: ObjectId,
        ref: 'Source'},
    country_of_incorporation: [fact],
    company_group_website: fact,
    description: htmlSettings,
    open_corporates_group_ID: String
});

//pull from open corporates
//companySchema.methods = {
////    openCorporatesPull: function() {
////
////    }
//};

CompanyGroup = mongoose.model('CompanyGroup', companyGroupSchema);
companyGroupSchema.plugin(deepPopulate);

function createDefaultCompanyGroups() {
    CompanyGroup.find({}).count().exec(function(err, company_groups_count) {
        if(company_groups_count === 0) {
            CompanyGroup.create({
                _id: '56a14d8ee47b92f110ce9a57',
                company_group_name: 'Shell',
                commodity_aliases: ['56a7d2e642074281134a60f3','56a7d2e642074281134a60f4'],
                company_group_record_established: '56747e060e8cc07115200ee6',
                description: "<p>yes</p><p>no</p>",
                open_corporates_group_id: 'junkid'
            });
            CompanyGroup.create({
                _id: '56a14d8ee47b92f110ce9a58',
                company_group_name: 'Exxon',
                commodity_aliases: ['56a7d2e642074281134a60f3'],
                company_group_record_established: '56747e060e8cc07115200ee3',
                description: "<p>yes</p><p>no</p>",
                open_corporates_group_id: 'junkid'
            });
            CompanyGroup.create({
                _id: '56a14d8ee47b92f110ce9a56',
                company_group_name: 'Petrobras',
                company_group_record_established: '56747e060e8cc07115200ee6',
                description: "<p>yes</p><p>no</p>",
                open_corporates_group_id: 'junkid'
            });
            CompanyGroup.find({}).count().exec(function(err, company_groups_count) {
                console.log(String(company_groups_count), 'company groups created...')
            });
        } else {
            console.log(String(company_groups_count), 'company groups exist...')
        }
    });
};
function getInitCompanyGroupsCount() {
    CompanyGroup.find({}).count().exec(function(err, company_groups_count) {
        console.log(String(company_groups_count), 'company groups exist...')
    });
};

exports.getInitCompanyGroupsCount = getInitCompanyGroupsCount;
exports.createDefaultCompanyGroups = createDefaultCompanyGroups;