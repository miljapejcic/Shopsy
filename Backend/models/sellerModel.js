const CosmosClient = require('@azure/cosmos').CosmosClient
import { Cosmos } from "node-cosmos"

const partitionKeyPath = ["/id"]

class Seller{
    constructor(cosmosClient, databaseId, containerId) {
        this.client = cosmosClient
        this.databaseId = databaseId
        this.containerId = containerId

        this.database = null
        this.container = null
      }

      async init() {
        console.log("jel udje")
        const dbResponse = await this.client.databases.createIfNotExists({
          id: this.databaseId
        })

        this.database = dbResponse.database
        const coResponse = await this.database.containers.createIfNotExists({
          id: this.containerId,
          partitionKey:{
            paths: partitionKeyPath
          }
        })
        this.container = coResponse.container

      }

      async getItem(itemId) {
        const db = await new Cosmos("AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==").getDatabase("Shopsy");
        const it = await db.find("Seller", {
          filter:{
            id:"1"
          }
        })
        console.log(it)
      }

}

module.exports = Seller