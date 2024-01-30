const BASE_URl = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies'

const dropdowns = document.querySelectorAll('.dropdown select')
const btn = document.querySelector('.btn')
const fromCurr = document.querySelector('.from select')
const toCurr = document.querySelector('.to select')
const msg = document.querySelector('.msg')


// for (code in countryList) {
// console.log(code)
// }


for(let select of dropdowns){
    for(currcode in countryList){
        let newOp = document.createElement("option");
        newOp.innerHTML= currcode
        newOp.value = currcode;
      
        if(select.name =="from" && currcode=="USD"){
            newOp.selected ="selected"
        }else if(select.name =="to" && currcode=="INR"){
            newOp.selected ="selected"
        } 
        select.append(newOp)
  }
  select.addEventListener("change",(e)=>{
    updateFlag(e.target)
  })

}

const updateFlag=(element)=>{
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc
}



const updateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal <1){
        amtVal = 1;
        amount.value="1"
    }   
    // console.log(toCurr.value)
    const URL = `${BASE_URl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let res = await fetch(URL)
    let data = await res.json()
    let rate = data[toCurr.value.toLowerCase()]
    let finalAmount = amtVal*rate

    msg.innerText = `${amtVal} ${fromCurr.value} =${finalAmount} ${toCurr.value}`
}

btn.addEventListener("click",async(e)=>{
    e.preventDefault();
    updateExchangeRate()
   
    // console.log(data)
})

window.addEventListener("load",()=>{
    updateExchangeRate()
})