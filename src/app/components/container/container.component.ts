import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.less'
})
export class ContainerComponent implements OnInit{
  public currentSectionName: string | undefined;
  private sectionsIndex: any = [];
  @Input() resultData!: Observable<any>;
  @Input() addToCart!: boolean;

  constructor( private el: ElementRef) { }

  ngOnInit() {
  }

  sectionPosition($event: any) {
      //filter out the old position if it has been set
      this.sectionsIndex = this.sectionsIndex.filter((item: any) => item.date != $event.date);
      //set the new position
      this.sectionsIndex.push($event);
      //sort the section based on their apperance order 
      this.sectionsIndex.sort((a: any, b: any) => {
          return b.position - a.position;
      });

      //if the page has already been scrolled find the current name
      if (document.body.scrollTop > 0) {
          this.currentSectionName = this.getCurrentSectionName();
      }
  }


  @HostListener("window:scroll", [])
  onWindowScroll() {
      this.currentSectionName = this.getCurrentSectionName();
  }

  private getCurrentSectionName(): string | undefined {
      let offset: number = this.el.nativeElement.parentElement.offsetTop - this.el.nativeElement.offsetTop;
      for (let section of this.sectionsIndex) {
          if ((section.position - offset - window.scrollY) < 0) {
              return section.date;
          }
      }
      return undefined;
  }

}
