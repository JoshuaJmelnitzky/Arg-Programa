import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-update-proyecto',
  templateUrl: './update-proyecto.component.html',
  styleUrls: ['./update-proyecto.component.css']
})
export class UpdateProyectoComponent implements OnInit{
  project: Proyecto = null;

  constructor(private proyectoService: ProyectoService, private activatedRoute: ActivatedRoute, private router: Router, public imageService: ImageService){}

  ngOnInit(): void {
    this.imageService.clearUrl();
    const id = this.activatedRoute.snapshot.params['id']; 
    this.proyectoService.detail(id).subscribe(data => {
      this.project = data;
    }, err => {
      alert("Error al actualizar el proyecto");
      this.router.navigate(['']);
    })
  }

  onUpdate(): void{
    const id = this.activatedRoute.snapshot.params['id'];
    this.project.img = this.imageService.url;
    this.proyectoService.update(id, this.project).subscribe(data => {
      this.router.navigate(['']);
    }, err => {
      alert("Error al actualizar el proyecto");
      this.router.navigate(['']);
    });
  }

  uploadImage($event: any){
    const id = this.activatedRoute.snapshot.params['id'];
    const name = "proyecto_" + id;
    this.imageService.uploadImage($event, name);  
  }

  home(){
    this.router.navigate(['/']) 
  }
}
