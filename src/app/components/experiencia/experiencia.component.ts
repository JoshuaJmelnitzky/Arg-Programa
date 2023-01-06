import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { ImageService } from 'src/app/service/image.service';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experiencia: Experiencia[] = [];
  
  constructor(private experienciaService: ExperienciaService, private tokenService: TokenService, public imageService: ImageService) { }

  isLogged = false;

  ngOnInit(): void {
    this.cargarExperiencia();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this. isLogged = false;
    }
  } 

  cargarExperiencia(): void{
    this.experienciaService.lista().subscribe(data => this.experiencia = data);
  }

  delete(id?: number){
    if(id != undefined){
      this.experienciaService.detail(id).subscribe(data => this.imageService.delete(data.nombreE));
      this.experienciaService.delete(id).subscribe(data => {
          this.cargarExperiencia();
      }, err => {
        alert('Error al borrar la experiencia');
      });
    }
  }
}


