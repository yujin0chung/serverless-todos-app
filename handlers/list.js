const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async (event) => {
  try {
    const result = await client.scan({ TableName: "todos" }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 404,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
