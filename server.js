const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3001, BASE_URL } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on: ${BASE_URL}`);
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
