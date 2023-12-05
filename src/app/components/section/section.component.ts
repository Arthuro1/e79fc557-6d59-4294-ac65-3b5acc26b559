import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.less'
})
export class SectionComponent implements OnInit{
  @Input() data!: any;
  @Input() addToCart!: boolean;
  @Output() sectionPosition = new EventEmitter();

  constructor(private element: ElementRef) {}

    ngOnInit() {
        this.sectionPosition.emit({ date: this.data.date, position: this.element.nativeElement.offsetTop });
    }


    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.sectionPosition.emit({ date: this.data.date, position: this.element.nativeElement.offsetTop });
    }

}
