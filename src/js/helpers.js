import { TIMEOUT_SEC } from "./config";
import { bgg } from "bgg-sdk";

const convert = require("xml-js");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url) {
  try {
    const res = await Promise.race([
      bgg.collection({ username: url }),
      timeout(TIMEOUT_SEC),
    ]);
    return res;
  } catch (err) {
    throw err;
  }
};
