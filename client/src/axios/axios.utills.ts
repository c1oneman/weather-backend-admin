import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token")!;
  return axios.create({
    baseURL: "https://weather-against-humanity.herokuapp.com/",
    headers: {
      authorization: token,
    },
  });
};
