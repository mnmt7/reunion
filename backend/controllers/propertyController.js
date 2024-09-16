const handleFactory = require("./handlerFactory");
const Property = require("../models/propertyModel");

exports.getAllProperty = handleFactory.getAll(Property);
exports.getProperty = handleFactory.getOne(Property);
exports.createProperty = handleFactory.createOne(Property);
exports.updateProperty = handleFactory.updateOne(Property);
exports.deleteProperty = handleFactory.deleteOne(Property);
