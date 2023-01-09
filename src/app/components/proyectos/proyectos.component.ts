import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit{
  project: Proyecto[] = [];

  constructor(private proyectoService: ProyectoService, private tokenService: TokenService, public imageService: ImageService){}

  isLogged = false;

  ngOnInit(): void {
    this.cargarProyecto();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this. isLogged = false;
    }
  }

  cargarProyecto(): void{
    this.proyectoService.lista().subscribe(data => this.project = data);
  }

  delete(id?: number){
    if(id != undefined){
      this.proyectoService.detail(id).subscribe(data => this.imageService.delete(`proyecto_${data.id}`));
      this.proyectoService.delete(id).subscribe(data => {
          this.cargarProyecto();
      }, err => {
        alert('Error al borrar el proyecto');
      });
    }
  }

  onNavigate(url: string){ 
    window.open(`//${url}`, "_blank"); 
  }
}
