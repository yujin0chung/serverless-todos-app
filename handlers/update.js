const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async (event) => {
  const params = {
    TableName: "todos",
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression: "set checked = checked + :val",
    ExpressionAttributeValues: {
      ":val": 1,
    },
    ReturnValues: "UPDATED_NEW",
  };
  try {
    const result = await client.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (err) {
    console.log("Error occurred updating todo: ", err);
    return {
      statusCode: err.statusCode || 501,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
