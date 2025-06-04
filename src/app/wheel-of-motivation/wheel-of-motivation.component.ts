import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WheelPrize, WHEEL_PRIZES } from '../models/wheel.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wheel-of-motivation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wheel-of-motivation.component.html',
  styleUrls: ['./wheel-of-motivation.component.css'],
})
export class WheelOfMotivationComponent {
  @Input() canSpin = false;
  @Output() prizeWon = new EventEmitter<WheelPrize>();

  spinning = false;
  result?: WheelPrize;

  WHEEL_PRIZES = WHEEL_PRIZES;

  spin() {
    if (!this.canSpin || this.spinning) return;
    this.spinning = true;
    setTimeout(() => {
      const prize = WHEEL_PRIZES[Math.floor(Math.random() * WHEEL_PRIZES.length)];
      this.result = prize;
      this.prizeWon.emit(prize);
      this.spinning = false;
    }, 1800);
  }
}