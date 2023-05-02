import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function App() {
  const [contributionPerWeek, setContributionPerWeek] = useState(70);
  const [chartData, setChartData] = useState({});
  const [principle, setPrinciple] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);
  const chartContainer = useRef(null);

  useEffect(() => {
    const contributionEachYear = contributionPerWeek * 52;

    let compoundedContribution;
    let principle = contributionEachYear;
    const interest = 0.1;
    let interestEarned = 0;

    const data = {
      labels: [],
      datasets: [
        {
          label: "Interest Earned",
          backgroundColor: "rgb(229, 204, 255)",
          hoverBackgroundColor: "rgba(0, 0, 0, 0.7)",
          data: []
        },
        {
          label: "Principle",
          backgroundColor: "rgb(178, 102, 255)",
          hoverBackgroundColor: "rgba(0, 0, 0, 0.7)",
          data: []
        }
      ]
    };

    for (let i = 22; i <= 75; i++) {
      data.labels.push(i.toString());
      interestEarned = Math.round(
        principle * Math.pow(1 + interest, 1) - principle
      );
      compoundedContribution = principle + interestEarned;
      data.datasets[0].data.push(interestEarned);
      data.datasets[1].data.push(Math.round(principle));
      principle = compoundedContribution;
    }

    setChartData(data);
    setPrinciple(Math.round(principle));
    setInterestEarned(
      Math.round(compoundedContribution - contributionEachYear)
    );
  }, [contributionPerWeek]);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (chartContainer.current.firstChild) {
        chartContainer.current.firstChild.remove();
      }
      const newChart = new Chart(chartContainer.current, {
        type: "bar",
        data: chartData,
        options: {
          indexAxis: "x",
          scales: {
            x: {
              stacked: true,
              ticks: {
                stepSize: 10,
                font: {
                  size: 14
                }
              },
              grid: {
                display: false
              }
            },
            y: {
              stacked: true,
              ticks: {
                font: {
                  size: 14
                }
              },
              grid: {
                display: false
              }
            }
          },
          plugins: {
            selection: {
              mode: "x",
              intersect: false,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderColor: "rgb(100, 100, 100)",
              borderWidth: 2
            }
          }
        }
      });
      return () => newChart.destroy();
    }
  }, [chartData]);

  return (
    <div style={{ marginTop: "20px", textAlign: "center", fontSize: 14 }}>
      <h1 style={{ fontFamily: "Arial" }}>
        Advance Prototyping - Final Assignment
      </h1>
      <h2 style={{ fontFamily: "Arial", marginTop: "20px" }}>Fake-orns!</h2>
      <p style={{ fontFamily: "Arial" }}>
        {" "}
        You can click on the below fields to filter the data!{" "}
      </p>
      <canvas ref={chartContainer} style={{ marginTop: "1px" }} />
      <div
        style={{
          marginTop: "auto",
          textAlign: "center",
          fontSize: 15,
          width: "700px",
          margin: "auto"
        }}
      >
        <canvas ref={chartContainer} style={{ marginTop: "-125px" }} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              marginTop: "20px",
              marginLeft: "190px",
              alignItems: "center",
              fontFamily: "Arial"
            }}
          >
            Contribution:
          </span>
          <input
            type="range"
            min="1"
            max="200"
            value={contributionPerWeek}
            onChange={(e) => setContributionPerWeek(e.target.value)}
            style={{
              marginTop: "20px",
              width: "200px",
              accentColor: "rgb(178, 102, 255)",
              fontFamily: "Arial"
            }}
          />
          <span
            style={{
              marginTop: "20px",
              marginLeft: "1px",
              alignItems: "center",
              fontFamily: "Arial"
            }}
          >
            {contributionPerWeek} $/Week
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <table style={{ marginTop: "20px", textAlign: "left" }}>
            <thead>
              <tr>
                <th style={{ paddingRight: "20px", fontWeight: "bold" }}>
                  Age
                </th>
                <th style={{ paddingRight: "20px", fontWeight: "bold" }}>
                  Principle
                </th>
                <th style={{ paddingRight: "20px", fontWeight: "bold" }}>
                  Interest Earned
                </th>
              </tr>
            </thead>
            <tbody>
              {chartData.labels.map((label, index) => (
                <tr key={index}>
                  <td style={{ paddingRight: "20px" }}>{label}</td>
                  <td style={{ paddingRight: "20px" }}>
                    {chartData.datasets[1].data[index]}$
                  </td>
                  <td style={{ paddingRight: "20px" }}>
                    {chartData.datasets[0].data[index]}$
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
