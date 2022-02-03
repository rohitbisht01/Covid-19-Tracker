import React, { useState, useEffect } from "react";
import "./Charts.css";
import { fetchDailyData } from "../../api";
import { Line, Bar, registerables } from "react-chartjs-2";
import Chart from "chart.js/auto";

const Charts = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  // dailyData array has any element or not and then display it
  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "INFECTED",
            borderColor: "orange",
            backgroundColor: "#D3ECA7",
            fill: true,
          },
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "DEATHS",
            borderColor: "red",
            backgroundColor: "rbga(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: ["#219f94", "#ce7879", "#4f9e6e"],
            hoverBorderWidth: 3,
            hoverBorderColor: "white",
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  return <div className="charts">{country ? barChart : lineChart}</div>;
};

export default Charts;
