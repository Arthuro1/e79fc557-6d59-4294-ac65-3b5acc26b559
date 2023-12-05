import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from '../../models/event.model';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.less'
})
export class ShoppingCartComponent implements OnInit{

  myEvents!: Event[];
  resultData!: Observable<any>;
  city!: Observable<string | undefined>;
  startDate!: Observable<string | undefined>;
  endDate!: Observable<string | undefined>;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.getData();

    this.eventsService.myEventsChange.subscribe(myEvents => {
      this.myEvents = myEvents;
      this.resultData = of(this.eventsService.groupByDate(myEvents));
      this.getData();
    });
  }

  getData(){
    this.myEvents = this.eventsService.myEvents;
    if(this.myEvents.length > 0) {
      this.myEvents = this.eventsService.sortByDate(this.myEvents);
      this.city = of(this.myEvents[0].city);
      this.startDate = of(this.myEvents[0].date);
      this.endDate = of(this.myEvents[this.myEvents.length - 1].date);
      this.resultData = of(this.eventsService.groupByDate(this.myEvents));
    }
  }
}

