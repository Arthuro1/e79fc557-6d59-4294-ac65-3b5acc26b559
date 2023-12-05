import { Component, Input } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.less'
})
export class EventCardComponent {
  @Input() event!: Event;
  @Input() addToCart!: boolean;

  constructor(private eventsService: EventsService) {}

  addOrRemoveFromMyEvents(){
    if(this.addToCart){
      this.eventsService.addToMyEvents(this.event);
    }else{
      this.eventsService.removeFromMyEvents(this.event);
    }
  }
}
