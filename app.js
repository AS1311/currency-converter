// const base_url= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const api= 'https://v6.exchangerate-api.com/v6/278fd3cc0fe9cb0f0cf5f42b/latest/USD';

const dropdowns= document.querySelectorAll(".dropdown select");
const btn= document.querySelector('form button');
const fromcurr= document.querySelector(".from select");
const tocurr= document.querySelector(".to select");
const msg= document.querySelector(".msg");

for(let select of dropdowns ){
    for(let currcode in countryList){
         let newoption= document.createElement("option");
        newoption.innerText= currcode;
        newoption.value= currcode;
        select.append(newoption);
        if(select.name==="from" && currcode==="USD")
            newoption.selected="selected";
        else if(select.name==="to" && currcode==="INR")
            newoption.selected= "selected";
         select.append(newoption);
        }
        select.addEventListener("change",(evt)=>{
            updateflag(evt.target);
        });

}

const updateExchangeRate = ()=>{
    let amount= document.querySelector(".amount input"); 
 let amtval= amount.value;
 if(amtval==="" || amtval <0)
   { amtval=1;
     amount.value= "1";
   }

    // const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromcurr}.json`;

    if(amtval.length!=0){
      fetch(api)
      .then((resp)=>resp.json())
      .then((data)=>{
        let fromExgRate= data.conversion_rates[fromcurr.value];
        let toExgRate= data.conversion_rates[tocurr.value];
        let covertedamt= (amtval/fromExgRate)*toExgRate;
        msg.innerText = `${amtval} ${fromcurr.value} = ${covertedamt.toFixed(2)} ${tocurr.value}`;
        // console.log(covertedamt.toFixed(2));
      })
    }




// const URL=  base_url+'/'+fromcurr.value.toLowerCase()+'.json';
// let response= await fetch(URL);
// let data = await response.json();
// let rate= data[tocurr.value.toLowerCase()];
// let finalamount= amtval*rate;
//  console.log(rate);
//  console.log(amtval);
// msg.innerText=  amtval+'    ' + fromcurr.value + '=' + finalamount + '    '+ tocurr.value ;


}

const updateflag=(element)=>{
    let currcode= element.value;
    let countryCode= countryList[currcode];
    let newsrc= "https://flagsapi.com/"+countryCode+"/flat/64.png" ;
    let img= element.parentElement.querySelector("img");
    img.src= newsrc;
};

btn.addEventListener("click", (evt)=>{
 evt.preventDefault();
 updateExchangeRate();

})

window.addEventListener('load',()=>{
    updateExchangeRate();
});