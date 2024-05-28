import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EventComponent } from './event/event.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, EventComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  
}
