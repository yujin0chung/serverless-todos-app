const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async (event) => {
  const params = {
    TableName: "todos",
    Key: {
      id: event.pathParameters.id,
    },
  };
  try {
    await client.delete(params).promise();
    return {
      statusCode: 200,
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 501,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
