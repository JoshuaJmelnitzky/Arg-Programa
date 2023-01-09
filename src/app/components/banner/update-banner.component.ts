import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Banner } from 'src/app/model/banner';
import { BannerService } from 'src/app/service/banner.service';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-update-banner',
  templateUrl: './update-banner.component.html',
  styleUrls: ['./update-banner.component.css']
})
export class UpdateBannerComponent implements OnInit{
  banner: Banner = null;

  constructor(private activatedRoute: ActivatedRoute, private bannerService: BannerService, private router: Router, public imageService: ImageService){}

  ngOnInit(): void {
    this.imageService.clearUrl();
    const id = this.activatedRoute.snapshot.params['id'];
    this.imageService.getImages(`banner_${id}`);
    this.bannerService.detail(id).subscribe(data => {
      this.banner = data;
    }, err => {
      alert('Error al modificar el banner');
      this.router.navigate(['']);
    })
  }

  onUpdate(): void{
    const id = this.activatedRoute.snapshot.params['id'];
    this.banner.img = this.imageService.url;
    this.bannerService.update(id,this.banner).subscribe(data => {
      this.router.navigate(['']);
    }, err => {
      alert('Error al modificar el banner');
      this.router.navigate(['']);
    });  
  };

  uploadImage($event: any){
    const id = this.activatedRoute.snapshot.params['id'];
    const name = "banner_" + id;
    this.imageService.uploadImage($event, name);  
  }

  home(){
    this.router.navigate(['/']) 
  }
}
