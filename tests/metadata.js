var expect = require('chai').expect
var ServiceDocument = require('../lib/serviceDocument').ServiceDocument

var schema = require('./schema2')
describe('metadata', () => {
    it('xml', (done) => {
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
                    annotations: [
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

    describe.only('tests', () => {
        it('process', () => {
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
                        annotations: [
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
            },
                {
                    context: 'http://127.0.0.1/odata/$metadata'
                })

            expect(m instanceof ServiceDocument).to.equal(true)
            expect(typeof m.data).to.equal('object')
            expect(m.data['@odata.context']).to.equal('http://127.0.0.1/odata/$metadata')

            expect(m.data.value).to.deep.equal([
                {
                    name: 'Articles',
                    kind: 'EntitySet',
                    url: 'Articles'
                },
                {
                    name: 'Categories',
                    kind: 'EntitySet',
                    url: 'Categories'
                }
            ])
        })

        it('requestHandler', () => {
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
                        annotations: [
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
            })

            expect(m instanceof ServiceDocument).to.equal(true)


            var isHeaderSetCalled = false;
            var middleware = m.requestHandler()
            middleware({
                protocol: 'http',
                get: function() {
                    return 'localhost:1234'
                },
                originalUrl: '/odata/'
            }, {
                set: function(key, value) {
                    expect(key).to.equal('OData-Version')
                    expect(value).to.equal('4.0')

                    isHeaderSetCalled = true
                },

                json: function(data) {
                    expect(typeof data).to.equal('object')
                    expect(data['@odata.context']).to.equal('http://localhost:1234/odata/$metadata')

                    expect(data.value).to.deep.equal([
                        {
                            name: 'Articles',
                            kind: 'EntitySet',
                            url: 'Articles'
                        },
                        {
                            name: 'Categories',
                            kind: 'EntitySet',
                            url: 'Categories'
                        }
                    ])


                    expect(isHeaderSetCalled).to.equal(true)
                }
            })
        })
    })
})