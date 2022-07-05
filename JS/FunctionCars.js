//Funciones

//Destructura y asigna las variables a los elementos del DOM
export const viewCar = (car) =>{

    const {Name: name1,VehGroup:group1,Features2: feature1,Rates: rates1,Code:code1,PictureURL:urlImg1} = car.Company1;
    const {Name: name2,VehGroup:group2,Features2: feature2,Rates: rates2,Code:code2,PictureURL:urlImg2} = car.Company2;


        $('#carList').append(boxCar(name1,group1,feature1,rates1,code1,urlImg1));
        $('#carList').append(boxCar(name2,group2,feature2,rates2,code2,urlImg2));

            if(car == ' '){
                $('#carList').append(`<div class="card_cars">
                <h4>No hay autos disponibles</h4>
                </div>`)
            }

}        





//Crea el HTML de cada auto
const boxCar = (name,grupo,features,rate,code,url) => {

return  `<div class="card_cars">
            <img src="${url}" alt="${features.thumb}" class="card_img">
            <div class="card_titles">
                <h4>${features.category}</h4>
                <h6>GROUP ${grupo} (${code})</h6>
                <h6>${name.toUpperCase()}</h6>
            </div>
            <div class="card_button">
                <button class="btn btn-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/> 
                     </svg>
                    Book Now!
                </button>
            </div>
            <div class="card_caract">
                <h6>CHARACTERISTICS</h6>
                <div>
                    <img src="./assets/images/seats.svg" alt="seats"></img>
                    <p>${features.seats} seats</p>
                </div>  
                <div>
                    <img src="./assets/images/luggage.svg" alt="luggage"></img>
                    <p>${features.largeSuitcase} large suitcase</p>
                </div>
                <div>
                    <img src="./assets/images/bag.svg" alt="bag"></img>
                    <p>${features.smallSuitcase} small suitcase</p>
                </div>
                <div>
                    <img src="./assets/images/door.svg" alt="door"></img>
                    <p>${features.doors} doors</p>
                </div>
                <div>
                    <img src="./assets/images/transmision.svg" alt="transmision"></img>
                    <p>${features.transmition} transmission</p>
                </div>
                <div>
                    <img src="./assets/images/air-conditioning.svg" alt="air"></img>
                    <p>${features.air}</p>
                </div>
            </div>
            <div class="card_rates">
            <h6>AVAILABLE RATES</h6>
            ${boxRates(rate)}
            ${modalRates(rate)}
           </div> 
        </div>`
}

//Crea el HTML de las tarifas
const boxRates = (rates) => {
    
    let listRates = ''; 


    for (const rate in rates) {
        const {RateData:rateData, EstimatedTotalAmount: totamAmount,CurrencyCode: money} = rates[rate]
        let  total = totamAmount.toFixed(2);        
         listRates += `<div class="rates">
                            <div>
                                <div class="boxCheck">
                                    <input type="checkbox" class="checkbox-round" id='rate-${rate}'>
                                </div>
                                <label for='rate-${rate}'>${rate} -  ${rateData.name}</label>
                            </div>
                            <a class="rate-inclusions" data-toggle="modal" data-target="#exampleModal">Rate Inclusions</a>
                            <p class="rate-price"><span>${money}</span>${total}</p>
                        </div>
                        `
                
        }
   
    return listRates;

}

// Crea el HTML del modal
const modalRates = (rates) =>{
    let modulRates = ""
    for (const rate in rates) {
        const {name,inclusions} = rates[rate].RateData
        
         modulRates += ` 
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                <div>
                                    <p>Rate Information</p>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" class="">&times;</span>
                                  </button>
                                </div>
                                 <p class="modal-title" id="exampleModalLabel">${rate} - ${name}</p>
                                </div>
                                <div class="modal-body">
                                 <p>${inclusionsFor(inclusions)}<p> 
                                </div>
                              </div>
                            </div>
                        </div>`
                
        }

    return modulRates;
}
// Itera el array de inclusiones
const inclusionsFor = (inclusions) =>{
    let listInclusions = ''; 
    for (const inclusion in inclusions) {
        listInclusions += `
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                            <p>${inclusions[inclusion]}</p>
                        </div>
                        `
    }
    return listInclusions;
}