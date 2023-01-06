export class Proyecto {
    id?: number;
    nombre: string;
    descripcion: string;
    link: string;
    img: string;

    constructor(nombre: string, descripcion: string, link: string, img: string){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.link = link;
        this.img = img;
    }
}
