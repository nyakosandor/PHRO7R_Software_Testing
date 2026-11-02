Egy parkoló díjszabása:

    az első 15 perc ingyenes;
    15 perc felett minden megkezdett óra 600 Ft;
    a napi maximális parkolási díj 5000 Ft;
    hétvégén a normál díj 50%-át kell fizetni;
    VIP ügyfél további 20% kedvezményt kap;
    negatív parkolási idő nem megengedett.

A függvény a fizetendő parkolási díjat adja vissza.

Hibák:

### 1. A VIP-kedvezmény nem 20%

**Hibás kódrészlet:**

```javascript
if (isVip) {
    fee = fee - 20;
}
```

**Magyarázat:** A program 20% helyett fix 20 Ft-ot von le. Ha a díj 0 (pl. 15–59 perc a 2. hiba miatt), a VIP-ügyfél díja -20 Ft lesz.

**Javítás:**

```javascript
if (isVip) {
    fee = fee * 0.8;
}
```

### 2. A megkezdett órák díja hibás

**Hibás kódrészlet:**

```javascript
let hours = Math.floor(minutes / 60);
```

**Magyarázat:** A `Math.floor` lefelé kerekít, így csak a teljes órákat számolja, nem a megkezdetteket. Például 20 perc parkolást 0 órának vesz (0 Ft), pedig az ingyenes 15 perc után már 600 Ft-ot kellene fizetni. 61 percért is csak 600 Ft-ot kér 1200 Ft helyett.

**Javítás:** Felfelé kell kerekíteni:

```javascript
let hours = Math.ceil(minutes / 60);
```

### 3. A pontosan 15 perces parkolásért fizetni kell

**Hibás kódrészlet:**

```javascript
if (minutes < 15) {
    return 0;
}
```

**Magyarázat:** Az első 15 perc ingyenes, tehát pontosan 15 percnél is 0 Ft-ot kellene visszaadni. A `<` miatt a 15 perc már nem ingyenes. (A 2. hiba miatt ez jelenleg nem látszik, mert a `Math.floor` 15 percre 0 órát ad, de a `Math.ceil` javítás után már 600 Ft lenne.)

**Javítás:**

```javascript
if (minutes <= 15) {
    return 0;
}
```

### 4. A negatív parkolási időt elfogadja

**Hibás kódrészlet:**

```javascript
if (minutes < 15) {
    return 0;
}
```

**Magyarázat:** Negatív parkolási időre a program hiba helyett 0 Ft-ot ad vissza, mintha érvényes ingyenes parkolás lenne.

**Javítás:** A függvény elején hibát kell jelezni:

```javascript
if (!Number.isFinite(minutes) || minutes < 0) {
    throw new Error("Érvénytelen parkolási idő");
}
```

### 5. A napi díjkorlát a kedvezmények után érvényesül

**Hibás kódrészlet:**

```javascript
if (isWeekend) {
    fee = fee * 0.5;
}

if (isVip) {
    fee = fee - 20;
}

if (fee > 5000) {
    fee = 5000;
}
```

**Magyarázat:** Az 5000 Ft-os napi maximum a normál díjra vonatkozik, a program viszont csak a kedvezmények után vágja le. Hosszabb parkolásnál emiatt elvész a kedvezmény: például 20 óra (12 000 Ft) hétvégén 6000 Ft lenne, amit a program 5000 Ft-ra vág. Helyesen 5000 Ft × 0,5 = 2500 Ft-ot kellene fizetni.

**Javítás:** Előbb a napi maximumot kell alkalmazni, utána a kedvezményeket:

```javascript
if (fee > 5000) {
    fee = 5000;
}
if (isWeekend) {
    fee = fee * 0.5;
}
if (isVip) {
    fee = fee * 0.8;
}
```

### 6. A specifikáció hiányossága: a kedvezmények viszonya

**Magyarázat:** A szabályok nem mondják meg, hogy hétvégén a VIP-kedvezmény a félárú díjból vonódik-e le (0,5 × 0,8 = 40% fizetendő), vagy a két kedvezményt össze kell adni (50% + 20% = 30% fizetendő). A „további” szó az egymás utáni alkalmazásra utal, ezért a javított függvény így számol, de ezt a megrendelővel tisztázni kell.

### Javított függvény

```javascript
function calculateParkingFee(minutes, isWeekend, isVip) {
    if (!Number.isFinite(minutes) || minutes < 0) {
        throw new Error("Érvénytelen parkolási idő");
    }

    if (minutes <= 15) {
        return 0;
    }

    let hours = Math.ceil(minutes / 60);
    let fee = hours * 600;

    if (fee > 5000) {
        fee = 5000;
    }

    if (isWeekend) {
        fee = fee * 0.5;
    }

    if (isVip) {
        fee = fee * 0.8;
    }

    return fee;
}
```
