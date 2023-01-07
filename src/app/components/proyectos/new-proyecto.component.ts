import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent implements OnInit{
  nombre: string = '';
  descripcion: string = '';
  link: string = '';
  img: string = '';

  constructor(private proyectoService: ProyectoService, private router: Router, private activatedRoute: ActivatedRoute, public imageService: ImageService){}

  ngOnInit(): void {
    this.imageService.clearUrl();
  }

  
  onCreate(): void{
    this.img = this.imageService.url;
    const proy = new Proyecto(this.nombre, this.descripcion, this.link, this.img);
    this.proyectoService.save(proy).subscribe(data => {
      alert('Proyecto añadido');
      this.router.navigate(['']);
    }, err => {
      alert('Falló la creación del nuevo proyecto');
      this.router.navigate(['']);
    });
  }

  uploadImage($event: any){
    const name = "proyecto_" + this.nombre;
    this.imageService.uploadImage($event, name);  
  }

  home(){
    this.router.navigate(['/']) 
  }
}
