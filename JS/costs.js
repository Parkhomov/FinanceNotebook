const input = document.querySelector(".outMoney");
const select = document.querySelector("#costsSource");
const change2 = document.querySelector("#changeSource");

let storageChartType = localStorage.getItem("chartType");
const ctx = document.getElementById("chartCosts").getContext("2d");

let myChartCosts = new Chart(ctx, {
  type: storageChartType,
  data: {
    labels: [
      "Food",
      "Car",
      "Public transport",
      "Сlothes",
      "Utilities",
      "Housing fee",
      "Anything",
    ],
    datasets: [
      {
        label: "Costs schedule",
        data: [
          parseFloat(localStorage.getItem("Food")),
          parseFloat(localStorage.getItem("Car")),
          parseFloat(localStorage.getItem("Public transport")),
          parseFloat(localStorage.getItem("Clothes")),
          parseFloat(localStorage.getItem("Utilities")),
          parseFloat(localStorage.getItem("Housing fee")),
          parseFloat(localStorage.getItem("Anything")),
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 0.5,
        borderRadius: 10,
      },
    ],
  },
  options: {
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    responsive: true,
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
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          font: {
            size: 20,
            weight: "bold",
          },
          color: "#000",
        },
      },
      y: {
        ticks: {
          font: {
            size: 20,
            weight: "bold",
          },
          color: "#000",
        },
      },
    },
  },
});


function changeChartType2(newType) {
  const source = change2.value;
  myChartCosts.destroy();
  newType = source;
  myChartCosts = new Chart(ctx, {
    type: newType,
    data: {
      labels: [
        "Food",
        "Car",
        "Public transport",
        "Сlothes",
        "Utilities",
        "Housing fee",
        "Anything",
      ],
      datasets: [
        {
          label: "Costs schedule",
          data: [
            parseFloat(localStorage.getItem("Food")),
            parseFloat(localStorage.getItem("Car")),
            parseFloat(localStorage.getItem("Public transport")),
            parseFloat(localStorage.getItem("Clothes")),
            parseFloat(localStorage.getItem("Utilities")),
            parseFloat(localStorage.getItem("Housing fee")),
            parseFloat(localStorage.getItem("Anything")),
          ],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 0.5,
          borderRadius: 10,
        },
      ],
    },
    options: {
      animation: {
        animateRotate: true,
        animateScale: true,
      },
      responsive: true,
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
      scales: {
        x: {
          ticks: {
            autoSkip: false,
            maxRotation: 45,
            font: {
              size: 20,
              weight: "bold",
            },
            color: "#000",
          },
        },
        y: {
          ticks: {
            font: {
              size: 20,
              weight: "bold",
            },
            color: "#000",
          },
        },
      },
    },
  });
}
document.querySelector(".change").addEventListener("click", () => {
  changeChartType2();
})
function sumCosts() {
  let sumDataCosts = 0;
  for (let i = 0; i < myChartCosts.data.datasets.length; i++) {
    const datasets = myChartCosts.data.datasets[i];
    for (let j = 0; j < datasets.data.length; j++) {
      sumDataCosts += parseFloat(datasets.data[j]);
    }
  }
  localStorage.setItem("sumCosts", sumDataCosts.toString());
  return sumDataCosts;
}

sumCosts();
// Оновлюємо відповідний набір даних у графіку
document.querySelector(".plus-chart").addEventListener("click", function () {
  // Отримуємо значення введеного доходу та вибраного джерела доходу
  const costs = parseFloat(input.value);
  const source = select.value;

  // Оновлюємо відповідний набір даних у графіку
  let currentValue = localStorage.getItem(source);
  let sum = 0;

  if (currentValue !== null) {
    // Якщо значення існує, перетворюємо його з рядка у число
    sum = parseFloat(currentValue);
  }

  // Додаємо нове значення до поточного у localStorage
  if (costs > 0) {
    sum += costs;
    localStorage.setItem(source, sum.toString());
  } else {
    alert("Value cannot be less than zero, enter a value greater than zero!");
    location.reload();
  }
  switch (source) {
    case "Food":
      myChartCosts.data.datasets[0].data[0] += costs;
      break;
    case "Car":
      myChartCosts.data.datasets[0].data[1] += costs;
      break;
    case "Public transport":
      myChartCosts.data.datasets[0].data[2] += costs;
      break;
    case "Clothes":
      myChartCosts.data.datasets[0].data[3] += costs;
      break;
    case "Utilities":
      myChartCosts.data.datasets[0].data[4] += costs;
      break;
    case "Housing fee":
      myChartCosts.data.datasets[0].data[5] += costs;
      break;
    case "Anything":
      myChartCosts.data.datasets[0].data[6] += costs;
      break;
  }

  // Оновлюємо графік
  myChartCosts.update();
  sumCosts();
});

document.querySelector(".remove-chart").addEventListener("click", function () {
  // Отримуємо значення введеного доходу та вибраного джерела доходу
  const costs = parseFloat(input.value);
  const source = select.value;
  // Оновлюємо відповідний набір даних у графіку
  let currentValue = localStorage.getItem(source);
  let sum = 0;
  let minus = 0;

  if (currentValue !== null) {
    // Якщо значення існує, перетворюємо його з рядка у число
    sum = parseFloat(currentValue);
  }

  // Додаємо нове значення до поточного у localStorage
  minus = sum - costs;
  if ((minus >= 0) & (costs > 0)) {
    localStorage.setItem(source, minus.toString());
  } else {
    alert("The value cannot be a number less than zero!");
    location.reload();
  }
  switch (source) {
    case "Food":
      myChartCosts.data.datasets[0].data[0] -= costs;
      break;
    case "Car":
      myChartCosts.data.datasets[0].data[1] -= costs;
      break;
    case "Public transport":
      myChartCosts.data.datasets[0].data[2] -= costs;
      break;
    case "Clothes":
      myChartCosts.data.datasets[0].data[3] -= costs;
      break;
    case "Utilities":
      myChartCosts.data.datasets[0].data[4] -= costs;
      break;
    case "Housing fee":
      myChartCosts.data.datasets[0].data[5] -= costs;
      break;
    case "Anything":
      myChartCosts.data.datasets[0].data[6] -= costs;
      break;
  }
  // Оновлюємо графік
  myChartCosts.update();
  sumCosts();
});
