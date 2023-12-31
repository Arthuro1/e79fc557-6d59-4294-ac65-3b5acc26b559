import { Time } from "@angular/common";
import { Artist } from "./artist.model";
import { Venue } from "./venue.model";
import { Pick } from "./pick.model";

export interface Event {
    _id: string;
    title: string;
    flyerFront: string;
    attending: number;
    date: string;
    startTime: string;
    endTime: string;
    contentUrl: string;
    venue: Venue;
    pick?: Pick;
    artists: Artist[];
    city: string;
    country: string;
    private: boolean    
}
