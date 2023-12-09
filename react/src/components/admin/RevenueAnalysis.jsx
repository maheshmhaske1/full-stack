import React, { useRef, useEffect } from "react";
import SideNav from "./SideNav";
import Chart from "chart.js/auto";

function RevenueAnalysis() {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    // ================ Bar Chart for Product Analysis ============= //

    const barChartData = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Product Sales",
          data: [500, 300, 750, 200, 450, 500, 300, 750, 200, 450, 750, 200],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const barChartCtx = barChartRef.current.getContext("2d");
    new Chart(barChartCtx, {
      type: "bar",
      data: barChartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // ============== Pie Chart for Product Analysis =========== //
    const pieChartCtx = pieChartRef.current.getContext("2d");

    const pieChartData = {
      labels: ["Category A", "Category B", "Category C"],
      datasets: [
        {
          label: "Product Categories",
          data: [300, 150, 200],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
        },
      ],
    };

    new Chart(pieChartCtx, {
      type: "pie",
      data: pieChartData,
      options: {
        // You can customize chart options here
      },
    });

    // ============== Line Chart ============ //
    // ================ Line Chart ============= //
    const lineChartData = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Line Chart Dataset",
          data: [32, 10, 90, 20, 84, 92, 49, 54, 32, 99, 75, 39],
          fill: false,
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
        },
      ],
    };
    const lineChartCtx = lineChartRef.current.getContext("2d");
    new Chart(lineChartCtx, {
      type: "line",
      data: lineChartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <SideNav />
      <div className="container-fluid cards">
        <div className="row justify-content-center">
          <div className="col-md-11 pb-4">
            <div className="card shadow">
              <div className="card-header text-start">
                <h4>Product Sales Analysis</h4>
              </div>
              <div className="card-body">
                <canvas ref={barChartRef} width={400} height={100}></canvas>
              </div>
            </div>
          </div>
          <div className="col-md-6 pt-4">
            <div className="card shadow">
              <div className="card-header text-start">
                <h4>Categories Sale</h4>
              </div>
              <div className="card-body">
                <canvas ref={lineChartRef} width={400} height={320}></canvas>
              </div>
            </div>
          </div>
          <div className="col-md-5 pt-4">
            <div className="card shadow">
              <div className="card-header text-start">
                <h4>Product Categories</h4>
              </div>
              <div className="card-body">
                <canvas ref={pieChartRef} width={400} height={200}></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueAnalysis;
