const valueEl = document.getElementById("value");
const fromEl = document.getElementById("from");
const toEl = document.getElementById("to");
const ppiEl = document.getElementById("ppi");
const resultEl = document.getElementById("result");
const currentYear = document.getElementById("currentTime");

currentYear.textContent = new Date().getFullYear() + " ";

//Conversion Logic
document.getElementById("convertBtn").addEventListener("click", () => {
  const raw = Number(valueEl.value);
  if (!isFinite(raw)) {
    resultEl.textContent = "Enter a numeric value";
    return;
  }
  const from = fromEl.value;
  const to = toEl.value;
  let ppi = Number(ppiEl.value);
  if (!isFinite(ppi) || ppi <= 0) ppi = 96;

  const out = convert(raw, from, to, ppi);
  resultEl.textContent = formatResult(raw, from, out, to, ppi);
});

document.getElementById("swapBtn").addEventListener("click", () => {
  const swap = fromEl.value;
  fromEl.value = toEl.value;
  toEl.value = swap;
});

document.getElementById("clearBtn").addEventListener("click", () => {
  valueEl.value = "";
  resultEl.textContent = "Result";
});

function convert(value, from, to, ppi = 96) {
  let inches;
  if (from === "px") {
    inches = value / ppi;
  } else if (from === "in") {
    inches = value;
  } else if (from === "ft") {
    inches = value * 12;
  } else {
    throw new Error("Unknown from unit");
  }
  if (to === "px") {
    return inches * ppi;
  } else if (to === "in") {
    return inches;
  } else if (to === "ft") {
    return inches / 12;
  } else {
    throw new Error("Unknown from unit");
  }
}

function formatResult(inputValue, from, outputValue, to, ppi) {
  const rounded = roundSmart(outputValue);

  if (from === "px" || to === "px") {
    return `${inputValue} ${label(from)} = ${rounded} ${label(
      to
    )} (PPI=${ppi})`;
  }

  return `${inputValue} ${label(from)} ${rounded} ${label(to)}`;
}

function label(unit) {
  if (unit === "px") return "px";
  if (unit === "in") return "in";
  if (unit === "ft") return "ft";

  return unit;
}

function roundSmart(x) {
  if (Math.abs(x) < 0.0001) return Number(x.toFixed(6));
  if (Math.abs(x) < 1) return Number(x.toFixed(4));
  if (Math.abs(x) < 100) return Number(x.toFixed(3));
  return Number(x.toFixed(2));
}
