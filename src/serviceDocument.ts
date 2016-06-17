import { Edm } from 'odata-v4-metadata'
import { ServiceMetadata } from 'odata-v4-service-metadata'
import { JsonDocument } from './JsonDocument'
import { Request, Response, RequestHandler } from 'express';

export class ServiceDocument extends ServiceMetadata {
    constructor(edmx: Edm.Edmx, options?: Object){
        super(edmx, options);
    }
    
    document(format?: string) {
        switch (format){            
            case 'xml':
                throw new Error('Not implemented');
            default: return this.data;
        }
    }
    
    process(edmx: Edm.Edmx, options?: Object) {
        var jsonDocument = new JsonDocument(options, edmx);
        this.data = jsonDocument.processMetadata();
    }
    
    requestHandler(format?: string) {
        return (req:Request, res:Response, next:RequestHandler) => {
            res.set('OData-Version', '4.0');
            res.json(this.document(format));
        };
    }
}