import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-update-educacion',
  templateUrl: './update-educacion.component.html',
  styleUrls: ['./update-educacion.component.css']
})
export class UpdateEducacionComponent implements OnInit{
  educacion: Educacion = null;
  
  constructor(private educacionService: EducacionService, private activatedRoute: ActivatedRoute, private router: Router, public imageService: ImageService){}

  ngOnInit(): void {
    this.imageService.clearUrl();
    const id = this.activatedRoute.snapshot.params['id'];
    this.educacionService.detail(id).subscribe(data => {
      this.educacion = data;
    }, err => {
      alert('Error al modifica educación');
      this.router.navigate(['']);
    })
  }

  onUpdate(): void{
    const id = this.activatedRoute.snapshot.params['id'];
    this.educacion.imgE = this.imageService.url;
    this.educacionService.update(id,this.educacion).subscribe(data => {
      this.router.navigate(['']);
    }, err => {
      alert('Error al modificar la educación');
      this.router.navigate(['']);
    });  
  };

  uploadImage($event: any){
    const id = this.activatedRoute.snapshot.params['id'];
    const name = "educacion_" + id;
    this.imageService.uploadImage($event, name);  
  }

  home(){
    this.router.navigate(['/']) 
  }
}
