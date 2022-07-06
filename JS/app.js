import {Car} from './CarClass.js';
import {viewCar} from './FunctionCars.js';

$(document).ready(function() {
    let carsFilter = [];
    const car = new Car('./carsJSON.json');

    $('.select').click(()=>{

        $('.triangulo').css({visibility:"visible"});
        $('.list-group').css({visibility:"visible"});
    })




    car.getAllCar()
    .then(cars => {
        cars.map(car => {
            viewCar(car);
        })
    })
    .catch(err => console.log(err))




    $('.select ul').click( async (e)=>{
        const group = e.target.id;
        const cars = await car.getCarByGroup(group);


        $('.select_info p').text(`${e.target.textContent}`);
        


        $('#carList').html('');

        cars.map(car => {
            viewCar(car);
        })

    })

    $('.select').click(()=>{
        $('.list-group').toggle()
        $('.triangulo').toggle()    
    })

    $('input[type=checkbox]').on('change',async (e)=>{

            if($(`#${e.target.id}`).prop('checked')){
                carsFilter.push(e.target.id);
            }
            
            else{
                carsFilter.splice(carsFilter.indexOf(e.target.id),1);
            }


                console.log(carsFilter);


                const cars =  await car.getAllCar()

                

                let carsfilterM = cars.filter((car) => {
                    if(carsFilter.includes(car.Company1.Features2.seats) || carsFilter.includes(car.Company1.Features2.transmition) || carsFilter.includes(car.Company1.Features2.category)){
                        
                            return car; 
                    }   
                        if(carsFilter.includes(car.Company2.Features2.seats) || carsFilter.includes(car.Company2.Features2. transmition) || carsFilter.includes(car.Company2.Features2.category)){

                            return car;

                        }

                })

                
                carsFilter.length == [] ? carsfilterM = cars : ""
                



                $('#carList').html('');
                carsfilterM.map(car => {
                    viewCar(car);
                })
    })








})