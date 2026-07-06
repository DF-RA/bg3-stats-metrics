# Tipos de armadura

Toda armadura pertenece a una de tres categorías: **Ligera**, **Media** o
**Pesada** (la ropa/vestimenta no es armadura y deja la base en `10 + mod. DES`).
Cada categoría requiere su **competencia** correspondiente para obtener el
beneficio completo (ver [`escudos-y-competencia.md`](./escudos-y-competencia.md)).

## Cómo aplica la Destreza según la categoría

| Categoría | Modificador de Destreza a la CA |
|---|---|
| **Ligera** | Se suma **completo** (sin límite). |
| **Media** | Se suma hasta un **máximo de +2**. |
| **Pesada** | **No se suma** (se ignora la Destreza). |

### Excepciones al cap de Destreza en armadura media

- **Dote *Maestría con Armadura Media* (*Medium Armour Master*):** sube el cap de
  `+2` a `+3`.
- **Rasgo "Material Exótico" (*Exotic Material*):** cuatro armaduras medias
  permiten sumar la Destreza **completa** (rompen el cap): *Yuan-Ti Scale Mail*,
  *Unwanted Masterwork Scalemail*, *Sharpened Snare Cuirass* y *Armour of
  Agility*.

## Tabla de valores base (armaduras no mágicas)

> El valor base es la CA antes de sumar Destreza. La columna "DES" indica cómo
> aplica el modificador de Destreza. "Sigilo" indica desventaja en pruebas de
> Sigilo mientras se lleva puesta.

### Ligera (Destreza completa)

| Armadura | CA base | DES | Sigilo | Fuerza mín. |
|---|---|---|---|---|
| Acolchada (*Padded*) | 11 | +DES | — | — |
| Cuero (*Leather*) | 11 † | +DES | — | — |
| Cuero Tachonado (*Studded Leather*) | 12 | +DES | — | — |

### Media (Destreza máx. +2)

| Armadura | CA base | DES | Sigilo | Fuerza mín. |
|---|---|---|---|---|
| Pieles (*Hide*) | 12 | +DES (máx 2) | — | — |
| Camisa de Mallas (*Chain Shirt*) | 13 | +DES (máx 2) | — | — |
| Cota de Escamas (*Scale Mail*) | 14 | +DES (máx 2) | Desventaja | — |
| Coraza (*Breastplate*) | 14 | +DES (máx 2) | — | — |
| Media Placa (*Half Plate*) | 15 | +DES (máx 2) | Desventaja | — |

### Pesada (sin Destreza)

| Armadura | CA base | DES | Sigilo | Fuerza mín. |
|---|---|---|---|---|
| Cota de Anillas (*Ring Mail*) | 14 | — | Desventaja | — |
| Cota de Mallas (*Chain Mail*) | 16 † | — | Desventaja | — |
| Bandas (*Splint*) | 17 † | — | Desventaja | — |
| Placa (*Plate*) | 18 | — | Desventaja | — |

> **† Valor pendiente de confirmar en fuente BG3 / in-game.** Ver
> [Confianza de los datos](#confianza-de-los-datos).

> **Nota BG3 (divergencia con 5e):** en 5e la armadura pesada exige un mínimo de
> Fuerza (Cota de Mallas 13, Bandas/Placa 15) o penaliza el movimiento. **BG3 no
> implementa este requisito**: cualquier personaje con competencia en armadura
> pesada la usa sin penalización de velocidad. Ver
> [`divergencias-bg3-vs-5e.md`](./divergencias-bg3-vs-5e.md).

## Desventaja en Sigilo

Varias armaduras imponen **desventaja en pruebas de Sigilo** al llevarlas: la
Acolchada (ligera), la Cota de Escamas y la Media Placa (medias), y **todas** las
pesadas. Es una propiedad de la pieza, independiente de la CA.

## Confianza de los datos

Auditoría de procedencia (recordatorio: **la fuente de verdad es BG3**, 5e solo
como contraste).

**Confirmado por fuente BG3** (bg3.wiki / Fextralife):
- Reglas de Destreza por categoría (ligera completa / media +2 / pesada nada).
- Acolchada **11** y **sin** desventaja de Sigilo (corrige un dato previo que
  venía de 5e, donde la Acolchada sí penaliza Sigilo).
- Cuero Tachonado **12**, Pieles **12**, Camisa de Mallas **13**, Cota de Escamas
  **14**, Coraza **14**, Media Placa **15** (confirmada vía Githyanki Half Plate:
  DES 20 → +2 sobre 15).
- Cota de Anillas **14**; Placa **18**.
- Desventaja de Sigilo: Cota de Escamas, Media Placa y **todas** las pesadas.
- Sin requisito de Fuerza en armadura pesada (BG3 no lo implementa).

**† Pendiente de confirmar en fuente BG3 / in-game** (valor actual tomado de 5e,
aún no verificado contra BG3):
- **Cota de Mallas 16** y **Bandas 17**: las búsquedas en fuentes BG3 no
  devolvieron el número base exacto (solo confirman que son pesadas con
  desventaja de Sigilo). *Adamantine Splint* aparece con CA 18, lo que **podría**
  implicar que la base de Bandas no es 17 — a verificar in-game.
- **Cuero 11**: la fuente BG3 lo situó en "11–12" sin fijarlo; 11 es el valor 5e.

Estos valores **no deben codificarse como definitivos** hasta verificarlos en el
juego o en la ficha del ítem en bg3.wiki.

## Fuentes

- [Armour — bg3.wiki](https://bg3.wiki/wiki/Armour)
- [Armour Class — bg3.wiki](https://bg3.wiki/wiki/Armour_Class)
- [Padded Armour — bg3.wiki](https://bg3.wiki/wiki/Padded_Armour)
- [Ring Mail Armour — bg3.wiki](https://bg3.wiki/wiki/Ring_Mail_Armour)
- [Chain Mail — bg3.wiki](https://bg3.wiki/wiki/Chain_Mail)
- [Splint Armour — Fextralife](https://baldursgate3.wiki.fextralife.com/Splint+Armour)
- [Half Plate Armour — Fextralife](https://baldursgate3.wiki.fextralife.com/Half+Plate+Armour)
- [Armor — Fextralife](https://baldursgate3.wiki.fextralife.com/Armor)
- [Medium Armor — Fextralife](https://baldursgate3.wiki.fextralife.com/Medium+Armor)
