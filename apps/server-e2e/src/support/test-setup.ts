/* eslint-disable */
import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.SERVER_HOST ?? 'localhost';
  const port = process.env.SERVER_PORT ?? '3000';
  const protocol = process.env.SERVER_PROTOCOL ?? 'http';
  axios.defaults.baseURL = `${protocol}://${host}:${port}`;
};
