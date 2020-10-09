import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { IHit } from '../../interfaces/Pixabay.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  @ViewChild('myModal', { static: false }) myModal: ElementRef;

  @Input() image: IHit;

  modal: any = null;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
   // console.log(this.image);
  }

  openModel(content): void {
    this.modalService.open(content, { size: 'lg' });
  }

  bindModal(modal) {this.modal = modal;}

}
