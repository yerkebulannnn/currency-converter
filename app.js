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
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amountValue = amount.value;

  if (!amountValue) {
    result.textContent = "Please enter an amount.";
    return;
  }

  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;
  const res = await fetch(url);
  const data = await res.json();

  const rate = data.conversion_rates[to];
  const converted = (amountValue * rate).toFixed(2);
  result.textContent = `${amountValue} ${from} = ${converted} ${to}`;
}

convertBtn.addEventListener("click", convertCurrency);
window.addEventListener("load", loadCurrencies);
amount.addEventListener("keydown", e => { if (e.key === "Enter") convertCurrency(); });
