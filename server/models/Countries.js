////////////
//COUNTRIES
////////////
'use strict';
var mongoose = require('mongoose');
require('mongoose-html-2').loadType(mongoose);
var countrySchema, Country,
    links    = require('./Links'),
    deepPopulate    = require('mongoose-deep-populate')(mongoose),
    Schema   = mongoose.Schema,
    fact     = require("./Facts"),
    ObjectId = Schema.Types.ObjectId;

countrySchema = new Schema({
    iso2: String,
    name: String,
    country_aliases: [{
        type: ObjectId,
        ref: 'Alias'}],
    projects:[fact],
    country_type: [fact],
    country_commodity: [fact]
});

//countrySchema.plugin(mongooseHistory, options);

countrySchema.plugin(deepPopulate);
Country = mongoose.model('Country', countrySchema);

function createDefaultCountries() {
    Country.find({}).exec(function(err, countries) {
        if(countries.length === 0) {
            Country.create({_id:'56a7e6c02302369318e16bb8', iso2:'BG', name:'Bulgaria',country_type: [{source: '56747e060e8cc07115200ee3', string: 'mining'}],
                country_commodity: [{source: '56747e060e8cc07115200ee3', commodity: '56a13e9942c8bef50ec2e9e8'}]});
            Country.create({_id:'56a7e6c02302369318e16bb9', iso2:'AF', name:'Afghanistan',country_type: [{source: '56747e060e8cc07115200ee3', string: 'mining'}],
                country_commodity: [{source: '56747e060e8cc07115200ee3', commodity: '56a13e9942c8bef50ec2e9e8'}]});
            Country.create({_id:'56a7e6c02302369318e16bba', iso2:'NG', name:'Nigeria',country_type: [{source: '56747e060e8cc07115200ee3', string: 'mining'}],
                country_commodity: [{source: '56747e060e8cc07115200ee3', commodity: '56a13e9942c8bef50ec2e9e8'}]});
            Country.create({_id:'56a8d7d08e7079da05d6b542', iso2:'GH', name:'Ghana',country_type: [{source: '56747e060e8cc07115200ee3', string: 'mining'}],
                country_commodity: [{source: '56747e060e8cc07115200ee3', commodity: '56a13e9942c8bef50ec2e9e8'}]});
            console.log('Countries created...');
        }
    });
};

exports.createDefaultCountries = createDefaultCountries;