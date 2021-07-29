import AWS from "aws-sdk";
import { config } from "../../shared/config/config";
import { validate } from "../../shared/validator/validator";
import { schema } from "./get-employee.schema";
import { errorHandler } from "../../shared/error-handler/error-handler";

const METHOD = "get-employee.handler";
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// the most basic version of a function to return the
// employee record via id from dynamodb. Important lines
// commented below for reference.
export const handler = async ({ pathParameters: { id } }) => {
  try {
    console.log(`${METHOD} started`);

    const employeeId = Number(id);

    console.log(`${METHOD} validating employee ${employeeId} payload`);

    // validate the id parameter using json schema
    validate({ id: employeeId }, schema);

    const params = {
      TableName: config.employeesTable,
      Key: {
        id: employeeId,
      },
    };

    console.log(`${METHOD} getting employee ${employeeId} from the database`);

    // get the employee record from the database
    const { Item: record = {} } = await dynamoDb.get(params).promise();

    console.log(`${METHOD} completed for employeeId ${employeeId}`);

    // return the correct status code
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    };
  } catch (error) {
    console.error(error);

    return errorHandler(error);
  }
};
