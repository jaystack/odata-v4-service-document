"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var odata_v4_service_metadata_1 = require('odata-v4-service-metadata');
var JsonDocument_1 = require('./JsonDocument');
var ServiceDocument = (function (_super) {
    __extends(ServiceDocument, _super);
    function ServiceDocument(edmx, options) {
        _super.call(this, edmx, options);
    }
    ServiceDocument.prototype.document = function (format) {
        switch (format) {
            case 'xml':
                throw new Error('Not implemented');
            default: return this.data;
        }
    };
    ServiceDocument.prototype.process = function (edmx, options) {
        var jsonDocument = new JsonDocument_1.JsonDocument(options, edmx);
        this.data = jsonDocument.processMetadata();
    };
    ServiceDocument.prototype.requestHandler = function (format) {
        var _this = this;
        return function (req, res, next) {
            res.set('OData-Version', '4.0');
            var data = _this.document(format);
            if (!data['@odata.context']) {
                var url = req.protocol + '://' + req.get('host') + req.originalUrl.split("?").shift();
                if (url.slice(-1) !== '/')
                    url += '/';
                data['@odata.context'] = url + '$metadata';
            }
            res.json(data);
        };
    };
    return ServiceDocument;
}(odata_v4_service_metadata_1.ServiceMetadata));
exports.ServiceDocument = ServiceDocument;
//# sourceMappingURL=serviceDocument.js.map