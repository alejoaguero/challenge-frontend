// Clase car para filtrar los autos 


export class Car{
    constructor(url){
        this.url = url;
    }


    async getAllCar(obj){
        const response = await fetch(this.url);
        const data = await response.json();
        const cars = [] 


            for (const group in data.cars){
                cars.push({group, ...data.cars[group]});
            }

        return cars
    }

    async getCarByGroup(group){
        const data = await this.getAllCar();
        let cars
        const grupo = data.filter(car => car.group == group);

        if(grupo.length > 0){
            cars = grupo;
        }
            else{
                cars = data;
            }

            return cars;
    }


    async getCarByInfo(obj){
        const data = await this.getAllCar();
        

    }
}