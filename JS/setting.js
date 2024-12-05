document.addEventListener("DOMContentLoaded", () => {
    let settWindow = document.querySelector(".settings");
    $(document).ready(() => {
        $(listItems[3]).click(() => {
          $(settWindow).slideToggle();
        });
      });
})

document.querySelector(".remove").addEventListener("click", () => {
  localStorage.removeItem("firstVisit");
  location.reload();
})

