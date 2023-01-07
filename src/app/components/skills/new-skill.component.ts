import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skills } from 'src/app/model/skills';
import { ImageService } from 'src/app/service/image.service';
import { SkillsService } from 'src/app/service/skills.service';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent implements OnInit{
  nombre: string = '';
  porcentaje: number;
  img: string = '';

  constructor(private skillS: SkillsService, private router: Router, public imageService: ImageService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.imageService.clearUrl();
  }

  onCreate(): void{
    this.img = this.imageService.url;
    const skill = new Skills(this.nombre, this.porcentaje, this.img);
    this.skillS.save(skill).subscribe(data => {
      alert("Habilidad creada correctamente");
      this.router.navigate(['']);
    }, err => {
      alert("Error al crear habilidad");
      this.router.navigate(['']);
    });
  };

  uploadImage($event: any){
    const name = "skills_" + this.nombre;
    this.imageService.uploadImage($event, name);  
  }

  home(){
    this.router.navigate(['/']) 
  }
}
