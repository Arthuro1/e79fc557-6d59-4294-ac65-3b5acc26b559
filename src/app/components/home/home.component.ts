import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { HttpClient } from '@angular/common/http';
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
  city: string = "";
  startDate: string | undefined;
  endDate: string | undefined;

  constructor(private eventsService: EventsService) {}
  
  ngOnInit(): void {
    this.getEvents();

    this.eventsService.inputChange.subscribe(filteredEvents => {
      this.events = filteredEvents;
      this.resultData = of(this.eventsService.groupByDate(filteredEvents));
    });
  }

  getEvents() {
    this.eventsService.getAllEvents()
      .subscribe((events: any) => {
        this.events = this.eventsService.sortByDate(events);
        this.city = events[0].city;
        this.startDate = events[0].date;
        this.endDate = events[events.length - 1].date;
        
        console.log("-", this.events);
        
        this.resultData = of(this.eventsService.groupByDate(this.events));
      });
  }
}
