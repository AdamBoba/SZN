import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Habit } from '../app.component';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css']
})
export class HabitsComponent {
  @Input() habits: Habit[] = [];
}