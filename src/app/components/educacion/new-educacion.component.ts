import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-new-educacion',
  templateUrl: './new-educacion.component.html',
  styleUrls: ['./new-educacion.component.css']
})
export class NewEducacionComponent implements OnInit{
  nombreE: string;
  descripcionE: string;
  imgE: string;

  constructor(private educacionService: EducacionService, private router: Router, private activatedRoute: ActivatedRoute, public imageService: ImageService){}

  ngOnInit(): void {
    this.imageService.clearUrl();
  }

  onCreate(): void{
    this.imgE = this.imageService.url;
    const educacion = new Educacion(this.nombreE, this.descripcionE, this.imgE);
    this.educacionService.save(educacion).subscribe(data => {
      alert("Educación agregada correctamente");
      this.router.navigate(['']);
    }, err => {
      alert("Error al agregar educación");
      this.router.navigate(['']);
    })
  }

  uploadImage($event: any){
    const name = "educacion_" + this.nombreE;
    this.imageService.uploadImage($event, name);  
  }
}
