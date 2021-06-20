const PRODUCTION = process.env.NODE_ENV !== "development"

module.exports = {
  basePath: PRODUCTION ? "/lawnchair.app" : "",
  assetPrefix: PRODUCTION ? "/lawnchair.app/" : "",
}
