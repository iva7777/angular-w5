import { Component, Input } from '@angular/core';
import { Event } from '../event.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  @Input() event!: Event;
}
