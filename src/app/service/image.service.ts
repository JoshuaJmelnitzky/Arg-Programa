import { Injectable } from '@angular/core';
import { deleteObject, getDownloadURL, list, listAll, ref, Storage, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string = "";

  constructor(private storage: Storage) { }

  public uploadImage($event: any, name: string){
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `imagen/` + name);
    uploadBytes(imgRef, file)
      .then(res => {
        this.getImages(name);
      })
      .catch(err => console.log(err));
  }

  async getImages(name: string){
    const imagesRef = ref(this.storage, `imagen/${name}`);
    await getDownloadURL(imagesRef)
      .then(res => this.url = res)
      .catch(err => console.log(err));
  }

  clearUrl() {
    this.url = "";
  }

  public delete(name: string){
    const imagesRef = ref(this.storage, `imagen/experiencia_${name}`); 
    deleteObject(imagesRef);
  }
  
}
