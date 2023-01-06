import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { ImageService } from 'src/app/service/image.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacion: Educacion[] = [];

  constructor(private educacionService: EducacionService, private tokenService: TokenService, public imageService: ImageService) { }
  isLogged = false;

  ngOnInit(): void {
    this.cargarEducacion();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  cargarEducacion(): void{
    this.educacionService.lista().subscribe(data => {
      this.educacion = data;
    });
  }

  delete(id?: number){
    if(id != undefined){
      this.educacionService.detail(id).subscribe(data => this.imageService.delete(data.nombreE));
      this.educacionService.delete(id).subscribe(data => {
        this.cargarEducacion();
      }, err => {
        alert('Error al eliminar educación');
      });
    };
  }
}
