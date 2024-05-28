import { Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { AddEventComponent } from './add-event/add-event.component';

export const routes: Routes = [
    {
        path: 'events/:year',
        component: EventsComponent,
    },
    {
        path: 'add',
        component: AddEventComponent
    }
];
