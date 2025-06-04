import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Habit {
  name: string;
  streak: number;
  lastDoneDate: string | null;
}

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css']
})
export class HabitsComponent {
  @Input() habits: Habit[] = [];
  @Output() habitToggled = new EventEmitter<number>();
  @Output() habitRemove = new EventEmitter<number>();

  today: string = new Date().toISOString().slice(0, 10);

  getPlantEmoji(habit: Habit): string {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const neglected = habit.lastDoneDate !== this.today && habit.lastDoneDate !== yesterday;
    if (neglected) return "🥀";      // Zwiędła róża
    if (habit.streak >= 7) return "🌳"; // Drzewko
    if (habit.streak >= 5) return "🌼"; // Kwiat
    if (habit.streak >= 3) return "🌱"; // Sadzonka
    if (habit.streak >= 1) return "🌿"; // Listki
    return "🌰";                        // Nasionko
  }

  getPlantClass(habit: Habit): string {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const neglected = habit.lastDoneDate !== this.today && habit.lastDoneDate !== yesterday;
    if (neglected) return "neglected";
    if (habit.streak >= 7) return "tree";
    if (habit.streak >= 5) return "flower";
    if (habit.streak >= 3) return "sprout";
    if (habit.streak >= 1) return "leaves";
    return "seed";
  }
}