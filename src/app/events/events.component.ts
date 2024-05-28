import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsService } from '../events.service';
import { Event } from '../event.model';
import { EventComponent } from '../event/event.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [EventComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit, OnDestroy {
  events: Event[] = [];
  private eventsChanged!: Subscription;
  mapKeys: string[] = [];
  mapEvents!: Map<string, Event[]>;
  private year: number = 0; 

  constructor(private eventsService: EventsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.eventsChanged = this.eventsService.eventsChanged.subscribe((data) => {
      this.events = data;
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.year = Number(params.get('year'));
    });

    this.eventsService.getHolidays(this.year);
    this.mapEventsByDate();
  }

  ngOnDestroy(): void {
    this.eventsChanged.unsubscribe();
  }

  mapEventsByDate() {
    const map = new Map<string, Event[]>();
    this.events.map(event => {
      // const date = event.date;
      // if (map.has(date)) {
      //   map?.get(date)?.push(event);
      // } else {
      //   map.set(date, [event]);
      // }
    });
    this.mapKeys = Array.from(map.keys());
    this.mapEvents = map;
  }
}
