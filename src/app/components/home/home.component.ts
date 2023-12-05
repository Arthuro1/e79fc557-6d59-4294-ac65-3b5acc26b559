import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit{
  events!: Event[];
  resultData!: Observable<any>;
  city!: Observable<string | undefined>;
  startDate!: Observable<string | undefined>;
  endDate!: Observable<string | undefined>;

  constructor(private eventsService: EventsService) {}
  
  ngOnInit(): void {
    this.getEvents();

    this.eventsService.inputChange.subscribe(filteredEvents => {
      this.events = this.eventsService.sortByDate(filteredEvents);
      this.resultData = of(this.eventsService.groupByDate(this.events));
    });
  }

  getEvents() {
    this.eventsService.getAllEvents()
      .subscribe((events: any) => {
        this.events = this.eventsService.sortByDate(events);
        this.city = of(events[0].city);
        this.startDate = of(events[0].startTime);
        this.endDate = of(events[events.length - 1].startTime);
                
        this.resultData = of(this.eventsService.groupByDate(this.events));
      });
  }
}
