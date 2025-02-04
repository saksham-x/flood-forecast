import React, { useState, useEffect } from "react";
import { fetchConstants, updateConstants } from "../services/Api";

const RiverConstantsForm = () => {
  const [river, setRiver] = useState("trishuli"); // Default selected river
  const [allConstants, setAllConstants] = useState({}); // Store all constants
  const [constants, setConstants] = useState({
    threshold: "",
    multiplier: "",
    exponent: "",
    velocityFactor: "",
    velocityOffset: "",
    distance: "",
  });

  // ✅ Fetch all constants when component mounts
  useEffect(() => {
    const loadConstants = async () => {
      const data = await fetchConstants();
      if (data) {
        setAllConstants(data); // Store all constants
        if (data[river]) {
          setConstants(data[river]); // Set initial values
        }
      }
    };
    loadConstants();
  }, []);

  // ✅ When river selection changes, update input values
  useEffect(() => {
    if (allConstants[river]) {
      setConstants(allConstants[river]);
    }
  }, [river, allConstants]);

  // ✅ Allow editing input fields
  const handleChange = (e) => {
    setConstants({ ...constants, [e.target.name]: e.target.value });
  };

  // ✅ Update constants in the backend
  const handleSubmit = async () => {
    const updatedData = {
      [river]: {
        threshold: parseFloat(constants.threshold),
        multiplier: parseFloat(constants.multiplier),
        exponent: parseFloat(constants.exponent),
        velocityFactor: parseFloat(constants.velocityFactor),
        velocityOffset: parseFloat(constants.velocityOffset),
        distance: parseFloat(constants.distance),
      },
    };

    const response = await updateConstants(updatedData);
    if (response) {
      alert(response.message); // Show success message
      setAllConstants((prev) => ({
        ...prev,
        [river]: constants, // Update local state to match backend
      }));
    } else {
      alert("Failed to update constants");
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md flex items-center space-x-4">
      <div>
        <h1 className="text-sm font-medium mb-1"> River</h1>
        <select
          className="p-2 border rounded"
          value={river}
          onChange={(e) => setRiver(e.target.value.toLowerCase())} // Update selected river
        >
          <option value="trishuli">Trishuli</option>
          <option value="budigandaki">Budigandaki</option>
        </select>
      </div>

      <div className="flex space-x-2">
        {Object.keys(constants).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <input
              type="number"
              name={key}
              placeholder={key.replace(/([A-Z])/g, " $1").trim()}
              className="p-2 border rounded w-full"
              value={constants[key] || ""}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  );
};

export default RiverConstantsForm;
