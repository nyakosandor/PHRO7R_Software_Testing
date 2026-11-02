# Mock objektumok használata (Mockito)

A korábbi `BankAccount` osztály kiegészítése értesítési szolgáltatással. A külső függőségeket a tesztek Mockitóval helyettesítik, így valódi értesítés nem megy ki.

## Fájlok

| Fájl (`src/main/java/com/example/`) | Tartalom |
|---|---|
| `BankAccount.java` | A bankszámla osztály |
| `BankService.java` | Befizetést hajt végre, majd értesítést küld. A `NotificationService` a konstruktoron keresztül érkezik. |
| `NotificationService.java` | Az értesítési szolgáltatás interfésze |
| `ExchangeRateService.java` | Az árfolyam-szolgáltatás interfésze |

| Fájl (`src/test/java/com/example/`) | Tartalom |
|---|---|
| `BankAccountTest.java` | A `BankAccount` JUnit 5 tesztjei |
| `BankServiceTest.java` | A `BankService` tesztjei mockolt értesítési szolgáltatással |
| `ExchangeRateServiceTest.java` | A mock előre beállított árfolyamának ellenőrzése |

## Követelmények

JDK 21 vagy újabb és Maven szükséges. A Maven az IntelliJ IDEA-ba is be van építve.

## Tesztek futtatása

Parancssorból, ebből a mappából:

```bash
mvn clean test
```

IntelliJ IDEA-ban: nyisd meg a mappát Maven-projektként, majd a `src/test/java` mappán válaszd a **Run 'All Tests'** parancsot.

## Mit fednek le a tesztek?

- **Egyenleg:** a `BankService` befizetése növeli a számla egyenlegét.
- **Értesítés:** sikeres befizetés után elmegy a `"Deposit successful"` üzenet, minden befizetésnél egyszer.
- **Sikertelen befizetés:** negatív, 0 és `NaN` összegnél kivétel keletkezik, az egyenleg nem változik, és nem történik értesítés.
- **Árfolyam:** a mock a beállított értéket adja vissza, devizapáronként külön is.

## Használt Mockito-lehetőségek

| Lehetőség | Hol | Mire |
|---|---|---|
| `mock()` | mindkét Mockito-tesztosztály | A szolgáltatás helyettesítése valódi megvalósítás nélkül |
| `verify()` | `BankServiceTest`, `ExchangeRateServiceTest` | Annak ellenőrzése, hogy a metódus a várt paraméterrel meghívódott |
| `verifyNoInteractions()` | `BankServiceTest` | Annak ellenőrzése, hogy sikertelen befizetésnél nincs értesítés |
| `when().thenReturn()` | `ExchangeRateServiceTest` | Előre meghatározott árfolyam beállítása |
