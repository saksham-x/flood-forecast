import React, { useState, useEffect } from "react";
import Chart from "../components/Chart";
import { fetchRiverData } from "../services/Api";

const Dashboard = () => {
  const [trishuliData, setTrishuliData] = useState([]);
  const [budigandakiData, setBudigandakiData] = useState([]);
  const [suirenitarData, setSuirenitarData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchRiverData();
      console.log("Fetched Data:", result); // Debug log
      if (result && result.data) {
        // Ensure the data is sorted by datetime
        const sortedData = [...result.data].sort(
          (a, b) => new Date(a.datetime) - new Date(b.datetime)
        );

        // Slice data for each chart as per your requirement
        const trishuliLatest = sortedData.slice(-20); // Last 20 points for Trishuli
        const budigandakiLatest = sortedData.slice(-20); // Last 20 points for Budigandaki
        const suirenitarLatest = sortedData.slice(-100); // Last 100 points for Suirenitar

        setTrishuliData(trishuliLatest);
        setBudigandakiData(budigandakiLatest);
        setSuirenitarData(suirenitarLatest);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">River Dashboard</h1>
      {/* Pass the respective data to each chart */}
      <Chart
        data={trishuliData}
        title="Trishuli Discharge"
        yAxisDomain={[45, 60]}
        lineKey="suirenitar_by_trishuli"
        color="#8884d8"
      />
      <Chart
        data={budigandakiData}
        title="Budigandaki Discharge"
        yAxisDomain={[475, 480]}
        lineKey="suirenitar_by_budigandaki"
        color="#82ca9d"
      />
      <Chart
        data={suirenitarData}
        title="Suirenitar Discharge"
        yAxisDomain={[515, 540]}
        lineKey="suirenitar_discharge"
        color="#8884d8"
      />
    </div>
  );
};

export default Dashboard;
