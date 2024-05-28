import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventsService } from '../events.service';
import { Event } from '../event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
  public event: Event = {
    date: new Date(),
    name: '',
    localName: '',
    isHoliday: false
  };

  constructor(private eventsService: EventsService, private router: Router) {}

  onSubmit() {
    this.eventsService.addEvent(this.event);
    this.event = {
      date: new Date(),
      name: '',
      localName: '',
      isHoliday: false
    }
    this.router.navigate(['/events', '2024']);
  }
}
