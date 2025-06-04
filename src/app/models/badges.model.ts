export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    condition: (habits: any[]) => boolean;
  }
  
  export const BADGES: Badge[] = [
    {
      id: 'first-habit',
      name: 'Pierwszy krok',
      description: 'Dodaj swój pierwszy nawyk.',
      icon: '🌱',
      condition: habits => habits.length > 0
    },
    {
      id: 'streak-3',
      name: '3-dniowy Mistrz',
      description: 'Utrzymaj streak 3 dni na dowolnym nawyku!',
      icon: '⭐️',
      condition: habits => habits.some(h => h.streak >= 3)
    },
    {
      id: 'streak-7',
      name: 'Tydzień wytrwałości',
      description: '7 dni streak na jednym nawyku!',
      icon: '🔥',
      condition: habits => habits.some(h => h.streak >= 7)
    },
    {
      id: 'streak-30',
      name: 'Miesiąc Mocy',
      description: '30 dni streak na jednym nawyku!',
      icon: '🏆',
      condition: habits => habits.some(h => h.streak >= 30)
    },
    {
      id: 'five-habits',
      name: 'Kolekcjoner',
      description: 'Dodaj 5 różnych nawyków.',
      icon: '🎯',
      condition: habits => habits.length >= 5
    },
    {
      id: 'all-done-today',
      name: 'Perfekcyjny Dzień',
      description: 'Odhacz wszystkie nawyki w jednym dniu!',
      icon: '💎',
      condition: habits => {
        if (habits.length === 0) return false;
        const today = new Date().toISOString().slice(0, 10);
        return habits.every(h => h.lastDoneDate === today);
      }
    },
    {
      id: 'habit-comeback',
      name: 'Powrót Bohatera',
      description: 'Wróć do nawyków po minimum tygodniowej przerwie.',
      icon: '🔄',
      condition: habits => {
        const today = new Date().toISOString().slice(0, 10);
        return habits.some(h => {
          if (!h.lastDoneDate) return false;
          const days = Math.floor((new Date(today).getTime() - new Date(h.lastDoneDate).getTime()) / 86400000);
          return days >= 7 && h.streak === 1;
        });
      }
    },
    {
      id: 'streak-100',
      name: 'Legendarny Nawykołomca',
      description: '100 dni streak na jednym nawyku!',
      icon: '👑',
      condition: habits => habits.some(h => h.streak >= 100)
    }
  ];