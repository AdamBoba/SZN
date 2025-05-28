import { Component } from '@angular/core';
import { HabitService } from '../habit.service';
import { Habit } from '../models/habit.model';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
})
export class HabitsComponent {
  habits: Habit[];

  constructor(private habitService: HabitService) {
    this.habits = this.habitService.getHabits();
  }

  toggleComplete(habit: Habit) {
    const today = new Date().toISOString().slice(0, 10);
    this.habitService.toggleHabit(habit.id, today);
  }

  removeHabit(habit: Habit) {
    this.habitService.removeHabit(habit.id);
    this.habits = this.habitService.getHabits();
  }
}