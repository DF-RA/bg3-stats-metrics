# Clase de Armadura (CA) — Fórmula maestra

La **Clase de Armadura** (*Armour Class*, CA) es el número que un atacante debe
igualar o superar con su tirada de ataque (`d20 + bonos`) para impactar. Si la
tirada de ataque **≥ CA**, hay impacto.

## Modelo de cálculo

La CA se calcula en **dos capas**:

```
CA final = BASE  +  Σ (bonos aditivos)
```

### 1. BASE — se elige UNA sola fórmula (la que dé el valor más alto aplicable)

La base **no se suma entre sí**: cada personaje usa una única fórmula base según
lo que lleve equipado / sus rasgos. Cuando varias podrían aplicar, **gana la más
alta**.

| Situación | Fórmula base | Notas |
|---|---|---|
| Sin armadura | `10 + mod. DES` | Base por defecto de cualquier criatura. |
| Armadura **ligera** | `base_armadura + mod. DES` | Destreza completa. |
| Armadura **media** | `base_armadura + min(mod. DES, +2)` | Cap de Destreza a +2 (ver excepciones). |
| Armadura **pesada** | `base_armadura` | No suma Destreza. |
| Defensa sin Armadura (Bárbaro) | `10 + mod. DES + mod. CON` | Solo sin armadura. |
| Defensa sin Armadura (Monje) | `10 + mod. DES + mod. SAB` | Solo sin armadura y sin escudo. |
| Resistencia Dracónica (Hechicero Dracónico) | `13 + mod. DES` | Cuenta como armadura natural, no "sin armadura". |
| Armadura de Mago (hechizo) | `13 + mod. DES` | Solo si no llevas armadura. |
| Piel de Corteza (*Barkskin*) | fija la CA a **16** si sería menor | Actúa como **suelo**, no como base sumable. |

> **Regla de oro:** llevar armadura **desactiva** la Defensa sin Armadura y la
> Armadura de Mago (ambas requieren no llevar armadura). Por eso son fórmulas
> **base alternativas**, no bonos. Detalle en
> [`defensa-sin-armadura.md`](./defensa-sin-armadura.md).

### 2. BONOS ADITIVOS — se suman TODOS los que apliquen

Sobre la base se suman, acumulativamente, todas las bonificaciones activas:

- **Escudo:** `+2` (requiere competencia con escudos).
- **Estilo de combate Defensa:** `+1` mientras lleves armadura.
- **Escudo de Fe** (*Shield of Faith*): `+2`.
- **Acelerar** (*Haste*): `+2`.
- **Vínculo Protector** (*Warding Bond*): `+1`.
- **Capa de Protección** (*Cloak of Protection*): `+1`.
- Otros objetos mágicos y efectos (ver [`bonificadores-de-ca.md`](./bonificadores-de-ca.md)).

> **Los bonos SÍ se acumulan entre sí.** Solo la *base* es excluyente.

## Ejemplo de cálculo

Guerrero, DES 14 (`+2`), con **Placa** (pesada, base 18), **escudo** y estilo
**Defensa**:

```
BASE  = 18            (armadura pesada, ignora DES)
BONOS = +2 (escudo) +1 (Defensa)
CA    = 18 + 3 = 21
```

Pícaro, DES 18 (`+4`), con **Cuero Tachonado** (ligera, base 12):

```
BASE  = 12 + 4 = 16   (ligera, DES completa)
BONOS = 0
CA    = 16
```

Bárbaro, DES 16 (`+3`), CON 16 (`+3`), **sin armadura**, con **escudo**:

```
BASE  = 10 + 3 + 3 = 16   (Defensa sin Armadura)
BONOS = +2 (escudo)       (el Bárbaro SÍ puede usar escudo con Def. sin Armadura)
CA    = 16 + 2 = 18
```

## Fuentes

- [Armour Class — bg3.wiki](https://bg3.wiki/wiki/Armour_Class)
- [Armour — bg3.wiki](https://bg3.wiki/wiki/Armour)
- [List of features and items that affect AC — bg3.wiki](https://bg3.wiki/wiki/List_of_features_and_items_that_affect_AC)
- [Armour Class — Fextralife](https://baldursgate3.wiki.fextralife.com/Armour+Class)
