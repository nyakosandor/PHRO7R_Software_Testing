Egy mozijegy alapára 3000 Ft.

Kedvezmények:

    6 éves kor alatt ingyenes;
    6–17 éves korig 30% kedvezmény;
    65 éves kortól 40% kedvezmény;
    diákok 20% kedvezményt kapnak;
    egyszerre csak a legnagyobb kedvezmény alkalmazható;
    3D film esetén 800 Ft felár fizetendő;
    a 3D felárra nem vonatkozik kedvezmény;
    negatív életkor és 120 év feletti életkor érvénytelen.

Hibák:

### 1. A hibás életkort is elfogadja

**Hibás kódrészlet:**

```javascript
function calculateTicketPrice(age, isStudent, is3D) {
    let price = 3000;
    ...
```

**Magyarázat:** A program nem ellenőrzi az életkort. Negatív életkorra (pl. -5) ingyenes jegyet ad, 120 év felettire (pl. 150) pedig a nyugdíjas kedvezményt adja, pedig mindkét esetben hibát kellene jeleznie.

**Javítás:**

```javascript
if (!Number.isFinite(age) || age < 0 || age > 120) {
    throw new Error("Érvénytelen életkor");
}
```

### 2. Rossz életkoroknál ad kedvezményt

**Hibás kódrészlet:**

```javascript
if (age <= 6) {
    price = 0;
} else if (age < 18) {
    price = price * 0.7;
} else if (age > 65) {
    price = price * 0.6;
}
```

**Magyarázat:** Az `age <= 6` miatt a 6 évesek is ingyen jegyet kapnak, pedig ez csak 6 év alatt jár (6 évesen 30% kedvezmény illetné meg őket). Az `age > 65` miatt a pontosan 65 évesek nem kapják meg a 40% kedvezményt, pedig az 65 éves kortól jár.

**Javítás:**

```javascript
if (age < 6) {
    discount = 1;
} else if (age < 18) {
    discount = 0.30;
} else if (age >= 65) {
    discount = 0.40;
}
```

### 3. Több kedvezményt is összevon

**Hibás kódrészlet:**

```javascript
if (isStudent) {
    price = price * 0.8;
}
```

**Magyarázat:** A diákkedvezményt az életkor szerinti kedvezmény után is alkalmazza, így a kedvezmények összeadódnak. Például egy 16 éves diák 3000 × 0,7 × 0,8 = 1680 Ft-ot fizet, pedig csak a nagyobb (30%) kedvezmény járna neki: 2100 Ft.

**Javítás:** A kedvezményt külön változóban kell tárolni, és a nagyobbat kell választani:

```javascript
if (isStudent) {
    discount = Math.max(discount, 0.20);
}
price = 3000 * (1 - discount);
```

### 4. Hibás a 3D felár

**Hibás kódrészlet:**

```javascript
if (is3D) {
    price = price * 1.8;
}
```

**Magyarázat:** A 3D jegyhez fix 800 Ft felárat kellene hozzáadni kedvezmény nélkül. A program ehelyett a már kedvezményes árat szorozza 1,8-cal, így a felár a kedvezménytől függően változik (teljes árú jegynél 2400 Ft, ingyenes jegynél 0 Ft).

**Javítás:**

```javascript
if (is3D) {
    price = price + 800;
}
```

### Javított függvény

```javascript
function calculateTicketPrice(age, isStudent, is3D) {
    if (!Number.isFinite(age) || age < 0 || age > 120) {
        throw new Error("Érvénytelen életkor");
    }

    let discount = 0;

    if (age < 6) {
        discount = 1;
    } else if (age < 18) {
        discount = 0.30;
    } else if (age >= 65) {
        discount = 0.40;
    }

    if (isStudent) {
        discount = Math.max(discount, 0.20);
    }

    let price = 3000 * (1 - discount);

    if (is3D) {
        price = price + 800;
    }

    return price;
}
```
