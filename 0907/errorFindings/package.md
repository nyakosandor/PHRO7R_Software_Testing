Egy futárszolgálat a csomagokat méret és tömeg alapján kategorizálja.

    SMALL: legfeljebb 2 kg; mindhárom mérete legfeljebb 30 cm.
    MEDIUM: legfeljebb 10 kg; egyik mérete sem nagyobb 60 cm-nél.
    LARGE: legfeljebb 30 kg; egyik mérete sem nagyobb 120 cm-nél.
    Egyéb esetben: OVERSIZE

Érvénytelen a csomag, ha bármely mérete 0 vagy negatív, vagy a tömege 0 vagy negatív. Ebben az esetben a válasz: INVALID

Hibák:

### 1. A hibás adatú csomagokat nem jelzi

**Hibás kódrészlet:**

```javascript
function classifyPackage(weight, length, width, height) {
    if (weight < 2 &&
    ...
```

**Magyarázat:** A program sehol nem adja vissza az `INVALID` értéket. Nulla vagy negatív tömegű, illetve méretű csomagot érvényesként sorol be. Például a `classifyPackage(-1, 10, 10, 10)` hívás eredménye `SMALL`.

**Javítás:** A függvény elején ellenőrizni kell az adatokat:

```javascript
if (weight <= 0 || length <= 0 || width <= 0 || height <= 0) {
    return "INVALID";
}
```

### 2. A SMALL kategóriánál rosszul kezeli a határértékeket

**Hibás kódrészlet:**

```javascript
if (weight < 2 &&
    length < 30 &&
    width < 30 &&
    height < 30) {
    return "SMALL";
}
```

**Magyarázat:** A specifikáció szerint a „legfeljebb” azt jelenti, hogy a határérték még belefér. A `<` miatt viszont egy pontosan 2 kg-os vagy pontosan 30 cm-es csomag nem SMALL, hanem MEDIUM lesz.

**Javítás:**

```javascript
if (weight <= 2 &&
    length <= 30 &&
    width <= 30 &&
    height <= 30) {
    return "SMALL";
}
```

### 3. A MEDIUM kategóriába túl nagy csomag is kerülhet

**Hibás kódrészlet:**

```javascript
if (weight <= 10 &&
    (length <= 60 || width <= 60 || height <= 60)) {
    return "MEDIUM";
}
```

**Magyarázat:** A `||` miatt elég, ha csak az egyik méret legfeljebb 60 cm, pedig egyik méret sem lehet nagyobb 60 cm-nél. Például egy 5 kg-os, 200 × 200 × 10 cm-es csomag MEDIUM besorolást kap, pedig OVERSIZE lenne.

**Javítás:** `||` helyett `&&` kell:

```javascript
if (weight <= 10 &&
    length <= 60 &&
    width <= 60 &&
    height <= 60) {
    return "MEDIUM";
}
```

### Javított függvény

```javascript
function classifyPackage(weight, length, width, height) {
    if (weight <= 0 || length <= 0 || width <= 0 || height <= 0) {
        return "INVALID";
    }

    if (weight <= 2 &&
        length <= 30 &&
        width <= 30 &&
        height <= 30) {
        return "SMALL";
    }

    if (weight <= 10 &&
        length <= 60 &&
        width <= 60 &&
        height <= 60) {
        return "MEDIUM";
    }

    if (weight <= 30 &&
        length <= 120 &&
        width <= 120 &&
        height <= 120) {
        return "LARGE";
    }

    return "OVERSIZE";
}
```
