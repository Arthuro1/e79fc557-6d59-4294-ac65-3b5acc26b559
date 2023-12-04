import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { HttpClient } from '@angular/common/http';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit{
  title = "TecLead";
  events: Event[] = [];
  resultData: any = [];
  city: string = "";
  startDate: string | undefined;
  endDate: string | undefined;

  constructor(private http: HttpClient, private eventsService: EventsService) {}
  
  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventsService.getAllEvents()
    .subscribe((events: any) => {
      this.events = events;
      this.events = this.sortByDate(this.events);
      this.city = this.events[0].city;
      this.startDate = this.events[0].date;
      this.endDate = this.events[this.events.length - 1].date;
      console.log("-", this.events)

      const data = new Set(this.events.map(item => item.startTime))
      data.forEach((date)=>{
           this.resultData.push({
              date: date, 
              events: this.events.filter(i => i.startTime === date)
            })
      })
      console.log("data", data)
      console.log("resultData", this.resultData)
    });
  }

  sortByDate(events: Event[]): Event[]{
    const sortedAscEvents = events.sort(
      (objA, objB) => new Date(objA.date).getTime() - new Date(objB.date).getTime(),
      
    );
    return sortedAscEvents;
  }
}
