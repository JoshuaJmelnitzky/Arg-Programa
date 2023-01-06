export class Skills {
    id: number;
    nombre: string;
    porcentaje: number;
    img: string;

    constructor(nombre:string, porcentaje: number, img: string){
        this.nombre = nombre;
        this.porcentaje = porcentaje;
        this.img = img;
    }
}
