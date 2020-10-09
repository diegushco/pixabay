import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { IHit } from '../../interfaces/Pixabay.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  /**
   * To save image from api
   */
  @Input() image: IHit;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
   // console.log(this.image);
  }

  /**
   * Open modal for this image
   */
  openModel(content): void {
    this.modalService.open(content, { size: 'lg' });
  }

}
