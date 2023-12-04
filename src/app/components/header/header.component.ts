import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent implements OnInit{ 
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  events!: Event[];

  constructor(public http: HttpClient, public eventsService: EventsService) { }

  ngOnInit() {
    this.getEvents();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    if(value == "") return [];

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  getEvents() {
    this.eventsService.getAllEvents()
    .subscribe((events: any) => {
      this.events = events;
      console.log("This.getEvents", this.events);

      this.options = this.events.map((event :Event) => {
        return event.title;
      });

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });
  }

}
