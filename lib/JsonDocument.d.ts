import { Edm } from 'odata-v4-metadata';
export declare class JsonDocument {
    metadata: Edm.Edmx;
    private options;
    constructor(options: any, edmx: Edm.Edmx);
    processMetadata(): {
        '@odata.context': any;
        value: any[];
    };
    buildEdmx(json: any, edmx: any, context: any): void;
    buildDataServices(json: any, dataservices: any, context: any): void;
    buildSchema(json: any, schemas: any, context: any): void;
    buildEntityContainer(json: any, entityContainers: any, context: any): void;
    buildEntitySets(json: any, entitySets: any, context: any): void;
}
