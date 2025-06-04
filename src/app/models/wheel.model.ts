export interface WheelPrize {
  type: 'xp' | 'badge' | 'quote';
  value: number | string;
  label: string;
}

export const WHEEL_PRIZES: WheelPrize[] = [
  { type: 'xp', value: 10, label: "+10 XP" },
  { type: 'xp', value: 20, label: "+20 XP" },
  { type: 'badge', value: 'lucky-wheel', label: "Odznaka: Szczęściarz" },
  { type: 'quote', value: "Nigdy się nie poddawaj!", label: "Motywacja!" },
  { type: 'quote', value: "Małe kroki prowadzą do wielkich sukcesów.", label: "Motywacja!" },
  { type: 'xp', value: 50, label: "+50 XP" },
  { type: 'badge', value: 'wheel-master', label: "Odznaka: Kołowy Mistrz" }
];