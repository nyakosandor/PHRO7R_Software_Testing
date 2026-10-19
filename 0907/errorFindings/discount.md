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

1. **A negatív rendelési összeget is elfogadja:** A szabályok szerint ilyen összeg nem megengedett.
2. **Két összegnél rossz kedvezményt ad:** 10 000 Ft-nál nem ad kedvezményt, 50 000 Ft-nál pedig 15% helyett csak 10%-ot.
3. **Hibásan számolja a VIP-kedvezményt:** 5 százalékpont helyett 5-öt ad hozzá, ezért a kedvezmény akkor is elérheti a 20%-ot, ha a rendelésre egyébként nem járna kedvezmény.
4. **Hibásan számolja ki a végösszeget:** 5% kedvezmény esetén például csak 0,05 Ft-ot von le, nem a rendelési összeg 5%-át.