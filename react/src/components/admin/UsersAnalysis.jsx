import { React, useRef } from "react";
import SideNav from "./SideNav";
import { useEffect } from "react";
import Chart from "chart.js/auto";

function UsersAnalysis() {
  const chartRef = useRef(null);
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);
  // const chartRef = useRef(null);

  useEffect(() => {
    // ================ Bar Chart ============= //

    const data = {
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
          label: "My First Dataset",
          data: [65, 59, 80, 81, 56, 65, 10, 98, 96, 10, 50, 42],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],

      //
    };
    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

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

    // ============== Pie Chart =========== //
    const ctxPieChart = pieChartRef.current.getContext("2d");

    const dataPieChart = {
      labels: ["Active", "Un Active", "Delete Account"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 500, 200],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          options: {
            layout: {
              padding: 100,
            },
          },
        },
      ],
    };

    new Chart(ctxPieChart, {
      type: "pie",
      data: dataPieChart,
      options: {
        // You can customize chart options here
      },
    });
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideNav />
        <div className="container-fluid cards">
          <div className="row justify-content-center">
            <div className="col-md-11 pb-4">
              <div className="card shadow ">
                <div className="card-header text-start">
                  <h4>Monthly Joined Users</h4>
                </div>
                <div className="card-body ">
                  <canvas ref={lineChartRef} width={400} height={100}></canvas>
                </div>
              </div>
            </div>

            <div className="col-md-5 pt-4">
              <div className="card shadow ">
                <div className="card-header text-start">
                  <h4>Monthly Joined Users</h4>
                </div>
                <div className="card-body ">
                  <canvas ref={chartRef} width={400} height={395}></canvas>
                </div>
              </div>
            </div>
            <div className="col-md-6 pt-4">
              <div className="card shadow ">
                <div className="card-header text-start">
                  <h4>Users Status</h4>
                </div>
                <div className="card-body ">
                  <canvas ref={pieChartRef} width={400} height={10}></canvas>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersAnalysis;
