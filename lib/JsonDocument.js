"use strict";
var extend = require('extend');
var containsField = function (obj, field, cb) {
    if (obj && field in obj && typeof obj[field] !== "undefined") {
        cb(obj[field]);
    }
};
var JsonDocument = (function () {
    function JsonDocument(options, edmx) {
        options = options || {};
        this.options = extend({}, options);
        this.metadata = edmx;
    }
    JsonDocument.prototype.processMetadata = function () {
        var context = {};
        var json = {
            '@odata.context': this.options.context,
            value: []
        };
        this.buildEdmx(json, this.metadata, context);
        return json;
    };
    JsonDocument.prototype.buildEdmx = function (json, edmx, context) {
        this.buildDataServices(json, edmx.dataServices, context);
    };
    JsonDocument.prototype.buildDataServices = function (json, dataservices, context) {
        this.buildSchema(json, dataservices.schemas, context);
    };
    JsonDocument.prototype.buildSchema = function (json, schemas, context) {
        var _this = this;
        schemas && schemas.forEach(function (schema) {
            _this.buildEntityContainer(json, schema.entityContainer, context);
        });
    };
    JsonDocument.prototype.buildEntityContainer = function (json, entityContainers, context) {
        var _this = this;
        entityContainers && entityContainers.forEach(function (entityContainer) {
            _this.buildEntitySets(json, entityContainer.entitySets, context);
        });
    };
    JsonDocument.prototype.buildEntitySets = function (json, entitySets, context) {
        entitySets && entitySets.forEach(function (entitySet) {
            json.value.push({
                name: entitySet.name,
                kind: "EntitySet",
                url: entitySet.name,
            });
        });
    };
    return JsonDocument;
}());
exports.JsonDocument = JsonDocument;
//# sourceMappingURL=JsonDocument.js.map