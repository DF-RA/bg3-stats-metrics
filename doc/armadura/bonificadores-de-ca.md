# Bonificadores de CA (aditivos)

Se **suman todos** sobre la base (ver [`README.md`](./README.md)). A diferencia de
la base, los bonos **sí se acumulan entre sí**.

## Estilos de combate y dotes

| Fuente | Bono | Condición |
|---|---|---|
| Estilo de combate **Defensa** | `+1` | Solo mientras lleves armadura. |
| Dote **Maestría con Armadura Media** | cambia el cap de DES de +2 a +3 | Afecta la *base* de armadura media, no es un +1 plano. |

## Hechizos

| Hechizo | Efecto en CA | Notas |
|---|---|---|
| **Escudo de Fe** (*Shield of Faith*) | `+2` | Concentración. |
| **Acelerar** (*Haste*) | `+2` | Concentración. |
| **Vínculo Protector** (*Warding Bond*) | `+1` | También otorga resistencia; el aliado vinculado. |
| **Armadura de Mago** (*Mage Armour*) | base `13 + DES` | Es **base**, no bono. Ver [`defensa-sin-armadura.md`](./defensa-sin-armadura.md). |
| **Piel de Corteza** (*Barkskin*) | suelo de **16** | Es **suelo**, no bono aditivo. |
| **Imagen Reflejada** (*Mirror Image*) | — | **No es CA.** Crea duplicados ilusorios que absorben ataques; no incrementa el número de CA aunque a veces se describa como tal. Modelar aparte. |

## Objetos (ejemplos habituales)

| Objeto | Bono |
|---|---|
| **Capa de Protección** (*Cloak of Protection*) | `+1` |
| Escudos mágicos | `+2` base y a veces bonos extra |
| Anillos/amuletos de protección varios | según objeto |

> BG3 tiene **muchísimos** objetos con efectos sobre la CA (fijos, condicionales,
> por reacción). Para la lista completa y autoritativa, ver la fuente
> [*List of features and items that affect AC*](https://bg3.wiki/wiki/List_of_features_and_items_that_affect_AC).
> Para el simulador conviene modelar **categorías de efecto** (bono plano,
> cambio de base, suelo, condicional/reacción) más que enumerar cada objeto.

## Categorías de efecto (para la lógica de negocio)

Al modelar, todo efecto sobre la CA cae en una de estas clases:

1. **Cambio de base** — reemplaza la fórmula base (armaduras, Defensa sin
   Armadura, Armadura de Mago, Resistencia Dracónica). *Excluyente:* gana la mayor.
2. **Bono plano** — se suma siempre (escudo, Defensa, Escudo de Fe, Capa de
   Protección…). *Acumulativo.*
3. **Suelo** — fija un mínimo (Piel de Corteza → 16). Se aplica al final.
4. **Condicional / por reacción** — activo solo bajo condiciones (p. ej. contra
   cierto tipo de ataque, o gastando una reacción). Modelar como *flag* temporal.
5. **No-CA** — parece defensa pero no toca el número (Imagen Reflejada, esquiva,
   ventaja/desventaja del atacante). Fuera del cálculo de CA.

## Fuentes

- [List of features and items that affect AC — bg3.wiki](https://bg3.wiki/wiki/List_of_features_and_items_that_affect_AC)
- [Fighting Style — Fextralife](https://baldursgate3.wiki.fextralife.com/Fighting+Style)
- [Best Ways To Increase Your AC — TheGamer](https://www.thegamer.com/baldurs-gate-3-tips-ways-increase-armour-class/)
