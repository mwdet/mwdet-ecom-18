
const AWS = require("aws-sdk");

const docclient = new AWS.DynamoDB.DocumentClient();

 
   exports.handler = async (event,context) => {
     console.log("Inside handler")
     console.log(event)
    const data = JSON.parse(event.body);
    console.log(data)
  let statusCode = 200;
  var response ;
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
              id: data.body.id,
              name: data.body.name,
              email: data.body.email
            }
          })
          .promise();
        response = `Put item ${data.body.id}`;
    }
    catch(err) {
    statusCode = 400;
    response = err.message;
      
    }
   return {
    statusCode : statusCode

  };
};
