const { Client, types, concurrent } = require("cassandra-driver");
const { CLIENT_ID, CLIENT_SECRET } = require("./constant")


  const client = new Client({
    cloud: {
      secureConnectBundle: "C:/Users/Softbook/Documents/Main Programs/Open Source/EXPENSEAPP/secure-connect-app.zip",
    }, 
    
    credentials: {
      username: CLIENT_ID, 
      password: CLIENT_SECRET
    },
  })
   
 
  client.connect((error, result) => {
    console.log('CONNECTED TO ASTRADB...')
  })


module.exports = { client, types }