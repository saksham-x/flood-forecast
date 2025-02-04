import axios from "axios";

// ethernet
const BASE_URL = "http://192.168.4.191:8000/api";

// localhost
// const BASE_URL = "http://localhost:8000/api";

// export const fetchRiverData = async (page = 1, limit = 10) => {
//   try {
//     const response = await fetch(`http://192.168.4.191:8000/api/river-data`);
//     // const response = await fetch(`http://localhost:8000/api/river-data`);
//     if (!response.ok) throw new Error("Failed to fetch river data");

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching river data:", error);
//     return null;
//   }
// };

export const fetchRiverData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/river-data`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const fetchConstants = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/constants`);
    return response.data;
  } catch (error) {
    console.log("Error fetching constants ", error);
  }
};
export const updateConstants = async (newConstants) => {
  try {
    const response = await axios.post(`${BASE_URL}/constants`, newConstants);
    return response.data;
  } catch (error) {
    console.log("Error updating constants ", error);
  }
};
