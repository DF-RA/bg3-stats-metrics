# Documentación teórica — BG3 Stats Metrics

Contenido teórico sobre las mecánicas de **Baldur's Gate 3** que la aplicación
modela. El objetivo es tener una **fuente de verdad** validada antes de escribir
la lógica de negocio (`src/domain`) y los componentes que la muestran.

> **Fuente de verdad: BG3, siempre.** Este proyecto modela **exclusivamente
> Baldur's Gate 3**. Cuando el juego difiere de D&D 5e, **manda BG3**. 5e se cita
> únicamente como *contraste* para explicar una diferencia, nunca como validador
> ni como respaldo cuando falte un dato. Si una fuente 5e y una fuente BG3 se
> contradicen, gana la de BG3. Cada documento cita sus fuentes al final.

## Índice

### Armadura y Clase de Armadura (CA)

- [`armadura/README.md`](./armadura/README.md) — Fórmula maestra de la CA y orden de cálculo.
- [`armadura/tipos-de-armadura.md`](./armadura/tipos-de-armadura.md) — Ligera / Media / Pesada, regla de Destreza, tabla de valores base, sigilo.
- [`armadura/escudos-y-competencia.md`](./armadura/escudos-y-competencia.md) — Escudos y penalizaciones por falta de competencia.
- [`armadura/defensa-sin-armadura.md`](./armadura/defensa-sin-armadura.md) — Bases alternativas: Bárbaro, Monje, Armadura de Mago, Resistencia Dracónica, Piel de Corteza.
- [`armadura/bonificadores-de-ca.md`](./armadura/bonificadores-de-ca.md) — Bonos aditivos (estilos, hechizos, objetos, dotes).
- [`armadura/ca-vs-acierto.md`](./armadura/ca-vs-acierto.md) — Cómo la CA se traduce en % de acierto y daño recibido (base del Laboratorio).
- [`armadura/divergencias-bg3-vs-5e.md`](./armadura/divergencias-bg3-vs-5e.md) — Diferencias clave frente a 5e (relevantes para no copiar reglas equivocadas).

## Convenciones

- **Términos en español** cuando el juego los localiza (Clase de Armadura,
  Destreza, competencia); **nombre en inglés entre paréntesis** la primera vez
  si ayuda a rastrear la fuente (p. ej. Armadura de Mago / *Mage Armour*).
- Los **modificadores** se escriben con signo (`+2`, `-1`).
- **`mod. DES`** = modificador de Destreza = `floor((DES - 10) / 2)`.
