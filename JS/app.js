import {Car} from './CarClass.js';
import {viewCarAll, viewCarFilter} from './FunctionCars.js';

$(document).ready(function() {
    let carsFilter = [];
    const car = new Car('./carsJSON.json');
    let  groupCars  = null

    $('.select').click(()=>{

        $('.triangulo').css({visibility:"visible"});
        $('.list-group').css({visibility:"visible"});

        $('.list-group').toggle()
        $('.triangulo').toggle()
    })




    car.getAllCar()
    .then(cars => {
        cars.map(car => {
            viewCarAll(car);
        })
    })
    .catch(err => console.log(err))



$('.select ul').click( async(e)=>{
        const group = e.target.id;

        groupCars = await car.getCarByGroup(group);

        console.log(e.target.id);

        $('.select_info p').text(`${e.target.textContent}`);
        


        $('#carList').html('');


        groupCars.map(car => {
            viewCarAll(car);
        })

    })

    $('.select-check').on('change',async (e)=>{
        

            if($(`#${e.target.id}`).prop('checked')){
                console.log(e.target.value)                
                carsFilter.push(e.target.value);
            }
            
            else{
                carsFilter.splice(carsFilter.indexOf(e.target.value),1);
            }


                console.log(carsFilter);


                const cars =  await car.getAllCar()

                
                let carsfilterM = []

                cars.map((car) => {

                    if(carsFilter.includes(car.Company1.Features2.seats) || carsFilter.includes(car.Company1.Features2.transmition) || carsFilter.includes(car.Company1.Features2.category) && carsFilter.includes(car.Company1.VehGroup)){

                            carsfilterM.push(car.Company1);
                    }

                    if(carsFilter.includes(car.Company2.Features2.seats) || carsFilter.includes(car.Company2.Features2. transmition) || carsFilter.includes(car.Company2.Features2.category)){

                            carsfilterM.push(car.Company2);

                    }
                })

                $('#carList').html('');

                if(carsFilter.length !== 0){
                    carsfilterM.map(car => {
                              viewCarFilter(car);
                    })
                }
                    else{
                        carsfilterM = cars
                        carsfilterM.map(car => {
                            viewCarAll(car);
                        })
                    }
    })








})