const logger = require("../utils/logger");

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    // Jika ada error dari Zod, format menjadi pesan yang rapi
    let errorMessage = "Validasi gagal";
    if (err.errors) {
      errorMessage = err.errors.map((e) => e.message).join(", ");
    } else {
      errorMessage = err.message;
    }

    logger.warn(`[Validation Error] ${errorMessage}`);

    // Kembalikan status 400 (Client Error), BUKAN 500 (Server Error)
    return res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

module.exports = validate;
