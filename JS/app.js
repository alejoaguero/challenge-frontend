import {Car} from './CarClass.js';
import {viewCar} from './FunctionCars.js';

$(document).ready(function() {

    const car = new Car('./carsJSON.json');

    car.getAllCar()
        .then(cars => {
            cars.map(car => {
                viewCar(car);
            })
        })
        .catch(err => console.log(err))


    $('#selectGroup').click(function(e) {

        $('#carList').html(' '); 

        const group = e.target.value;

        car.getCarByGroup(group)
            .then(cars => {
                const carList = cars.map(car => {
                    viewCar(car);

                    console.log(car);
                })  
            })
    })



    $("#filter").click(function(e) {    
            if(e.target.value == 'on'){
                console.log(e.target.name);
            }
    })
})