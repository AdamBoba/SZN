import { Component } from '@angular/core';
import { HabitFormComponent } from './habit-form/habit-form.component';
import { HabitsComponent } from './habits/habits.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface Habit {
  name: string;
  doneToday: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    HabitFormComponent,
    HabitsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  habits: Habit[] = [];

  constructor() {
    const stored = localStorage.getItem('habits');
    this.habits = stored ? JSON.parse(stored) : [];
  }

  onHabitAdded(name: string) {
    this.habits.push({ name, doneToday: false });
    localStorage.setItem('habits', JSON.stringify(this.habits));
  }
}