////////////////////
///COMPANY GROUPS///
////////////////////
'use strict';
var mongoose = require('mongoose');
require('mongoose-html-2').loadType(mongoose);

var companyGroupSchema, CompanyGroup,
    Schema          = mongoose.Schema,
    aliases         = require('./Aliases'),
    //links           = require('./Links'),
    ObjectId        = mongoose.Schema.Types.ObjectId,
    HTML            = mongoose.Types.Html,
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
    company_group_aliases: [aliases],
    company_group_record_established: {
        type: ObjectId,
        ref: 'Sources'},
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

function createDefaultCompanyGroups() {
    CompanyGroup.find({}).exec(function(err, company_groups) {
        if(company_groups.length === 0) {
            CompanyGroup.create({
                _id: '56a14d8ee47b92f110ce9a57',
                company_group_name: 'Shell',
                commodity_aliases: [
                    {alias: 'Dutch Shell',language: 'en',source: '56747e060e8cc07115200ee6'},
                    {alias: 'black gold',language: 'en',source: '56747e060e8cc07115200ee3'}
                ],
                company_group_record_established: '56747e060e8cc07115200ee6',
                description: "<p>yes</p><p>no</p>",
                open_corporates_group_ID: 'junkid'
            });
            CompanyGroup.create({
                _id: '56a14d8ee47b92f110ce9a58',
                company_group_name: 'Exxon',
                commodity_aliases: [
                    {alias: 'Dutch Shell',language: 'en',source: '56747e060e8cc07115200ee6'}
                ],
                company_group_record_established: '56747e060e8cc07115200ee3',
                description: "<p>yes</p><p>no</p>",
                open_corporates_group_ID: 'junkid'
            });
            CompanyGroup.create({
                _id: '56a14d8ee47b92f110ce9a56',
                company_group_name: 'Petrobras',
                commodity_aliases: [
                ],
                company_group_record_established: '56747e060e8cc07115200ee6',
                description: "<p>yes</p><p>no</p>",
                open_corporates_group_ID: 'junkid'
            });
            console.log('***Company Groups Added');
        }
    });
};

exports.createDefaultCompanyGroups = createDefaultCompanyGroups;