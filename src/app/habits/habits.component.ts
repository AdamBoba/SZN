import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface Habit {
  name: string;
  streak: number;
  lastDoneDate: string | null; // ISO string yyyy-mm-dd
}

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css']
})
export class HabitsComponent {
  @Input() habits: Habit[] = [];
  @Output() habitToggled = new EventEmitter<number>();
  @Output() habitRemove = new EventEmitter<number>();

  today = new Date().toISOString().slice(0, 10);

  isDoneToday(habit: Habit): boolean {
    return habit.lastDoneDate === this.today;
  }
}