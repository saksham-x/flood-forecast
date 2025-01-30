export const fetchRiverData = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`http://192.168.4.184:8000/api/river-data`);
    // const response = await fetch(`http://localhost:8000/api/river-data`);
    if (!response.ok) throw new Error("Failed to fetch river data");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching river data:", error);
    return null;
  }
};
