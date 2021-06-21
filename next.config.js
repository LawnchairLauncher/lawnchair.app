const PRODUCTION = process.env.NODE_ENV === "production"

module.exports = {
  basePath: PRODUCTION ? "/lawnchair.app" : "",
  assetPrefix: PRODUCTION ? "/lawnchair.app/" : "",
  env: {
    BACKEND_URL: PRODUCTION ? "/lawnchair.app" : "",
  },
}
