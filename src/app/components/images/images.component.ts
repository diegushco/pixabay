import { Component, OnInit, Input } from '@angular/core';
import { IHit } from '../../interfaces/Pixabay.interface';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  @Input() image: IHit;

  constructor() { }

  ngOnInit(): void {
    console.log(this.image);
  }

}
