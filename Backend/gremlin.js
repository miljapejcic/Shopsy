const Gremlin = require('gremlin');
const config = require("./config");

const authenticator = new Gremlin.driver.auth.PlainTextSaslAuthenticator
(`/dbs/${config.databaseIdG}/colls/${config.collectionG}`, config.primaryKeyG)

const client = new Gremlin.driver.Client(
    config.endpointG, 
    { 
        authenticator,
        traversalsource : "g",
        rejectUnauthorized : true,
        mimeType : "application/vnd.gremlin-v2.0+json"
    }
);

module.exports = client