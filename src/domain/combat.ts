/**
 * Modelo de dominio del combate de Baldur's Gate 3: cómo la Clase de Armadura
 * (CA) se traduce en probabilidad de impacto, de crítico y en daño esperado.
 *
 * Módulo puro (sin React). Fuente teórica: `doc/armadura/ca-vs-acierto.md`.
 * Regla base: un ataque impacta si `d20 + bono de ataque ≥ CA`, con nat 1 que
 * siempre falla y nat 20 que siempre acierta (crítico).
 */

/** CA máxima práctica alcanzable en BG3 (build optimizado). Tope del eje/slider. */
export const GAME_MAX_AC = 32;

/** Modo de tirada del d20. */
export type RollMode = 'normal' | 'advantage' | 'disadvantage';

/** Cara mínima que debe salir en el d20 para impactar. */
export function requiredRoll(armourClass: number, attackBonus: number): number {
  return armourClass - attackBonus;
}

/**
 * Probabilidad de impacto de **un** d20 contra `armourClass` con `attackBonus`.
 * Incluye las reglas de nat 1 (falla siempre) y nat 20 (acierta siempre), por lo
 * que el resultado queda acotado entre 0.05 y 0.95.
 */
export function singleRollHitChance(
  armourClass: number,
  attackBonus: number,
): number {
  const needed = requiredRoll(armourClass, attackBonus);
  // Caras del d20 que impactan; nat 20 siempre acierta (mín 1), nat 1 siempre
  // falla (máx 19).
  const hitFaces = clamp(21 - needed, 1, 19);
  return hitFaces / 20;
}

/** Combina dos probabilidades de un dado según el modo de tirada. */
function applyRollMode(p: number, mode: RollMode): number {
  if (mode === 'advantage') return 1 - (1 - p) ** 2;
  if (mode === 'disadvantage') return p * p;
  return p;
}

/**
 * Probabilidad de impacto teniendo en cuenta ventaja/desventaja.
 * Ventaja: acierta si al menos uno de los 2d20 acierta. Desventaja: solo si
 * ambos aciertan.
 */
export function hitChance(
  armourClass: number,
  attackBonus: number,
  mode: RollMode = 'normal',
): number {
  return applyRollMode(singleRollHitChance(armourClass, attackBonus), mode);
}

/**
 * Probabilidad de crítico. Por defecto solo con nat 20 (`critThreshold = 20`);
 * rasgos como Crítico Mejorado bajan el umbral (p. ej. 19 → crítico con 19–20).
 * No depende de la CA: un crítico acierta siempre.
 */
export function critChance(
  mode: RollMode = 'normal',
  critThreshold = 20,
): number {
  const critFaces = clamp(21 - critThreshold, 1, 20);
  return applyRollMode(critFaces / 20, mode);
}

/** Parámetros de daño para el cálculo de daño esperado. */
export interface DamageProfile {
  /** Daño medio de un golpe normal (dados + modificadores planos). */
  averageHit: number;
  /**
   * Parte de **dados** del daño, que se duplica en crítico (se suma extra solo
   * en críticos). 0 si se quiere ignorar el efecto del crítico.
   */
  averageDamageDice?: number;
  /** Umbral de crítico (20 por defecto). */
  critThreshold?: number;
}

/**
 * Daño esperado recibido por ataque contra un objetivo de CA `armourClass`.
 *
 * `daño_esperado = P(acierto)·daño_golpe + P(crít)·daño_dados`
 *
 * Todo golpe reparte `averageHit`; los críticos añaden encima `averageDamageDice`
 * (los dados duplicados). Los modificadores planos no se duplican (regla BG3).
 */
export function expectedDamagePerAttack(
  armourClass: number,
  attackBonus: number,
  mode: RollMode,
  damage: DamageProfile,
): number {
  const { averageHit, averageDamageDice = 0, critThreshold = 20 } = damage;
  const pHit = hitChance(armourClass, attackBonus, mode);
  // Un crítico siempre es un impacto: acótalo a pHit por seguridad.
  const pCrit = Math.min(critChance(mode, critThreshold), pHit);
  return pHit * averageHit + pCrit * averageDamageDice;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
