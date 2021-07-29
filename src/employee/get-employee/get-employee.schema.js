export const schema = {
  type: "object",
  required: ["id"],
  maxProperties: 1,
  minProperties: 1,
  properties: {
    id: {
      type: "number",
    },
  },
};
