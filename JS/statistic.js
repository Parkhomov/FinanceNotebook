const ctx = document.getElementById("chartStatistic").getContext("2d");

const myChartStat = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Income Blue", "Costs Red"],
    datasets: [
      {
        label: "Statistic Shedule",
        data: [
          parseFloat(localStorage.getItem("sumIn")),
          parseFloat(localStorage.getItem("sumCosts")) 
        ],
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(255, 99, 132)",
        ],
        hoverOffset: 4,
      },
    ],
  },
  options: {
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20,
            weight: "bold",
          },
          boxWidth: 0,
          color: "#000",
        },
        position: "top",
      },
    },
  },
});

const buttons = document.querySelectorAll(".act-chart, .del-chart, .plus-chart, .remove-chart" );

const userInfo = document.querySelector(".information");
const arrLocalData = [
  parseFloat(localStorage.getItem("sumIn")),
  parseFloat(localStorage.getItem("sumCosts")),
] 
const localStorageStat = arrLocalData.join(' <---Income, Costs---> ',)
userInfo.textContent = localStorageStat;
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const newData = [
      parseFloat(localStorage.getItem("sumIn")),
      parseFloat(localStorage.getItem("sumCosts")),
    ];
    userInfo.textContent = newData.join(' <---Income, Costs---> ');
    myChartStat.data.datasets[0].data = newData;
    myChartStat.update();
  });
});








