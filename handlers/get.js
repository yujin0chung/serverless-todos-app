const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async (event) => {
  console.log("get event: ", event);
  const params = {
    TableName: "todos",
    Key: {
      id: event.pathParameters.id,
    },
  };
  try {
    const result = await client.get(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 404,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
