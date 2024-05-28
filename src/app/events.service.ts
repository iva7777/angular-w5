import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Event } from "./event.model";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    private api: string = 'https://date.nager.at/api/v3/publicholidays/';
    events: Event[] = [];
    eventsChanged = new Subject<Event[]>();

    constructor(private httpClient: HttpClient) {}

    getHolidays(year: number) {
        this.events = this.getEvents(year);
        this.httpClient.get<Event[]>(this.api + year + '/BG')
            .subscribe((data: Event[]) => {
                data.forEach(element => {
                    element.isHoliday = true;
                    element.date = new Date(element.date);
                    this.events.push(element);
                });

                this.events = this.events.sort((a, b) => {
                    return a.date.getTime() - b.date.getTime();
                });
                this.eventsChanged.next(this.events);
            });
    }

    getEvents(year?: number) {
        const eventsStr = localStorage.getItem("events");
        const localEvents: Event[] = eventsStr ? JSON.parse(eventsStr).map((x: { date: string | Date }) => {
            x.date = new Date(x.date);
            return x;
        }) : [];
        const filteredLocalEvents = localEvents.filter((event: Event) => {
            return new Date(event.date).getFullYear() === year;
        });
        return year ? filteredLocalEvents : localEvents;
    }

    addEvent(event: Event) {
        const localEvents = this.getEvents();
        this.events.push(event);
        localEvents.push(event);
        localStorage.setItem("events", JSON.stringify(localEvents));
        this.eventsChanged.next(this.events);
    }
}