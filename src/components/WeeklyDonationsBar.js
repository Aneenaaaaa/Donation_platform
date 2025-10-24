import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function WeeklyDonationsBar() {
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/donations/weekly-count")
      .then(res => res.json())
      .then(data => setWeeklyData(data))
      .catch(err => console.error(err));
  }, []);

  const chartData = {
    labels: weeklyData.map(d => `W${d.week} (${d.year})`),
    datasets: [
      {
        label: "Donations",
        data: weeklyData.map(d => d.donationCount),
        backgroundColor: "#1e40af",
        borderRadius: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // important for small boxes
    plugins: {
      legend: { display: false }, // hide legend for compact view
      tooltip: { enabled: true }
    },
    scales: {
      x: { ticks: { font: { size: 10 } } },
      y: { ticks: { font: { size: 10 }, stepSize: 1 } }
    }
  };

  return (
    <div style={{ width: "250px", height: "200px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default WeeklyDonationsBar;
