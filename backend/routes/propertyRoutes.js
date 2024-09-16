const express = require("express");

const propertyController = require("../controllers/propertyController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/", propertyController.createProperty);

router.use(authController.protect);

router.get(
  "/",
  (req, res, next) => {
    req.query.user = {
      eq: req.user._id,
    };
  },
  propertyController.getAllProperty
);

router
  .route("/:id")
  .get(propertyController.getProperty)
  .patch(propertyController.updateProperty)
  .delete(propertyController.deleteProperty);

module.exports = router;
