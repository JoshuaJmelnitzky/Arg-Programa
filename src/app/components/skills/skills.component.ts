import { Component, OnInit } from '@angular/core';
import { Skills } from 'src/app/model/skills';
import { ImageService } from 'src/app/service/image.service';
import { SkillsService } from 'src/app/service/skills.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit{
  skill: Skills[] = [];

  constructor(private skillS: SkillsService, private tokenService: TokenService, public imageService: ImageService){}

  isLogged = false;

  ngOnInit(): void {
    this.cargarSkills();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  cargarSkills(): void{
    this.skillS.lista().subscribe(data => {
      this.skill = data;
    });
  }

  delete(id: number): void{
    if(id != undefined){
      this.skillS.detail(id).subscribe(data => this.imageService.delete(data.nombre));
      this.skillS.delete(id).subscribe(data => {
        this.cargarSkills();
      }, err => {
        alert("Error al borrar habilidad");
      });
    };
  };
}
