Egy webáruház a rendelési érték alapján kedvezményt biztosít.

    10 000 Ft alatt nincs kedvezmény.
    10 000 Ft-tól 24 999 Ft-ig 5% kedvezmény jár.
    25 000 Ft-tól 49 999 Ft-ig 10% kedvezmény jár.
    50 000 Ft-tól 15% kedvezmény jár.
    VIP ügyfél további 5 százalékpont kedvezményt kap.
    A maximális kedvezmény 20%.
    Negatív rendelési érték nem megengedett.

A függvény a fizetendő összeget adja vissza.

Hibák:

### 1. A negatív rendelési összeget is elfogadja

**Hibás kódrészlet:**

```javascript
function calculateDiscountedPrice(orderValue, isVip) {
    let discount = 0;
    ...
```

**Magyarázat:** A szabályok szerint negatív rendelési érték nem megengedett, a program mégsem ellenőrzi a bemenetet. Például -5000 Ft-ra egyszerűen visszaad egy negatív összeget.

**Javítás:** A számítás előtt hibát kell jelezni:

```javascript
if (!Number.isFinite(orderValue) || orderValue < 0) {
    throw new Error("Érvénytelen rendelési érték");
}
```

### 2. Két határértéknél rossz kedvezményt ad

**Hibás kódrészlet:**

```javascript
if (orderValue > 10000 && orderValue < 25000) {
    discount = 0.05;
} else if (orderValue >= 25000 && orderValue <= 50000) {
    discount = 0.10;
} else if (orderValue > 50000) {
    discount = 0.15;
}
```

**Magyarázat:** A `> 10000` miatt pontosan 10 000 Ft-nál nem ad kedvezményt, pedig 5% járna. A `<= 50000` miatt pontosan 50 000 Ft-nál 15% helyett csak 10%-ot ad.

**Javítás:**

```javascript
if (orderValue >= 50000) {
    discount = 0.15;
} else if (orderValue >= 25000) {
    discount = 0.10;
} else if (orderValue >= 10000) {
    discount = 0.05;
}
```

### 3. Hibásan számolja a VIP-kedvezményt

**Hibás kódrészlet:**

```javascript
if (isVip === true) {
    discount += 5;
}
```

**Magyarázat:** A kedvezményt tizedes törtként tárolja (0,05 = 5%), a VIP-nél viszont 5-öt ad hozzá, ami 500%-nak felel meg. Ezt utána a 20%-os korlát levágja, ezért minden VIP-ügyfél kedvezménye 20% lesz, akkor is, ha egyébként nem járna neki kedvezmény (pl. 5000 Ft-os rendelésnél 5% helyett 20%).

**Javítás:** 5 százalékpont = 0,05:

```javascript
if (isVip === true) {
    discount += 0.05;
}
```

### 4. Hibásan számolja ki a végösszeget

**Hibás kódrészlet:**

```javascript
return orderValue - discount;
```

**Magyarázat:** A kedvezmény arány, nem összeg. 5% kedvezménynél például csak 0,05 Ft-ot von le a rendelési összeg 5%-a helyett.

**Javítás:**

```javascript
return orderValue * (1 - discount);
```

### Javított függvény

```javascript
function calculateDiscountedPrice(orderValue, isVip) {
    if (!Number.isFinite(orderValue) || orderValue < 0) {
        throw new Error("Érvénytelen rendelési érték");
    }

    let discount = 0;
    if (orderValue >= 50000) {
        discount = 0.15;
    } else if (orderValue >= 25000) {
        discount = 0.10;
    } else if (orderValue >= 10000) {
        discount = 0.05;
    }

    if (isVip === true) {
        discount += 0.05;
    }

    if (discount > 0.20) {
        discount = 0.20;
    }

    return orderValue * (1 - discount);
}
```
