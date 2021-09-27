
const AWS = require("aws-sdk");

const docclient = new AWS.DynamoDB.DocumentClient();

 
   exports.handler = async (event,context) => {
     console.log("Inside handler")
    let body;
  let statusCode = 200;
  const TableName=process.env.TABLE_NAME;
  const headers = {
    "Content-Type": "application/json"
  };
 console.log("after handler")
    try {
      console.log("Inside try: "+JSON.stringify(event))
        await docclient.put({
            TableName: TableName,
            Item: {
              id: event.body.id,
              price: event.body.price,
              name: event.body.name
            }
          })
          .promise();
        body = `Put item ${event.body.id}`;
    }
    catch(err) {
    statusCode = 400;
    body = err.message;
      
    }
   return {
    statusCode,
    body,
    headers
  };
};
