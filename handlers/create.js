const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require("uuid");

module.exports.run = async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "todos",
    Item: {
      id: uuidv4(),
      text: data.text,
      checked: 0,
    },
  };
  try {
    await client.put(params).promise();
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.log("Error occurred creating todo: ", err);
    return {
      statusCode: err.statusCode || 501,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
