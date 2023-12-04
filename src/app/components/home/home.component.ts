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

  constructor(private http: HttpClient, private eventsService: EventsService) {}
  
  ngOnInit(): void {
    this.getEvents();

    this.eventsService.change.subscribe(filteredEvents => {
      this.events = filteredEvents;
      this.resultData = of(this.groupByDate(filteredEvents));
    });
  }

  getEvents() {
    this.eventsService.getAllEvents()
    .subscribe((events: any) => {
      this.events = this.sortByDate(events);
      this.city = events[0].city;
      this.startDate = events[0].date;
      this.endDate = events[events.length - 1].date;
      
      console.log("-", this.events);
      
      this.resultData = of(this.groupByDate(this.events));
    });
  }

  sortByDate(events: Event[]): Event[]{
    const sortedAscEvents = events.sort(
      (objA, objB) => new Date(objA.date).getTime() - new Date(objB.date).getTime(), 
    );

    return sortedAscEvents;
  }

  groupByDate(events: Event[]): any {
    const data = new Set(events.map((item: Event) => item.startTime))
    let resultData: { date: string; events: Event[]; }[] = [];
    data.forEach((date) => {
      resultData.push({
        date: date, 
        events: events.filter((i: Event) => i.startTime === date)
      });
    });

    console.log("data", data);
    console.log("resultData", resultData);

    return resultData;
  }
}
