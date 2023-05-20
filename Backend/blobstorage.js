const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
require('dotenv').config()

const accountName = "shopsystorage";
const accountKey = "C0CUeoHuPodmUL7Y62cy1nJHCcz6i6v2g/IyJIZPv7boF6YLix3MvUciBddz8GMJQ19aWE5sS5kB+AStE6gVJA==";

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

const containerName = "productphotos"
const containerClient = blobServiceClient.getContainerClient(containerName);

module.exports = containerClient














