// ---------- Elementos ----------
const fromSelect = document.querySelector(".from-select");
const toSelect = document.querySelector(".currency-select");
const input = document.querySelector(".input-curency");
const convertButton = document.querySelector(".convert-button");
const swapButton = document.getElementById("swap-button");

const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");
const fromName = document.getElementById("from-name");
const toName = document.getElementById("currency-name");
const fromValue = document.querySelector(".currency-value-to-convert");
const toValue = document.querySelector(".currency-value");
const rateText = document.getElementById("rate-text");
const rateSource = document.getElementById("rate-source");

// ---------- Moedas ----------
function euroFlag() {
    let stars = "";
    for (let i = 0; i < 12; i++) {
        const a = (i * Math.PI) / 6;
        stars += `<circle cx="${24 + 13 * Math.sin(a)}" cy="${24 - 13 * Math.cos(a)}" r="2.2" fill="#fc0"/>`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#039"/>${stars}</svg>`;
    return "data:image/svg+xml," + encodeURIComponent(svg);
}

const CURRENCIES = {
    real: { name: "Real", code: "BRL", flag: "./assets/brasil (3).png" },
    dolar: { name: "Dólar", code: "USD", flag: "./assets/usa.png" },
    euro: { name: "Euro", code: "EUR", flag: euroFlag() },
};

// Valor de cada moeda em reais (usado se a API estiver fora do ar)
const rates = { real: 1, dolar: 5.2, euro: 6.0 };

function format(value, key) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: CURRENCIES[key].code,
    }).format(value);
}

// ---------- Cotações ----------
async function loadRates() {
    try {
        const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL");
        if (!response.ok) throw new Error("Resposta inválida");
        const data = await response.json();
        rates.dolar = Number(data.USDBRL.bid);
        rates.euro = Number(data.EURBRL.bid);
        rateSource.textContent = "Cotação em tempo real";
    } catch (error) {
        rateSource.textContent = "Cotação aproximada (não foi possível atualizar)";
    }
    convert();
}

// ---------- Valor digitado ----------
function getAmount() {
    const digits = input.value.replace(/\D/g, "");
    return digits ? Number(digits) / 100 : 0;
}

function formatInput() {
    const amount = getAmount();
    input.value = amount ? format(amount, fromSelect.value) : "";
    input.placeholder = format(10000, fromSelect.value);
    return amount;
}

// ---------- Conversão ----------
function convert() {
    const from = fromSelect.value;
    const to = toSelect.value;
    const amount = getAmount();
    const result = (amount * rates[from]) / rates[to];

    fromFlag.src = CURRENCIES[from].flag;
    toFlag.src = CURRENCIES[to].flag;
    fromName.textContent = CURRENCIES[from].name;
    toName.textContent = CURRENCIES[to].name;
    fromValue.textContent = format(amount, from);
    toValue.textContent = format(result, to);
    rateText.textContent = `${format(1, from)} = ${format(rates[from] / rates[to], to)}`;
}

// ---------- Eventos ----------
let previousFrom = fromSelect.value;
let previousTo = toSelect.value;

function onCurrencyChange() {
    previousFrom = fromSelect.value;
    previousTo = toSelect.value;
    formatInput();
    convert();
}

// Evita escolher a mesma moeda nos dois lados
fromSelect.addEventListener("change", () => {
    if (fromSelect.value === toSelect.value) toSelect.value = previousFrom;
    onCurrencyChange();
});

toSelect.addEventListener("change", () => {
    if (toSelect.value === fromSelect.value) fromSelect.value = previousTo;
    onCurrencyChange();
});

swapButton.addEventListener("click", () => {
    [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
    swapButton.classList.toggle("flipped");
    onCurrencyChange();
});

input.addEventListener("input", () => {
    const amount = formatInput();
    fromValue.textContent = format(amount, fromSelect.value);
});

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") convert();
});

convertButton.addEventListener("click", convert);

// ---------- Início ----------
formatInput();
convert();
loadRates();
