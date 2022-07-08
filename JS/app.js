import {Car} from './CarClass.js';
import {viewCarAll, viewCarFilter} from './FunctionCars.js';

$(document).ready(function() {
    let carsFilter = [];
    const car = new Car('./carsJSON.json'); // inicializamos el objeto car
    let  groupCars  = null


    //Visibilidad de lista de grupos de coches
    $('.select').click(()=>{

        $('.triangulo').css({visibility:"visible"});
        $('.list-group').css({visibility:"visible"});

        $('.list-group').toggle()
        $('.triangulo').toggle()
    })



    // Muestra todos los coches
    car.getAllCar()
    .then(cars => {
        cars.map(car => {
            viewCarAll(car);
        })
    })
    .catch(err => console.log(err))


//Muestra los coches filtrados por grupo
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
                carsFilter.push(e.target.value);

                switch(e.target.value){
                    case 'Automatic':
                        $('#Manual').prop('disabled', true);
                        break;
                    case 'Manual':
                        $('#Automatic').prop('disabled', true);
                        break;
                    case '7':
                        $('#seats').prop('disabled', true);
                        break;
                    case '5':
                        $('#seats2').prop('disabled', true);
                        break;
                }
            }
            
            else{
                carsFilter.splice(carsFilter.indexOf(e.target.value),1);

                switch(e.target.value){
                    case 'Automatic':
                        $('#Manual').prop('disabled', false);
                        break;
                    case 'Manual':
                        $('#Automatic').prop('disabled', false);
                        break;
                    case '7':
                        $('#seats').prop('disabled', false);
                        break;
                    case '5':
                        $('#seats2').prop('disabled', false);
                        break;
                }
            }


                console.log(carsFilter);


                const cars =  await car.getAllCar()

                
                let carsfilterM = []

                cars.map((car) => {

                    if(carsFilter.includes(car.Company1.Features2.seats) || carsFilter.includes(car.Company1.Features2.transmition) || carsFilter.includes(car.Company1.Features2.category)){

                            carsfilterM.push(car.Company1);
                    }

                    if(carsFilter.includes(car.Company2.Features2.seats) || carsFilter.includes(car.Company2.Features2.transmition) || carsFilter.includes(car.Company2.Features2.category)){

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
