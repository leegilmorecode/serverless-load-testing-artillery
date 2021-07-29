export const schema = {
  type: "object",
  required: ["id", "firstName", "surname", "age"],
  maxProperties: 4,
  minProperties: 4,
  properties: {
    id: {
      type: "number",
    },
    firstName: {
      type: "string",
      pattern: "^[a-zA-Z]+$",
    },
    surname: {
      type: "string",
      pattern: "^[a-zA-Z]+$",
    },
    age: {
      type: "number",
    },
  },
};
