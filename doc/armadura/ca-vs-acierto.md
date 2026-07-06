# CA frente a la tirada de ataque (acierto y daño recibido)

Cómo se traduce la **Clase de Armadura** en probabilidad de ser impactado y en
daño recibido. Es la base teórica del **Laboratorio → Armadura**.

## Regla de impacto

Un ataque impacta si:

```
d20 + bono de ataque  ≥  CA del objetivo
```

- **Nat 1** (el d20 muestra 1): **falla siempre**, sin importar bonos ni CA.
- **Nat 20** (el d20 muestra 20): **acierta siempre** y es **crítico**, sin
  importar la CA.

Por eso el % de acierto **nunca es 0% ni 100%**: está acotado entre **5% y 95%**
(salvo la excepción de inmunidad a críticos, más abajo).

### El % de acierto depende del **bono de ataque**, no solo de la CA

La cara mínima que debe salir en el d20 para impactar es:

```
cara_necesaria = CA − bono de ataque
```

El **bono de ataque** del atacante se compone (según arma y situación) de:
competencia + modificador de característica (FUE cuerpo a cuerpo, DES a distancia
o con arma sutil) + bono del arma (`+1/+2/+3`) + efectos (p. ej. *Bendición*
≈ `+1d4`, ventaja de flanqueo, etc.).

> **Implicación para el Laboratorio:** el % de acierto se dibuja **para un bono de
> ataque dado**. Por eso el bono de ataque es un **input** con descripción, no una
> constante.

## Fórmula del % de acierto

Contando caras ganadoras del d20 (con nat 1 y nat 20 forzados):

```
caras_que_impactan = clamp(21 − cara_necesaria, 1, 19)
P(acierto por 1 dado) = caras_que_impactan / 20        → entre 0.05 y 0.95
```

### Ventaja / Desventaja

Se tiran **2d20** y se toma el mayor (ventaja) o el menor (desventaja). No se
acumulan (varias fuentes de ventaja siguen siendo 2 dados). Con `p` = prob. de
acierto de un dado:

```
Normal        P = p
Ventaja       P = 1 − (1 − p)²
Desventaja    P = p²
```

## Crítico y daño

- **Probabilidad de crítico** (por defecto, solo nat 20):

  ```
  Normal        P(crít) = 1/20  = 5%
  Ventaja       P(crít) = 1 − (19/20)²  = 9.75%
  Desventaja    P(crít) = (1/20)²  = 0.25%
  ```

  Rasgos como **Crítico Mejorado** bajan el umbral a 19 (crítico con 19–20),
  duplicando la probabilidad base.

- **Daño de crítico:** se tiran **el doble de dados** de daño y se suman. Los
  **modificadores planos** (incluido el mod. de característica) **no** se
  duplican.

### Daño esperado recibido por ataque

```
daño_esperado = P(acierto) · daño_medio_golpe  +  P(crít) · daño_medio_dados
```

- `daño_medio_golpe`: daño medio de un golpe normal (dados + modificadores).
- `daño_medio_dados`: la parte de **dados** (lo que se duplica en crítico); suma
  extra solo en los críticos. Si se ignora el crítico, este término es 0.

> Todo golpe reparte `daño_medio_golpe`; los críticos añaden encima
> `daño_medio_dados` (los dados duplicados). Modelado directo de la regla de BG3.

## Excepción: inmunidad a críticos

Cierto equipo impide que te hagan críticos: al sacarte un **nat 20**, se trata
como un **20 normal** (se aplican modificadores y se compara con tu CA). Con CA
suficientemente alta, es posible **volverse inmune a todo impacto** (ni el nat 20
acierta). En ese caso el techo del 95% deja de aplicar.

## CA máxima del juego

La **CA máxima práctica alcanzable** rondando builds optimizados es **~32**
(armadura media en paladín/guerrero; ~31 pesada, ~29 ligera), apilando armadura +
escudo + Destreza (donde aplique) + estilo Defensa + bonos. Es el tope razonable
para el eje X / slider del Laboratorio (con algo de margen para buffs temporales
como *Escudo de Fe* o *Acelerar*).

## Fuentes

- [Attacks — bg3.wiki](https://bg3.wiki/wiki/Attacks)
- [Dice rolls — bg3.wiki](https://bg3.wiki/wiki/Dice_rolls)
- [Critical hit — bg3.wiki](https://bg3.wiki/wiki/Critical_hit)
- [Advantage — bg3.wiki](https://bg3.wiki/wiki/Advantage)
- [List of sources of advantage and disadvantage on attack rolls — bg3.wiki](https://bg3.wiki/wiki/List_of_sources_of_advantage_and_disadvantage_on_attack_rolls)
- [Armour Class — bg3.wiki](https://bg3.wiki/wiki/Armour_Class)
