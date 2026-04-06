const { z } = require("zod");
const {
  registerPayloadSchema,
  loginPayloadSchema,
} = require("@rutu/shared/validations/auth.schema");

const registerSchema = z.object({
  body: registerPayloadSchema,
});

const loginSchema = z.object({
  body: loginPayloadSchema,
});

module.exports = { registerSchema, loginSchema };
