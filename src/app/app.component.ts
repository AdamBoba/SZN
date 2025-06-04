import { Component } from '@angular/core';
import { HabitFormComponent } from './habit-form/habit-form.component';
import { HabitsComponent, Habit } from './habits/habits.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Badge, BADGES } from './models/badges.model';
import { WheelOfMotivationComponent } from './wheel-of-motivation/wheel-of-motivation.component';
import { WheelPrize } from './models/wheel.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    HabitFormComponent,
    HabitsComponent,
    WheelOfMotivationComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  habits: Habit[] = [];
  badges: Badge[] = [];
  xp = 0;
  lastSpinDay: string | null = null;
  lastQuote: string | null = null;
  newBadge: Badge | null = null;
  today = new Date().toISOString().slice(0, 10);

  constructor() {
    const stored = localStorage.getItem('habits');
    this.habits = stored ? JSON.parse(stored) : [];
    const storedBadges = localStorage.getItem('badges');
    this.badges = storedBadges ? JSON.parse(storedBadges) : [];
    const storedXP = localStorage.getItem('xp');
    this.xp = storedXP ? +storedXP : 0;
    const storedSpin = localStorage.getItem('lastSpinDay');
    this.lastSpinDay = storedSpin ? storedSpin : null;
    const storedQuote = localStorage.getItem('lastQuote');
    this.lastQuote = storedQuote ? storedQuote : null;
    this.checkBadges();
  }

  onHabitAdded(name: string) {
    this.habits.push({
      name,
      streak: 0,
      lastDoneDate: null
    });
    this.save();
    this.checkBadges();
  }

  onHabitToggled(index: number) {
    const habit = this.habits[index];
    const today = this.today;

    if (habit.lastDoneDate === today) {
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
    this.checkBadges();
  }

  onHabitRemove(index: number) {
    this.habits.splice(index, 1);
    this.save();
    this.checkBadges();
  }

  get allDoneToday(): boolean {
    if (!this.habits.length) return false;
    return this.habits.every(h => h.lastDoneDate === this.today);
  }

  onWheelPrize(prize: WheelPrize) {
    if (prize.type === 'xp') {
      this.xp += +prize.value;
    }
    if (prize.type === 'badge') {
      if (!this.badges.some(b => b.id === prize.value)) {
        // Utwórz badge dla animacji
        const badge: Badge = {
          id: prize.value as string,
          name: prize.label,
          icon: '🎉',
          description: prize.label,
          condition: () => false
        };
        this.badges.push(badge);
        this.showBadgeAnimation(badge);
      }
    }
    if (prize.type === 'quote') {
      this.lastQuote = prize.value as string;
    }
    this.lastSpinDay = this.today;
    this.save();
  }

  showBadgeAnimation(badge: Badge) {
    this.newBadge = badge;
    setTimeout(() => {
      this.newBadge = null;
    }, 2500);
  }

  resetAll() {
    localStorage.clear();
    location.reload();
  }

  private save() {
    localStorage.setItem('habits', JSON.stringify(this.habits));
    localStorage.setItem('badges', JSON.stringify(this.badges));
    localStorage.setItem('xp', this.xp.toString());
    localStorage.setItem('lastSpinDay', this.lastSpinDay ?? '');
    localStorage.setItem('lastQuote', this.lastQuote ?? '');
  }

  private checkBadges() {
    const unlocked: Badge[] = [];
    for (let badge of BADGES) {
      if (badge.condition(this.habits) && !this.badges.some(b => b.id === badge.id)) {
        unlocked.push(badge);
      }
    }
    if (unlocked.length) {
      this.badges.push(...unlocked);
      this.save();
      this.showBadgeAnimation(unlocked[0]);
    }
  }
}