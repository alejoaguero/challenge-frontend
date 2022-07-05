// Clase car para filtrar los autos 


export class Car{
    constructor(url){
        this.url = url;
    }


    async getAllCar(obj){
        try{
        const response = await fetch(this.url);
        const data = await response.json();
        const cars = [] 


            for (const group in data.cars){
                cars.push({group, ...data.cars[group]});
            }

        return cars
        }
        catch(err){
            console.log(err)
        }
    }

    async getCarByGroup(group){
        try{
            const data = await this.getAllCar();
            let cars
            const grupo = data.filter(car => car.group == group);

            if(grupo.length > 0){
                cars = grupo;
            }
                else{
                    cars = data;
                }

                return cars
        }
        catch(err){
            console.log(err)
        }
    }

    
}