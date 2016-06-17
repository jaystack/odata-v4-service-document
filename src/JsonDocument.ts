import { Edm } from 'odata-v4-metadata'
import * as extend from 'extend'

var containsField = (obj, field, cb) => {
    if (obj && field in obj && typeof obj[field] !== "undefined") {
        cb(obj[field])
    }
}

export class JsonDocument {
    public metadata: Edm.Edmx
    private options: any

    constructor(options: any, edmx: Edm.Edmx) {
        options = options || {};

        this.options = extend({}, options)

        this.metadata = edmx
    }


    processMetadata() {
        var context = {};
        var json = {
            '@odata.context': this.options.context,
            value: []
        };
        this.buildEdmx(json, this.metadata, context);
        return json;
    }

    buildEdmx(json, edmx, context) {
        this.buildDataServices(json, edmx.dataServices, context);
    }

    buildDataServices(json, dataservices, context) {
        this.buildSchema(json, dataservices.schemas, context);
    }

    buildSchema(json, schemas, context) {
        schemas && schemas.forEach(schema => {
            this.buildEntityContainer(json, schema.entityContainer, context);
        })
    }
    
    buildEntityContainer(json, entityContainers, context) {
        entityContainers && entityContainers.forEach(entityContainer => {
            this.buildEntitySets(json, entityContainer.entitySets, context)
        })
    }
    
    buildEntitySets(json, entitySets, context) {
        entitySets && entitySets.forEach(entitySet => {
            json.value.push({
                name: entitySet.name,
                kind: "EntitySet",
                url: entitySet.name,
            })
        })
    }
}