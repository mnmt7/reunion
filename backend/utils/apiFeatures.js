class APIFeatures {
  constructor(dbQuery, queryObj) {
    this.dbQuery = dbQuery;
    this.queryObj = queryObj;
  }

  filter() {
    const excludedFields = ["sort", "page", "limit", "fields"];

    const filterQueryObj = { ...this.queryObj };
    excludedFields.forEach((field) => delete filterQueryObj[field]);

    let filterQueryStr = JSON.stringify(filterQueryObj);
    filterQueryStr = filterQueryStr.replace(
      /\b(gt|gte|lt|lte|eq)\b/g,
      (match) => "$" + match
    );

    this.dbQuery.find(JSON.parse(filterQueryStr));

    return this;
  }

  sort() {
    const sortBy = this.queryObj.sort
      ? this.queryObj.sort.split(",").join(" ")
      : "+name";

    this.dbQuery.sort(sortBy);

    return this;
  }

  paginate() {
    const page = this.queryObj.page * 1 || 1;
    const limit = this.queryObj.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.dbQuery.skip(skip).limit(limit);

    return this;
  }

  limitFields() {
    const fields = this.queryObj.fields
      ? this.queryObj.fields.split(",").join(" ")
      : "-__v";

    this.dbQuery.select(fields);

    return this;
  }
}

module.exports = APIFeatures;
