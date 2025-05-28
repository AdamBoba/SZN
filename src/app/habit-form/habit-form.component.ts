import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './habit-form.component.html',
  styleUrls: ['./habit-form.component.css']
})
export class HabitFormComponent {
  name: string = '';
  description: string = '';

  @Output() habitAdded = new EventEmitter<{ name: string; description: string }>();

  addHabit() {
    if (this.name.trim()) {
      this.habitAdded.emit({
        name: this.name,
        description: this.description
      });

      // Reset formularza po dodaniu nawyku
      this.name = '';
      this.description = '';
    }
  }
}