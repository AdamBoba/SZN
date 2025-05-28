import { Injectable } from '@angular/core';
import { Habit } from './models/habit.model';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private habits: Habit[] = [];
  private nextId = 1;

  getHabits(): Habit[] {
    return this.habits;
  }

  addHabit(habit: Habit) {
    habit.id = this.nextId++;
    habit.completedDates = [];
    this.habits.push(habit);
  }

  toggleHabit(habitId: number, date: string) {
    const habit = this.habits.find(h => h.id === habitId);
    if (!habit) return;
    if (habit.completedDates.includes(date)) {
      habit.completedDates = habit.completedDates.filter(d => d !== date);
    } else {
      habit.completedDates.push(date);
    }
  }

  removeHabit(habitId: number) {
    this.habits = this.habits.filter(h => h.id !== habitId);
  }
}