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

      {/* first chart  */}
      <div className="bg-gray-200 flex justify-between w-full h-96">
        <div className="w-1/2 h-full">
          <Chart
            data={trishuliData}
            title="galchi Discharge"
            yAxisDomain={[45, 60]}
            lineKey="trishuli_discharge"
            color="#8884d8"
            xAxisKey={"datetime"}
          />
        </div>
        <div className="w-1/2 h-full">
          <Chart
            data={budigandakiData}
            title="Khari Discharge"
            yAxisDomain={[475, 480]}
            lineKey="suirenitar_by_budigandaki"
            color="#82ca9d"
            xAxisKey={"datetime"}
          />
        </div>
      </div>

      {/* Second Chart */}
      <div className="bg-gray-200 flex justify-between w-full h-96">
        <div className="w-1/2 h-full">
          <Chart
            data={trishuliData}
            title="Suirenitar by Galchi"
            yAxisDomain={[45, 60]}
            lineKey="suirenitar_by_trishuli"
            xAxisKey="targetedDatetime" // Use targetedDatetime as X-axis
            color="#8884d8"
          />
        </div>
        <div className="w-1/2 h-full">
          <Chart
            data={budigandakiData}
            title="Suirenitar by Budigandaki"
            yAxisDomain={[475, 480]}
            lineKey="suirenitar_by_budigandaki"
            color="#82ca9d"
            xAxisKey={"targetedDatetime2"}
          />
        </div>
      </div>
      <div className="bg-gray-200 shadow-md rounded-md p-5">
        <Chart
          data={suirenitarData}
          title="Suirenitar Forecast"
          yAxisDomain={[515, 540]}
          lineKey="suirenitar_discharge"
          color="#8884d8"
          xAxisKey={"targetedDatetime2"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
