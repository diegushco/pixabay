import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() total: number;

  @Input() actualPage;

  @Output() pages = new EventEmitter();

  defaultByPage = 20;

  numberOfPages = 0;

  higher = 1;

  lower = 1;

  arrayElement: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.numberOfPages = (this.total / this.defaultByPage) as number;
    this.fillCount();
    this.calculatedShowNumbers();
  }

  back(): void{
    if ((this.actualPage - 1) >= 1){
      this.actualPage -= 1;
      this.pages.emit(this.actualPage);
    }
    this.calculatedShowNumbers();
  }

  fillCount(): void{
    this.arrayElement = Array.from(Array(this.numberOfPages).keys());
  }

  next(): void{
    if ((this.actualPage + 1) <= this.numberOfPages){
      this.actualPage += 1;
      this.pages.emit(this.actualPage);
    }
    this.calculatedShowNumbers();
  }

  page(page: number): void{
    this.actualPage = page;
    this.pages.emit(this.actualPage);
    this.calculatedShowNumbers();
  }

  calculatedShowNumbers(): void{
    if((this.actualPage - 2) > 0){
      this.lower =  this.actualPage - 2;
    }

    if((this.actualPage + 2) <= this.numberOfPages){
      this.higher =  this.actualPage + 2;
    }
  }

  ngOnChanges(change:any) {
    if (change.actualPage.previousValue && change.actualPage.currentValue !== change.actualPage.previousValue){
      this.lower = (this.actualPage - 2) > 0 ? this.lower =  this.actualPage - 2 : this.higher = 1;
      this.higher = (this.actualPage + 2) <= this.numberOfPages ? this.higher =  this.actualPage + 2 : this.higher = this.higher;
      this.arrayElement = [...this.arrayElement];
    }
  }
}
