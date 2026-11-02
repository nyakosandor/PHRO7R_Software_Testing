Egy vizsga két részből áll:

    elmélet: legfeljebb 60 pont;
    gyakorlat: legfeljebb 40 pont.

A sikeres vizsgához legalább 30 elméleti és legalább 20 gyakorlati pont szükséges.

Érdemjegyek az összpontszám alapján:

    0–49 pont: 1
    50–59 pont: 2
    60–69 pont: 3
    70–84 pont: 4
    85–100 pont: 5

Érvénytelen pontszám esetén hibát kell jelezni.

Hibák:

### 1. A minimumfeltételt csak akkor nézi, ha mindkét rész sikertelen

**Hibás kódrészlet:**

```javascript
if (theory < 30 && practice < 20) {
    return 1;
}
```

**Magyarázat:** Az `&&` miatt a program csak akkor buktat, ha az elmélet és a gyakorlat is a minimum alatt van. A szabály szerint viszont mindkét részből el kell érni a minimumot, tehát már az egyik rész sikertelensége is elég a bukáshoz. Például 25 elméleti és 40 gyakorlati pontnál (összesen 65) a program 3-ast ad, pedig 1-est kellene.

**Javítás:** `&&` helyett `||` kell:

```javascript
if (theory < 30 || practice < 20) {
    return 1;
}
```

### 2. A jegyhatárokon rossz jegyet ad

**Hibás kódrészlet:**

```javascript
} else if (total <= 60) {
    return 2;
} else if (total <= 70) {
    return 3;
} else if (total <= 85) {
    return 4;
}
```

**Magyarázat:** A `<=` miatt a határértékek az alacsonyabb jegyhez kerülnek: 60 pontra 2-est ad 3-as helyett, 70 pontra 3-ast ad 4-es helyett, 85 pontra pedig 4-est ad 5-ös helyett.

**Javítás:** Szigorú `<` összehasonlítás kell:

```javascript
} else if (total < 60) {
    return 2;
} else if (total < 70) {
    return 3;
} else if (total < 85) {
    return 4;
}
```

### 3. Hiányzik a bemenet ellenőrzése

**Hibás kódrészlet:**

```javascript
function calculateGrade(theory, practice) {
    let total = theory + practice;
    ...
```

**Magyarázat:** A program semmilyen ellenőrzést nem végez, pedig érvénytelen pontszámnál hibát kellene jeleznie. Elfogadja a negatív pontszámot, a 60-nál több elméleti és a 40-nél több gyakorlati pontot is. Például 70 elméleti és 40 gyakorlati pontra (összesen 110) 5-öst ad. Nem szám bemenetnél (pl. `"30" + "20"`) a `+` szövegösszefűzést végez, és az eredmény kiszámíthatatlan.

**Javítás:** A számítás előtt ellenőrizni kell a bemenetet:

```javascript
if (!Number.isFinite(theory) || !Number.isFinite(practice) ||
    theory < 0 || theory > 60 ||
    practice < 0 || practice > 40) {
    throw new Error("Érvénytelen pontszám");
}
```

### Javított függvény

```javascript
function calculateGrade(theory, practice) {
    if (!Number.isFinite(theory) || !Number.isFinite(practice) ||
        theory < 0 || theory > 60 ||
        practice < 0 || practice > 40) {
        throw new Error("Érvénytelen pontszám");
    }

    if (theory < 30 || practice < 20) {
        return 1;
    }

    const total = theory + practice;

    if (total < 50) {
        return 1;
    } else if (total < 60) {
        return 2;
    } else if (total < 70) {
        return 3;
    } else if (total < 85) {
        return 4;
    } else {
        return 5;
    }
}
```
