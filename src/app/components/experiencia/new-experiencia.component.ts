import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css']
})
export class NewExperienciaComponent implements OnInit{
  nombreE: string = '';
  descripcionE: string = '';
  imgE: string = '';

  constructor(private experienciaService: ExperienciaService, private router: Router, public imageService: ImageService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.imageService.clearUrl();

    this.experienciaService.getMax().subscribe(id => {
      console.log('El id actual es', id)
    })
  }

  onCreate(): void{
    this.imgE = this.imageService.url;
    const expe = new Experiencia(this.nombreE, this.descripcionE, this.imgE);
    this.experienciaService.save(expe).subscribe(data => {
      alert('Experiencia añadida');
      this.router.navigate(['']);
    }, err => {
      alert('Falló la creación de la nueva experiencia');
      this.router.navigate(['']);
    });
  }

  uploadImage($event: any){
      this.experienciaService.getMax().subscribe(id => {
        const name = "experiencia_" + id;
        this.imageService.uploadImage($event, name);  
      });
  };

  home(){
    this.router.navigate(['/']) 
  }
}
