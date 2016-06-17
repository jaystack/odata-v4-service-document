import { Edm } from 'odata-v4-metadata';
import { ServiceMetadata } from 'odata-v4-service-metadata';
import { Request, Response, RequestHandler } from 'express';
export declare class ServiceDocument extends ServiceMetadata {
    constructor(edmx: Edm.Edmx, options?: Object);
    document(format?: string): any;
    process(edmx: Edm.Edmx, options?: Object): void;
    requestHandler(format?: string): (req: Request, res: Response, next: RequestHandler) => void;
}
