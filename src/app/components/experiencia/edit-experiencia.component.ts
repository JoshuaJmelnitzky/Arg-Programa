import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit{
  expLab: Experiencia = null;
  
  constructor(private experienciaService: ExperienciaService, private activatedRoute: ActivatedRoute, private router: Router, public imageService: ImageService){}

  ngOnInit(): void {
    this.imageService.clearUrl();
    const id = this.activatedRoute.snapshot.params['id']; 
    this.imageService.getImages(`experiencia_${id}`);
    this.experienciaService.detail(id).subscribe(data => {
      this.expLab = data;
    }, err => {
      alert("Error al actualizar la experiencia");
      this.router.navigate(['']);
    })
  }

  onUpdate(): void{
    const id = this.activatedRoute.snapshot.params['id'];
    this.expLab.imgE = this.imageService.url;
    this.experienciaService.update(id, this.expLab).subscribe(data => {
      this.router.navigate(['']);
    }, err => {
      alert("Error al actualizar la experiencia");
      this.router.navigate(['']);
    });
  }

  uploadImage($event: any){
    const id = this.activatedRoute.snapshot.params['id'];
    const name = "experiencia_" + id;
    this.imageService.uploadImage($event, name);  
  }

  home(){
    this.router.navigate(['/']) 
  }
}
