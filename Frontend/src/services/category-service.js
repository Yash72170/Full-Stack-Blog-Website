
// import axios from "axios";
// import { getToken } from "../auth";  // assuming you store JWT after login

// export const loadAllCategories = async () => {
//     const token = getToken();  // retrieve stored JWT
//     const response = await axios.get("http://localhost:8080/api/v1/categories/", {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
//     return response.data;
// };

import { privateAxios } from "./helper";

// Load all categories
export const loadAllCategories = async () => {
  return privateAxios
    .get("/categories/")
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error loading categories:", error);
      throw error;
    });
};
