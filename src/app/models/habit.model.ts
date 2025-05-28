export interface Habit {
    id: number;
    name: string;
    description?: string;
    completedDates: string[]; // format: 'YYYY-MM-DD'
  }