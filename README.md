# OData V4 Service Document

Using this module you can generate a service document response from a simple JSON format, an advanced schema JSON format or an Edmx instance created with [odata-v4-metadata](https://github.com/jaystack/odata-v4-metadata).

## Basic usage

Use the simple JSON format and convert your metadata JSON to a service document.

```javascript
var serviceDocument = require('odata-v4-service-document').ServiceDocument;

// service document express.js route
app.get('/odata', ServiceDocument.defineEntities({
    namespace: 'Default',
    containerName: 'Container',
    entities: [
        {
            name: 'Kitten',
            collectionName: 'Kittens',
            keys: ['Id'],
            computedKey: true,
            properties: {
                Id: 'Edm.String',
                Name: 'Edm.String',
                Age: 'Edm.Int32',
                Lives: 'Edm.Int32',
                Owner: 'Edm.String'
            },
            annotations:[
                { name: 'UI.DisplayName', value: 'Meww' },
                { property: 'Id', name: 'UI.ReadOnly', value: 'true' },
                { property: 'Title', name: 'UI.DisplayName', value: 'Meww Meww' },
            ]
        }
    ]
}).requestHandler());
```

## Advanced usage

Use a schema JSON, which is more verbose, but you can customize the metadata in a more advanced way.

```javascript
var ServiceDocument = require('odata-v4-service-document').ServiceDocument;
var schema = require('./schema');
var serviceDocument = ServiceDocument.processMetadataJson(schema);
var serviceDocumentJson = serviceDocument.document();
```

An example schema JSON looks like [this](https://raw.githubusercontent.com/jaystack/odata-v4-service-document/master/tests/schema2.json)
