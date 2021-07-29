import AWS from "aws-sdk";
import { config } from "../../shared/config/config";
import { validate } from "../../shared/validator/validator";
import { schema } from "./create-employee.schema";
import { errorHandler } from "../../shared/error-handler/error-handler";

const METHOD = "create-employee.handler";
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// the most basic version of a lambda to validate and create
// an employee record which is persisted to dynamodb. Important lines
// commented below for reference.
export const handler = async ({ body }) => {
  try {
    console.log(`${METHOD} started`);

    // parse the body of the payload
    const record = JSON.parse(body);

    console.log(`${METHOD} validating employee ${record.id} record`);
    validate(record, schema);

    // create the params object inc employee record to save
    const params = {
      TableName: config.employeesTable,
      Item: {
        id: record.id,
        firstName: record.firstName,
        surname: record.surname,
        fullName: `${record.firstName} ${record.surname}`,
        age: record.age,
        created: new Date().toISOString(),
      },
    };

    console.log(`${METHOD} writing employee ${record.id} to the database`);

    // write the record to dynamodb
    await dynamoDb.put(params).promise();

    console.log(`${METHOD} completed for employeeId ${record.id}`);

    // return the correct status code
    return {
      statusCode: 201,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify("Created"),
    };
  } catch (error) {
    console.error(error);

    return errorHandler(error);
  }
};
