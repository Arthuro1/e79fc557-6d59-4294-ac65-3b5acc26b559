import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit{
  title = "TecLead";
  events: Event[] = [];
  
  constructor(private http: HttpClient, private eventsService: EventsService) {}
  
  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventsService.getAllEvents()
    .subscribe((events: any) => {
      this.events = events;
    });
  }
}
