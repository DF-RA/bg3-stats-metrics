# Bases alternativas de CA (sin armadura y armadura natural)

Estas fórmulas **sustituyen** a la base `10 + mod. DES`. Son mutuamente
excluyentes con llevar armadura: si equipas una armadura, dejan de aplicar
(salvo la Piel de Corteza, que actúa como suelo). Cuando varias podrían aplicar,
**se usa la que dé mayor CA**.

## Defensa sin Armadura (*Unarmoured Defence*)

Rasgo de clase que solo funciona **sin armadura equipada**.

| Clase | Fórmula base | ¿Escudo? |
|---|---|---|
| **Bárbaro** | `10 + mod. DES + mod. CON` | Sí, compatible (suma +2 encima). |
| **Monje** | `10 + mod. DES + mod. SAB` | No: pierde el beneficio si empuña escudo. |

### Multiclase Bárbaro/Monje

Los dos rasgos **no se acumulan**. Si tienes ambos, el juego usa **la fórmula que
dé la CA más alta** (no sumas CON *y* SAB a la vez).

## Armadura de Mago (*Mage Armour*, hechizo)

- Fija la **base** en `13 + mod. DES`.
- Requiere **no llevar armadura** (se cancela al equipar armadura).
- **Divergencia BG3:** solo mejora tu CA si la base que ya tienes (p. ej. por
  Defensa sin Armadura) es **menor** que `13 + DES`. En 5e es más matizado; en
  BG3 se comporta como "usa la mayor entre tu base actual y 13 + DES".

## Resistencia Dracónica (*Draconic Resilience*, Hechicero Dracónico)

- Fija la **base** en `13 + mod. DES`.
- Cuenta como **armadura natural**, **no** como "sin armadura". Consecuencia: no
  se combina con Defensa sin Armadura para sumar CON/SAB; con armadura natural
  solo obtienes `13 + DES` (no `+ CON/SAB` encima).

## Piel de Corteza (*Barkskin*, hechizo)

- **No es una base sumable:** actúa como **suelo**. Si tu CA resultante sería
  **menor que 16**, la sube a 16; si ya es ≥ 16, no hace nada.
- Se aplica **después** de calcular base + bonos.

## Orden mental para resolver la base

1. ¿Lleva armadura? → usa la fórmula de esa categoría (ligera/media/pesada).
2. ¿No lleva armadura? → toma la **mayor** entre: `10 + DES`, Defensa sin
   Armadura (Bárbaro/Monje), Armadura de Mago, Resistencia Dracónica.
3. Suma los **bonos aditivos** (escudo, estilos, hechizos, objetos).
4. Aplica suelos como **Piel de Corteza** (sube a 16 si quedó por debajo).

## Fuentes

- [Unarmoured Defence — Fextralife](https://baldursgate3.wiki.fextralife.com/Unarmoured+Defence)
- [Armour Class — bg3.wiki](https://bg3.wiki/wiki/Armour_Class)
- [List of features and items that affect AC — bg3.wiki](https://bg3.wiki/wiki/List_of_features_and_items_that_affect_AC)
