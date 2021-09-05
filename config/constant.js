const dotenv = require('dotenv');
dotenv.config()



 //CLIENT_ID = sbfXZsOmzfMdhauBRDdeKslX  

module.exports = {
    NODE_ENV, 
    PORT, 
    CLIENT_ID, 
    CLIENT_SECRET, 
    ASTRA_KEYSPACE, 
    ASTRA_TABLE
} = process.env