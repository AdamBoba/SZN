import { Component, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './habit-form.component.html',
  styleUrls: ['./habit-form.component.css']
})
export class HabitFormComponent {
  habitName = '';
  @Output() habitAdded = new EventEmitter<string>();

  addHabit() {
    if (this.habitName.trim()) {
      this.habitAdded.emit(this.habitName.trim());
      this.habitName = '';
    }
  }
}