# BankAccount

Egyszerű bankszámlát modellező Java osztály JUnit 5 egységtesztekkel. A számla induló egyenlege 0.

## Fájlok

| Fájl | Tartalom |
|---|---|
| `src/main/java/org/example/BankAccount.java` | A `BankAccount` osztály |
| `src/test/java/org/example/BankAccountTest.java` | A JUnit 5 tesztek |
| `pom.xml` | Maven-konfiguráció és függőségek |

## Követelmények

JDK 21 vagy újabb és Maven szükséges. A Maven az IntelliJ IDEA-ba is be van építve.

## Tesztek futtatása

Parancssorból, ebből a mappából:

```bash
mvn test
```

IntelliJ IDEA-ban: nyisd meg a mappát Maven-projektként, majd a `BankAccountTest` osztályon válaszd a **Run** parancsot.

## Használat

Az osztálynak nincs futtatható belépési pontja, más kódból használható:

```java
BankAccount account = new BankAccount();

account.deposit(1000);
account.withdraw(300);
account.getBalance(); // 700.0
```

### Hibás műveletek

Mindegyik `IllegalArgumentException` kivételt dob, az egyenleg pedig nem változik.

| Művelet | Példa |
|---|---|
| Negatív vagy 0 összegű befizetés | `deposit(-100)`, `deposit(0)` |
| Negatív vagy 0 összegű pénzfelvétel | `withdraw(-100)`, `withdraw(0)` |
| Az egyenlegnél nagyobb összeg felvétele | 1000-es egyenlegnél `withdraw(1000.01)` |
| Nem véges összeg befizetése vagy felvétele | `deposit(Double.NaN)`, `withdraw(Double.POSITIVE_INFINITY)` |

## Mit fednek le a tesztek?

- **Normál működés:** új számla egyenlege, egy és több befizetés, tört összegű befizetés, pénzfelvétel
- **Határértékek:** a teljes egyenleg felvétele, az egyenleget épp meghaladó összeg, felvétel üres számláról, 0 összeg
- **Érvénytelen bemenetek:** negatív összeg, `NaN`, pozitív és negatív végtelen

Minden sikertelen műveletet vizsgáló teszt azt is ellenőrzi, hogy az egyenleg változatlan maradt.

## Korlát

A feladat `double` típust ír elő, ezért a tört összegeknél lebegőpontos kerekítés léphet fel: például `0.1 + 0.2` eredménye `0.30000000000000004`. Valódi pénzkezeléshez `BigDecimal` lenne a megfelelő típus.
