const path = require("path");
const fs = require("fs");

const splitServiceFromModel = function (modelToSplit = null) {
  return {
    service: modelToSplit ? modelToSplit.split("/")[0] : "",
    model: modelToSplit ? modelToSplit.split("/")[1] : "",
  };
};

module.exports = {
  listEveryModel: function ({ firstModel }) {
    const cwd = process.cwd();
    const { service: firstService, model: parsedFirstModel } =
      splitServiceFromModel(firstModel);

    const services = fs
      .readdirSync(`${path.join(cwd, "/services")}`)
      .filter((s) => !s.includes(".") && s !== firstService)
      .map((s) => s);

    const models = [];
    services.forEach((service) => {
      const serviceModels = fs
        .readdirSync(
          `${path.join(
            cwd,
            "/services",
            service,
            "/src/graphql/schema/Models"
          )}`
        )
        .filter((m) => !m.includes(".") && m !== parsedFirstModel)
        .map((m) => `${service}/${m}`);

      models.push(...serviceModels);
    });

    return models;
  },
  splitServiceFromModel: splitServiceFromModel,
};
