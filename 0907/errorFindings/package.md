 Egy futárszolgálat a csomagokat méret és tömeg alapján kategorizálja.

    Small legfeljebb 2 kg; mindhárom mérete legfeljebb 30 cm.
    Medium legfeljebb 10 kg; egyik mérete sem nagyobb 60 cm-nél.
    Large legfeljebb 30 kg; egyik mérete sem nagyobb 120 cm-nél.

    Egyéb esetben: OVERSIZE

    Unordered List ItemÉrvénytelen a csomag, ha:

bármely mérete 0 vagy negatív; tömege 0 vagy negatív.

Ebben az esetben:

INVALID 

Hibák:

1. **A hibás adatú csomagokat nem jelzi:** Nulla vagy negatív méret, illetve tömeg esetén `INVALID` választ kellene adnia.
2. **A SMALL kategóriánál rosszul kezeli a határértékeket:** A pontosan 2 kg-os vagy 30 cm-es csomagokat nem sorolja a SMALL kategóriába, pedig beleférnek a megadott határokba.
3. **A MEDIUM kategóriába túl nagy csomag is kerülhet:** A programnak minden méretet ellenőriznie kellene, de elég neki, ha csak az egyik 60 cm alatti. Így például egy 200 × 200 × 10 cm-es csomag is MEDIUM besorolást kaphat.