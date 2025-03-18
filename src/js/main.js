import "../assets/styles.scss";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  DoughnutController,
  ArcElement,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  DoughnutController,
  ArcElement
);

const ctxBar = document.getElementById("bar-chart").getContext("2d");
const myBarChart = new Chart(ctxBar, {
  type: "bar",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Current clients",
        data: [
          12000, 25000, 46000, 58000, 75000, 93000, 82000, 11000, 64000, 87000,
          95000, 67000,
        ],
        backgroundColor: "rgba(203, 60, 255, 1)",
        borderColor: "rgba(203, 60, 255, 1)",
        borderWidth: 1,
        barThickness: 12,
      },
      {
        label: "Subscribers",
        data: [
          52000, 37000, 23000, 67000, 88000, 47000, 91000, 22000, 81000, 54000,
          62000, 59000,
        ],
        backgroundColor: "rgba(14, 67, 251, 1)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        barThickness: 12,
      },
      {
        label: "New customers",
        data: [
          45000, 39000, 67000, 56000, 10000, 85000, 71000, 83000, 78000, 69000,
          54000, 41000,
        ],
        backgroundColor: "rgba(0, 194, 255, 1)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        barThickness: 12,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          callback: function (value) {
            return value / 1000 + "K";
          },
          stepSize: 20000,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

const progressData = [75, 60, 45];
const colors = ["#CB3CFF", "#0098FF", "#005AFF"];
const cutouts = ["75%", "60%", "45%"];

const ctx = document.getElementById("progress-chart").getContext("2d");

new Chart(ctx, {
  type: "doughnut",
  data: {
    datasets: progressData.map((value, index) => ({
      data: [value, 100 - value],
      backgroundColor: [colors[index], "transparent"],
      borderWidth: 0,
      cutout: cutouts[index],
      rotation: 270,
    })),
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  },
  plugins: [
    {
      id: "centerText",
      beforeDraw: (chart) => {
        const { width, height } = chart;
        const ctx = chart.ctx;

        ctx.save();
        ctx.font = "bold 18px Mona Sans";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const centerX = width / 2;
        const centerY = height / 2;

        ctx.fillText("150К", centerX, centerY);

        ctx.restore();
      },
    },
  ],
});
