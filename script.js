const dropdowns = document.querySelectorAll(`.form-to-main select`);
const btn = document.querySelector("button"); 
const input = document.querySelector(".amout input");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");


for(let select of dropdowns) {
    for (let currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);
    if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected"
        }
    select.addEventListener("change",(evt) => {
        updateFlage(evt.target);
    })
}
}

const updateFlage = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt)=> {
    evt.preventDefault();
    let amount = document.querySelector(".amount input")
    let amountVal = amount.value;
    if (amountVal== "" || amountVal < 0) {
        amountVal = 1;
        amount.value = "1";
    }

    const URL = `https://api.frankfurter.dev/v1/latest?amount=${amountVal}&from=${fromCurrency.value}&to=${toCurrency.value}`;
    try {
        let responce = await fetch(URL);
        let data = await responce.json();
        // console.log(data);
        let rate = data.rates[toCurrency.value];
        let message = document.querySelector(".exchange p");
        message.innerText = `${amountVal} ${fromCurrency.value} = ${rate} ${toCurrency.value}`;
    } catch (error) {
        console.log("Error:", error);
        document.querySelector(".exchange p").innerText = "Unable To Fetch Exchange Rate";
    };
});
