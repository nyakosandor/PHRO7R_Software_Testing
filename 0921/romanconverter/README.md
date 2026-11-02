# Arab szám → római szám konverter (TDD)

A program az 1 és 3999 közötti egész számokat római számmá alakítja. Tesztvezérelt fejlesztéssel (TDD) készült, a tesztek QUnit keretrendszerben futnak.

## Fájlok

| Fájl | Tartalom |
|---|---|
| `app.js` | A `convertToRoman(num)` függvény |
| `test.js` | A QUnit-tesztek |
| `test.html` | A tesztek futtatása böngészőben |
| `package.json` | Függőségek és az `npm test` parancs |

## Telepítés

Node.js (18+) és npm szükséges.

```bash
npm install
```

## Tesztek futtatása

Parancssorból:

```bash
npm test
```

Böngészőben: az `npm install` után nyisd meg a `test.html` fájlt.

## Használat

```javascript
const { convertToRoman } = require("./app.js");

convertToRoman(1994); // "MCMXCIV"
convertToRoman(3999); // "MMMCMXCIX"
```

### Érvénytelen bemenetek

| Bemenet | Eredmény |
|---|---|
| nem egész szám (`1.5`, `NaN`, `Infinity`, `"10"`, `null`, `undefined`) | `TypeError` |
| tartományon kívüli egész szám (`0`, negatív, `4000` vagy több) | `RangeError` |

## Mit fednek le a tesztek?

- **Normál működés:** I, II, III, V, VI, VIII, X, XX, L, C, D, M
- **A kivonásos alak speciális esetei:** IV, IX, XL, XC, CD, CM, valamint a 444 → CDXLIV
- **A specifikáció példái:** 1, 4, 9, 14, 58, 1994, 3999
- **Határértékek:** 1 (alsó határ), 3999 (felső határ), 3888 (a leghosszabb alak), 0 és 4000 (épp a tartományon kívül)
- **Érvénytelen bemenetek:** negatív, tört, `NaN`, `Infinity`, szöveg, `null`, `undefined`, hiányzó paraméter

## A TDD folyamat

A fejlesztés Red → Green → Refactor ciklusokban haladt, és a commitok követik ezt:

- `test: ... (red)`: új, kezdetben sikertelen teszt
- `feat: ... (green)`: a teszt teljesítéséhez szükséges minimális kód
- `refactor: ...`: szerkezeti javítás, a tesztek közben zöldek maradnak

A sorrend: `I` → `I` ismétlése → `V` → `IV` → `X`, `IX` → `X` ismétlése → **refactor: táblázat alapú átalakítás** → `XL`, `L`, `XC` → `C`, `CD`, `D`, `CM`, `M` → a specifikáció példái és a határértékek → tartomány-ellenőrzés → típus-ellenőrzés → **refactor: a bemenet-ellenőrzés kiemelése**.

A teljes folyamat a commit-történetben látható:

```bash
git log --oneline -- .   # a projekt mappájából futtatva
```
