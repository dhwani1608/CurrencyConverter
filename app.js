baseURL = "https://api.exchangerate-api.com/v4/latest";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

btn.addEventListener("mouseover", () => {
    btn.style.backgroundColor = "mediumpurple";
})

btn.addEventListener("mouseleave", () => {
    btn.style.backgroundColor = "blueviolet";
})

for(let select of dropdown){
    for(currCode in countryList){
        let newOptions = document.createElement("option");
        newOptions.innerText = currCode;
        newOptions.value = currCode;
        select.append(newOptions);
        if(select.name === "from" && currCode === "USD"){
            newOptions.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOptions.selected = "selected";
        }
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue === "" || amtValue < 1){
        amtValue = 1;
        amount.value = "1";
    }
    console.log(fromCurr.value, toCurr.value);
    const URL =  `${baseURL}/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let datas = {};
    for(let i in data){
        if(i === "rates"){
            datas = data["rates"];
            let rate = datas[toCurr.value];
            console.log(rate);
            let finalAmt = amtValue * rate;
            console.log(finalAmt);
            msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
        }
    }
})