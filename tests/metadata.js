var ServiceDocument = require('../lib/serviceDocument').ServiceDocument

var schema = require('./schema2')
describe('metadata', () => {
    it.only('xml', (done) => {
        var m = ServiceDocument.processMetadataJson(schema, {
            context: 'http://127.0.0.1/odata/$metadata'
        })

        var fs = require('fs');
        fs.writeFile("./serviceDocument.json", JSON.stringify(m.data, null, 4), function(err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
            done()
        });


    })
    
    it('defineEntities', (done) => {
        var m = ServiceDocument.defineEntities({
            namespace: 'JayData.Entities',
            containerName: 'Container',
            entities: [
                {
                    name: 'Article',
                    collectionName: 'Articles',
                    keys: ['Id'],
                    computedKey: true,
                    properties: {
                        Id: 'Edm.Int32',
                        Title: 'Edm.String',
                        Body: 'Edm.String'
                    },
                    annotations:[
                        { name: 'UI.DisplayName', value: 'Arts' },
                        { property: 'Id', name: 'UI.ReadOnly', value: 'true' },
                        { property: 'Title', name: 'UI.DisplayName', value: 'Article Title' },
                    ]
                },
                {
                    name: 'Category',
                    collectionName: 'Categories',
                    keys: ['Id'],
                    computedKey: true,
                    properties: {
                        Id: 'Edm.Int32',
                        Title: 'Edm.String'
                    }
                }
            ]
        }, {
            context: 'http://127.0.0.1/odata/$metadata'
        })
        
        
        var fs = require('fs');
        fs.writeFile("./serviceDocument.json", JSON.stringify(m.data, null, 4), function(err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
            done()
        });
        
    })
})