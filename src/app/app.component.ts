import { Component } from '@angular/core';
import { HabitFormComponent } from './habit-form/habit-form.component';
import { HabitsComponent } from './habits/habits.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HabitFormComponent, HabitsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'habit-tracker';
}