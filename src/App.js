import React from "react";
import "./App.css";

const testCases = [
  {
    id: 1,
    name: "Test Case 1",
    time: "5 Minutes",
    module: "Onboarding",
    priority: "Low",
    status: "",
  },
  {
    id: 2,
    name: "Test Case 2",
    time: "10 Minutes",
    module: "Checkout",
    priority: "High",
    status: "",
  },
  {
    id: 3,
    name: "Test Case 3",
    time: "7 Minutes",
    module: "Login",
    priority: "Medium",
    status: "",
  },
];

function App() {
  const cases = testCases;

  return (
    <div className="App h-screen bg-[#172554] flex items-center justify-center p-4">
      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="bg-white rounded-lg shadow-lg w-full">
          <thead className="bg-[#075985] text-white">
            <tr>
              <th className="py-4 px-2 sm:px-4">Test Case Name</th>
              <th className="py-4 px-2 sm:px-4">Estimate Time</th>
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
