import { Component, OnInit, Input } from '@angular/core';
import { IHit } from '../../interfaces/Pixabay.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  /**
   * Get image from API
   */
  @Input() image: IHit;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Split string of tags to separate them
   * @param tags
   */
  splitTags(tags: string): string[]{
    return tags.split(',');
  }

}
