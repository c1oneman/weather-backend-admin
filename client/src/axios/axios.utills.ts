import axios from "axios";

export const axiosWithAuth = () => {
  var token: string;
  const user = JSON.parse(localStorage.getItem("user")!);
  if (user && user.token) {
    token = user.token;
  } else {
    token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImMxb25lbWFuIiwicm9sZSI6MSwiaWF0IjoxNjA5NzkxNjgxLCJleHAiOjE2MDk3OTUyODF9.AQGc8kzoYa0Y6yu2Ll3U_EI_5ZglLI2RC8zaniqOVcY";
  }
  return axios.create({
    baseURL: "https://weather-against-humanity.herokuapp.com/",
    headers: {
      authorization: token,
    },
  });
};
