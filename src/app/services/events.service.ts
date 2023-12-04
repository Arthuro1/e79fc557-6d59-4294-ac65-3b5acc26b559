import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Event } from '../models/event.model';
import { Observable, throwError } from 'rxjs';
import { Venue } from '../models/venue.model';
import { Pick } from '../models/pick.model';
import { Artist } from '../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  filteredEvents: Event[] = [];
  @Output() change: EventEmitter<Event[]> = new EventEmitter();

  constructor(public http: HttpClient) { }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>("https://teclead-ventures.github.io/data/london-events.json")
    .pipe(
      map(
        data => {
          console.log("raw date", data);
          return data.map( (_event) => ({
            _id: _event["_id"],
            title: _event["title"],
            flyerFront: _event["flyerFront"],
            attending: _event["attending"],
            date: _event["date"],
            startTime: _event["startTime"],
            endTime: _event["endTime"],
            contentUrl: _event["contentUrl"],
            venue: {
              id: _event["venue"].id,
              name: _event["venue"].name,
              contentUrl: _event["venue"].contentUrl,
              direction: _event["venue"].direction
            } as Venue,
            pick: {
              id: _event["pick"]?.id,
              blurb: _event["pick"]?.blurb,
            } as Pick,
            artists: _event["artists"].map( (artist: Artist) => ({
              id: artist["id"],
              name: artist["name"],
              } as Artist)),
            city: _event["city"],
            country: _event["country"],
            private: _event["private"]
            } as Event)) 
      }
      ), catchError( error => {
        console.log(error)
        return throwError( 'Something went wrong!' );
      }));
  }

  filterEvents(events: Event[], value: string): Event[]{
    if(value != "") {
      this.filteredEvents = events.filter(event => event.title.toLowerCase().includes(value.toLowerCase()));
      this.change.emit(this.filteredEvents);
    }
    return this.filteredEvents;
  }
}
