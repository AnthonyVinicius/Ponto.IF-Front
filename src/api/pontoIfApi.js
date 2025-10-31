import axios from "axios";

export const pontoIfApi = axios.create({
  baseURL: "http://132.226.159.21:8081",
  headers: {
    "Content-Type": "application/json",
  },
});
