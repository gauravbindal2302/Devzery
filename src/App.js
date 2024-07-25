import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000");
        setCases(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.post("http://localhost:5000/update_status", {
        id,
        status: newStatus,
      });
      alert("Status updated successfully!");
      setCases((prevCases) =>
        prevCases.map((testCase) =>
          testCase.id === id ? { ...testCase, status: newStatus } : testCase
        )
      );
    } catch (error) {
      console.error(error);
      alert(`Failed to update status to ${newStatus}`);
    }
  };

  return (
    <div className="App h-screen bg-[#172554] flex items-center justify-center p-4">
      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="bg-white rounded-lg shadow-lg w-full">
          <thead className="bg-[#075985] text-white">
            <tr>
              <th className="py-4 px-2 sm:px-4">Test Case Name</th>
              <th className="py-4 px-2 sm:px-4">Estimated Time</th>
              <th className="py-4 px-2 sm:px-4">Module</th>
              <th className="py-4 px-2 sm:px-4">Priority</th>
              <th className="py-4 px-2 sm:px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((testCase) => (
              <tr
                key={testCase.id}
                className="border-b last:border-0 hover:bg-gray-100"
              >
                <td className="py-4 px-2 sm:px-4 text-center">
                  {testCase.name}
                </td>
                <td className="py-4 px-2 sm:px-4 text-center">
                  {testCase.time}
                </td>
                <td className="py-4 px-2 sm:px-4 text-center">
                  {testCase.module}
                </td>
                <td className="py-4 px-2 sm:px-4 text-center">
                  {testCase.priority}
                </td>
                <td className="py-4 px-2 sm:px-4 text-center">
                  <select
                    className="border rounded p-1"
                    value={testCase.status}
                    onChange={(e) =>
                      handleStatusChange(testCase.id, e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option value="PASS">PASS</option>
                    <option value="FAIL">FAIL</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
