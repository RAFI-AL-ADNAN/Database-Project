document.addEventListener('DOMContentLoaded', () => {
  // Element selection
  const itemInput = document.querySelector("#item");
  const sizeInput = document.querySelector("#size");
  const proteinOutput = document.querySelector(".protein");
  const calOutput = document.querySelector(".cal");
  const fatOutput = document.querySelector(".fat");
  const form = document.querySelector(".form1");
  const btn = document.querySelector(".btn");
  const content = document.querySelector(".content");
  const totalProArea = document.querySelector(".total-protein");
  const totalCalArea = document.querySelector(".total-cal");
  const totalFatArea = document.querySelector(".total-fat");

  // Function to reset text content
  function reset(...elements) {
      elements.forEach(el => el.textContent = "");
  }

  // Function to fetch nutrition details
  async function getNutritionDetails(size, item) {
      try {
          const headers = { headers: { "X-Api-Key": "TRB6Zg6NXcqfDADsPvtaRA==o3CbQWd2rWFQeXef" } };
          const response = await axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${size}g ${item}`, headers);
          return response.data.items[0];
      } catch (error) {
          alert("Something went wrong. Please make sure you enter a valid input.");
          return null;
      }
  }

  // Form submission event
  form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nutritionDetails = await getNutritionDetails(sizeInput.value, itemInput.value);
      if (nutritionDetails) {
          calOutput.textContent = nutritionDetails.calories;
          fatOutput.textContent = nutritionDetails.fat_total_g;
          proteinOutput.textContent = nutritionDetails.protein_g;
      }
  });

  // Button click event to add item to plate
  btn.addEventListener("click", () => {
      if (itemInput.value !== "" && sizeInput.value !== "") {
          const elements = ['protein', 'cal', 'fat'].map(nutrient => {
              const element = document.createElement("p");
              element.textContent = document.querySelector(`.${nutrient}`).textContent;
              element.classList.add(`${nutrient}1`);
              return element;
          });

          const nameEntry = document.createElement("p");
          nameEntry.textContent = itemInput.value;
          const sizeEntry = document.createElement("p");
          sizeEntry.textContent = sizeInput.value;

          content.append(nameEntry, sizeEntry, ...elements);

          const totals = ['cal', 'protein', 'fat'].map(nutrient => Array.from(document.querySelectorAll(`.${nutrient}1`)).reduce((acc, el) => acc + Number(el.textContent), 0));
          [totalCal, totalPro, totalFat].forEach((el, index) => el.textContent = totals[index].toFixed(1));

          totalCalArea.append(totalCal);
          totalProArea.append(totalPro);
          totalFatArea.append(totalFat);
      } else {
          alert("Please enter a valid input.");
      }
  });
});