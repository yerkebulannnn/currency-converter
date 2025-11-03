const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");
const amount = document.getElementById("amount");

const apiKey = "c83fd098ea9dd217f2e87a2b"; // You’ll get this next
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

async function loadCurrencies() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  const currencies = Object.keys(data.conversion_rates);

  currencies.forEach(curr => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = option2.value = curr;
    option1.textContent = option2.textContent = curr;
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = "USD";
  toCurrency.value = "EUR";
}

async function convertCurrency() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  const rate = data.conversion_rates[toCurrency.value];
  const converted = (amount.value * rate).toFixed(2);
  result.textContent = `${amount.value} ${fromCurrency.value} = ${converted} ${toCurrency.value}`;
}

convertBtn.addEventListener("click", convertCurrency);
window.addEventListener("load", loadCurrencies);
amount.addEventListener("keydown", e => { if (e.key === "Enter") convertCurrency(); });
