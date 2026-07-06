# Divergencias de BG3 respecto a D&D 5e (armadura/CA)

BG3 se basa en 5e (reglas 2014) pero **no lo replica al pie de la letra**. Estas
diferencias importan para **no codificar reglas de 5e que BG3 no aplica**.

## 1. Armadura pesada sin requisito de Fuerza

- **5e:** la armadura pesada exige Fuerza mínima (Cota de Mallas 13, Bandas 15,
  Placa 15). Por debajo, tu **velocidad baja 3 m (−10 pies)**.
- **BG3:** **no implementa** el requisito de Fuerza ni la penalización de
  velocidad. Con competencia, cualquiera lleva armadura pesada sin castigo.
- **Implicación:** en el modelo **no** condicionar la CA ni la velocidad por la
  Fuerza del portador de armadura pesada.

## 2. Armadura de Mago se comporta como "mayor entre bases"

- **BG3:** *Mage Armour* mejora la CA solo si `13 + DES` supera tu base actual;
  en la práctica es "usa la base más alta". (En 5e la interacción con rasgos como
  Defensa sin Armadura es más restrictiva.)

## 3. Defensa sin Armadura no acumula al multiclasear

- Coherente con 5e: Bárbaro + Monje **no** suman CON y SAB a la vez; el juego usa
  la fórmula de mayor CA. (Se documenta aquí porque es una duda frecuente.)

## 4. Escudo + Defensa sin Armadura

- **Bárbaro:** puede usar escudo **con** su Defensa sin Armadura (suma +2).
- **Monje:** **pierde** su Defensa sin Armadura si empuña escudo.

## 5. Sin reglas de cobertura (*cover*) que modifiquen la CA

- BG3 **no** implementa el sistema de cobertura de 5e (+2/+5 a la CA por cobertura
  parcial/considerable). La ventaja posicional en BG3 se expresa vía **terreno
  elevado** (afecta a la **tirada de ataque**, no a la CA del defensor).
- **Implicación:** no añadir bonos de CA por cobertura en el modelo.

## Notas de verificación

> **Criterio:** ante discrepancias, la referencia es **BG3** (bg3.wiki /
> Fextralife / verificación in-game), nunca 5e. 5e aparece solo para explicar la
> diferencia.

- **Corregido tras auditoría:** la Acolchada (*Padded*) **no** impone desventaja
  de Sigilo en BG3; el dato anterior ("Desventaja") venía de 5e. También en 5e la
  armadura pesada exige Fuerza — BG3 no.
- Valores base **confirmados por fuente BG3**: Acolchada 11, Cuero Tachonado 12,
  Pieles 12, Camisa de Mallas 13, Cota de Escamas 14, Coraza 14, Media Placa 15,
  Cota de Anillas 14, Placa 18.
- Valores **† pendientes de confirmar en BG3 / in-game** (hoy con el número de
  5e, sin verificar): **Cota de Mallas 16**, **Bandas 17**, **Cuero 11**. Detalle
  en [`tipos-de-armadura.md`](./tipos-de-armadura.md#confianza-de-los-datos).
- **Verificación in-game = máxima autoridad** si contradice a las wikis.

## Fuentes

- [Str requirements of heavy armor? — Larian Forums](https://forums.larian.com/ubbthreads.php?ubb=showflat&Number=866694)
- [Armour — bg3.wiki](https://bg3.wiki/wiki/Armour)
- [Armour Class — bg3.wiki](https://bg3.wiki/wiki/Armour_Class)
- [The Gap in the Armor of Baldur's Gate and 5e — ACOUP](https://acoup.blog/2023/09/15/collections-the-gap-in-the-armor-of-baldurs-gate-and-5e/)
