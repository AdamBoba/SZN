import { Component } from '@angular/core';
import { HabitFormComponent } from './habit-form/habit-form.component';
import { HabitsComponent, Habit } from './habits/habits.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    this.habits.push({
      name,
      streak: 0,
      lastDoneDate: null
    });
    this.save();
  }

  onHabitToggled(index: number) {
    const habit = this.habits[index];
    const today = new Date().toISOString().slice(0, 10);

    if (habit.lastDoneDate === today) {
      // Odznaczanie nawyku na dziś – opcjonalnie można blokować, tu cofamy streak
      habit.lastDoneDate = null;
      habit.streak = habit.streak > 0 ? habit.streak - 1 : 0;
    } else {
      if (habit.lastDoneDate) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        if (habit.lastDoneDate === yesterday) {
          habit.streak++;
        } else {
          habit.streak = 1;
        }
      } else {
        habit.streak = 1;
      }
      habit.lastDoneDate = today;
    }
    this.save();
  }

  onHabitRemove(index: number) {
    this.habits.splice(index, 1);
    this.save();
  }

  private save() {
    localStorage.setItem('habits', JSON.stringify(this.habits));
  }
}