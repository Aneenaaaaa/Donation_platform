import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonationTypePie() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/donations/type-distribution")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  const chartData = {
    labels: data.map(d => d.donationType),
    datasets: [
      {
        data: data.map(d => d.count),
        backgroundColor: ["#1e40af", "#10b981", "#f59e0b", "#ef4444", "#6b7280"],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: { enabled: true }
    }
  };

  return <Pie data={chartData} options={options} />;
}

export default DonationTypePie;
