// Отримуємо значення введеного доходу та вибраного джерела доходу
const input = document.querySelector(".inMoney");
const select = document.querySelector("#incomeSource");
const change = document.querySelector("#changeSource");

let storageChartTypes = localStorage.getItem("chartType");
const ctx = document.getElementById("myChart").getContext("2d");

let myChart = new Chart(ctx, {
  type: storageChartTypes,
  data: {
    labels: ["Salary", "Deposit", "Savings", "Other"],
    datasets: [
      {
        label: "Income schedule",
        data: [
          parseFloat(localStorage.getItem("salary")),
          parseFloat(localStorage.getItem("deposit")),
          parseFloat(localStorage.getItem("savings")),
          parseFloat(localStorage.getItem("other")),
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
    maintainAspectRatio: true,
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
function changeChartType(newType) {
  const source = change.value;

  myChart.destroy();
  
  localStorage.setItem("chartType", newType = source);
  
  // Створити новий графік з новим типом
  myChart = new Chart(ctx, {
    type: newType,
    data: {
      labels: ["Salary", "Deposit", "Savings", "Other"],
      datasets: [
        {
          label: "Income schedule",
          data: [
            parseFloat(localStorage.getItem("salary")),
            parseFloat(localStorage.getItem("deposit")),
            parseFloat(localStorage.getItem("savings")),
            parseFloat(localStorage.getItem("other")),
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
      maintainAspectRatio: true,
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
  changeChartType();
})
function sumIncome() {
  let sumDataIncome = 0;
  for (let i = 0; i < myChart.data.datasets.length; i++) {
    const dataset = myChart.data.datasets[i];
    for (let j = 0; j < dataset.data.length; j++) {
      sumDataIncome += parseFloat(dataset.data[j]);
    }
  }
  localStorage.setItem("sumIn", sumDataIncome.toString());
  return sumDataIncome;
}

sumIncome();
// Оновлюємо відповідний набір даних у графіку
document.querySelector(".act-chart").addEventListener("click", function () {
  // Отримуємо значення введеного доходу та вибраного джерела доходу
  const income = parseFloat(input.value);
  const source = select.value;

  // Оновлюємо відповідний набір даних у графіку
  let currentValue = localStorage.getItem(source);
  let sum = 0;

  if (currentValue !== null) {
    // Якщо значення існує, перетворюємо його з рядка у число
    sum = parseFloat(currentValue);
  }

  // Додаємо нове значення до поточного у localStorage
  if (income > 0) {
    sum += income;
    localStorage.setItem(source, sum.toString());
  } else {
    alert("Value cannot be less than zero, enter a value greater than zero!");
    location.reload();
  }
  switch (source) {
    case "salary":
      myChart.data.datasets[0].data[0] += income;
      break;
    case "deposit":
      myChart.data.datasets[0].data[1] += income;
      break;
    case "savings":
      myChart.data.datasets[0].data[2] += income;
      break;
    case "other":
      myChart.data.datasets[0].data[3] += income;
      break;
  }

  // Оновлюємо графік
  sumIncome();
  myChart.update();
});

document.querySelector(".del-chart").addEventListener("click", function () {
  // Отримуємо значення введеного доходу та вибраного джерела доходу
  const income = parseFloat(input.value);
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
  minus = sum - income;
  if ((minus >= 0) & (income > 0)) {
    localStorage.setItem(source, minus.toString());
  } else {
    alert("The value cannot be a number less than zero!");
    location.reload();
  }
  switch (source) {
    case "salary":
      myChart.data.datasets[0].data[0] -= income;
      break;
    case "deposit":
      myChart.data.datasets[0].data[1] -= income;
      break;
    case "savings":
      myChart.data.datasets[0].data[2] -= income;
      break;
    case "other":
      myChart.data.datasets[0].data[3] -= income;
      break;
  }
  // Оновлюємо графік
  sumIncome();
  myChart.update();
});
