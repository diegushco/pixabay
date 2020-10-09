import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, OnChanges {

  /**
   * Total number of images
   */
  @Input() total: number;

  /**
   * Actual page
   */
  @Input() actualPage;

  /**
   * Variable to send the parent the quantity
   */
  @Output() pages = new EventEmitter();

  /**
   * Number of images by default
   */
  defaultByPage = 20;

  /**
   * number of pages per search
   */
  numberOfPages = 0;

  /**
   * variable to handle high page number for pagination
   */
  higher = 1;

  /**
   * variable to handle lower page number for pagination
   */
  lower = 1;

  /**
   * Array to simulate the pages
   */
  arrayElement: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.numberOfPages = (this.total / this.defaultByPage) as number;
    this.fillCount();
    this.calculatedShowNumbers();
  }

  /**
   * Button back in pagination, go one page back
   */
  back(): void{
    if ((this.actualPage - 1) >= 1){
      this.actualPage -= 1;
      this.pages.emit(this.actualPage);
    }
    this.calculatedShowNumbers();
  }

  /**
   * Fill array with pages to simulate
   */
  fillCount(): void{
    this.arrayElement = Array.from(Array(this.numberOfPages).keys());
  }

  /**
   * Button next in pagination, go one page next
   */
  next(): void{
    if ((this.actualPage + 1) <= this.numberOfPages){
      this.actualPage += 1;
      this.pages.emit(this.actualPage);
    }
    this.calculatedShowNumbers();
  }

  /**
   * Change of page
   * @param page number page
   */
  page(page: number): void{
    this.actualPage = page;
    this.pages.emit(this.actualPage);
    this.calculatedShowNumbers();
  }

  /**
   * Update values for page simulation rendering
   */
  calculatedShowNumbers(): void{
    if((this.actualPage - 2) > 0){
      this.lower =  this.actualPage - 2;
    }

    if((this.actualPage + 2) <= this.numberOfPages){
      this.higher =  this.actualPage + 2;
    }
  }

  /**
   * life cycle, to detect when the page is changed
   * @param change variable with all variables for this component
   */
  ngOnChanges(change:any) {
    if (change.actualPage.previousValue && change.actualPage.currentValue !== change.actualPage.previousValue){
      this.lower = (this.actualPage - 2) > 0 ? this.lower =  this.actualPage - 2 : this.higher = 1;
      this.higher = (this.actualPage + 2) <= this.numberOfPages ? this.higher =  this.actualPage + 2 : this.higher = this.higher;
      this.arrayElement = [...this.arrayElement];
    }
  }
}
