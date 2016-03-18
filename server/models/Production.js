/////////////
//PRODUCTION
/////////////
//  - Country
//  - Project
//  - Company
//  - Price Unit


///////////
//PRODUCTION
///////////
var mongoose = require('mongoose');
require('mongoose-html-2').loadType(mongoose);

var productionSchema, Production,
    deepPopulate    = require('mongoose-deep-populate')(mongoose),
    Schema          = mongoose.Schema,
    fact            = require("./Facts"),
    ObjectId        = Schema.Types.ObjectId,
//    mixedSchema     = Schema.Types.Mixed,
    source          = {type: ObjectId, ref: 'Sources'},
    //HTML            = mongoose.Types.Html,
    //htmlSettings    = {
    //    type: HTML,
    //    setting: {
    //        allowedTags: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'del'],
    //        allowedAttributes: {
    //            'a': ['href']
    //        }
    //    }
    //},
    mongooseHistory = require('mongoose-history'),
    hst_options         = {customCollectionName: 'production_hst'};

productionSchema = new Schema ({
    source: source,
    production_year: Number,
    production_unit: String,
    production_volume: Number,
    production_commodity: {
        type: ObjectId,
        ref: 'Commodity'
    },
    production_price: Number,
    production_price_unit: String,
    production_level: String,
    //production_note: htmlSettings
    production_note: String
});

productionSchema.plugin(mongooseHistory, hst_options);
productionSchema.plugin(deepPopulate);
Production = mongoose.model('Production', productionSchema);


function createDefaultProduction() {
    Production.find({}).exec(function (err, production) {
        if (production.length === 0) {
            Production.create({
                _id: '56be54f9d7bff9921c93c985',
                source: '56747e060e8cc07115200ee4',
                production_year: 2009,
                production_unit: 'barrels',
                production_volume: 105491,
                production_commodity: '56a13e9942c8bef50ec2e9e8',
                production_price: 154,
                production_level: 'project',
                production_price_unit: 'USD'
            });
            Production.create({
                _id: '56be54f9d7bff9921c93c986',
                source: '56747e060e8cc07115200ee4',
                production_year: 2009,
                production_unit: 'barrels',
                production_volume: 105491,
                production_commodity: '56a13e9942c8bef50ec2e9e8',
                production_price: 154,
                production_level: 'project',
                production_price_unit: 'USD'
            });
            Production.create({
                _id: '56be54f9d7bff9921c93c987',
                source: '56747e060e8cc07115200ee4',
                production_year: 2009,
                production_unit: 'barrels',
                production_volume: 105491,
                production_commodity: '56a13e9942c8bef50ec2e9e8',
                production_price: 154,
                production_level: 'project',
                production_price_unit: 'USD'
            });
            Production.create({
                _id: '56be54f9d7bff9921c93c988',
                source: '56747e060e8cc07115200ee4',
                production_year: 2009,
                production_unit: 'barrels',
                production_volume: 105491,
                production_commodity: '56a13e9942c8bef50ec2e9e8',
                production_price: 154,
                production_level: 'project',
                production_price_unit: 'USD'
            });
            Production.create({
                _id: '56be54f9d7bff9921c93c989',
                source: '56747e060e8cc07115200ee4',
                production_year: 2009,
                production_unit: 'barrels',
                production_volume: 105491,
                production_commodity: '56a13e9942c8bef50ec2e9e8',
                production_price: 154,
                production_level: 'project',
                production_price_unit: 'USD'
            });
            Production.create({
                _id: '56be54f9d7bff9921c93c990',
                source: '56747e060e8cc07115200ee4',
                production_year: 2009,
                production_unit: 'barrels',
                production_volume: 105491,
                production_commodity: '56a13e9942c8bef50ec2e9e8',
                production_price: 154,
                production_level: 'project',
                production_price_unit: 'USD'
            });
            Production.create({
                _id: '56be54f9d7bff99ppp93c990',
                source: '56747e060e8cc07115200ee4',
                production_year: 2009,
                production_unit: 'barrels',
                production_volume: 105491,
                production_commodity: '56a13e9942c8bef50ec2e9e8',
                production_price: 154,
                production_level: 'site',
                production_price_unit: 'USD'
            });
            Production.create({
                _id: '56be54f9000ff9921c93c990',
                source: '56747e060e8cc07115200ee4',
                production_year: 2009,
                production_unit: 'barrels',
                production_volume: 105491,
                production_commodity: '56a13e9942c8bef50ec2e9e8',
                production_price: 154,
                production_level: 'field',
                production_price_unit: 'USD'
            });
            console.log('Production figures created...');
        }
    });
}

exports.createDefaultProduction = createDefaultProduction;