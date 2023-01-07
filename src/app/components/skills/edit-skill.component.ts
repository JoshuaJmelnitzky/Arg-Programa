import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skills } from 'src/app/model/skills';
import { ImageService } from 'src/app/service/image.service';
import { SkillsService } from 'src/app/service/skills.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit{
  skill: Skills = null;

  constructor(private skillS: SkillsService, private activatedRoute:ActivatedRoute, private router: Router, public imageService: ImageService){}

  ngOnInit(): void {
    this.imageService.clearUrl();
    const id = this.activatedRoute.snapshot.params['id'];
    this.skillS.detail(id).subscribe(data => {
      this.skill = data;
    }, err => {
      alert("Error al modificar la habilidad");
      this.router.navigate(['']);
    });
  };

  onUpdate(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.skill.img = this.imageService.url;
    this.skillS.update(id, this.skill).subscribe(data => {
      this.router.navigate(['']);
    }, err => {
      alert("Error al modificar la habilidad");
      this.router.navigate(['']);
    })
  }

  uploadImage($event: any){
    const id = this.activatedRoute.snapshot.params['id'];
    const name = "skill_" + id;
    this.imageService.uploadImage($event, name);  
  }

  home(){
    this.router.navigate(['/']) 
  }
}
