const server = require("./server");
const dotenv = require("dotenv");
module.exports = () => {
  server();
  dotenv.config(); 
};
 