/**
 * Modelo de dominio de las estadísticas de Baldur's Gate 3 (reglas D&D 5e).
 *
 * Este módulo es puro (sin React) para poder testearlo y reutilizarlo tanto en
 * componentes de UI como en el BFF (route handlers).
 */

/** Las seis características. */
export const ABILITIES = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
] as const;

export type Ability = (typeof ABILITIES)[number];

/** Abreviatura de 3 letras usada en la UI del juego. */
export const ABILITY_ABBR: Record<Ability, string> = {
  strength: 'STR',
  dexterity: 'DEX',
  constitution: 'CON',
  intelligence: 'INT',
  wisdom: 'WIS',
  charisma: 'CHA',
};

/** Rango de valores de característica alcanzable en BG3 (1–30). */
export const ABILITY_MIN = 1;
export const ABILITY_MAX = 30;

/** Nivel de personaje soportado en BG3 (1–12). */
export const LEVEL_MIN = 1;
export const LEVEL_MAX = 12;

/**
 * Modificador de característica: floor((valor - 10) / 2).
 * Ej: 10 → +0, 16 → +3, 8 → -1.
 */
export function abilityModifier(score: number): number {
  return Math.floor((clampAbility(score) - 10) / 2);
}

/**
 * Bono de competencia por nivel. En BG3 (nivel 1–12) escala +2 → +4.
 * Fórmula 5e: 2 + floor((nivel - 1) / 4).
 */
export function proficiencyBonus(level: number): number {
  const lvl = clamp(level, LEVEL_MIN, LEVEL_MAX);
  return 2 + Math.floor((lvl - 1) / 4);
}

/**
 * Clase de Dificultad de un salvación/habilidad:
 * 8 + bono de competencia + modificador de la característica.
 */
export function saveDifficultyClass(
  abilityScore: number,
  level: number,
): number {
  return 8 + proficiencyBonus(level) + abilityModifier(abilityScore);
}

/** Formatea un modificador con signo explícito: 3 → "+3", -1 → "-1". */
export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function clampAbility(score: number): number {
  return clamp(Math.round(score), ABILITY_MIN, ABILITY_MAX);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
