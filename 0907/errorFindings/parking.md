 Egy parkoló díjszabása:

    az első 15 perc ingyenes;
    15 perc felett minden megkezdett óra 600 Ft;
    a napi maximális parkolási díj 5000 Ft;
    hétvégén a normál díj 50%-át kell fizetni;
    VIP ügyfél további 20% kedvezményt kap;
    negatív parkolási idő nem megengedett.

A függvény a fizetendő parkolási díjat adja vissza. 

Hibák:

1. **A VIP-kedvezmény nem 20%:** A program csak 20 Ft-ot von le. Emiatt egy ingyenes parkolás díja VIP-ügyfélnél akár -20 Ft is lehet.
2. **A megkezdett órák díja hibás:** Például 20 perc parkolást a program 0 órának vesz, pedig az ingyenes 15 perc után már 600 Ft-ot kellene fizetni.
3. **A 15 perces parkolásért tévesen fizetni kell:** Az első 15 percnek ingyenesnek kellene lennie, de a program ezt a határértéket nem kezeli ingyenesként.
4. **A negatív parkolási időt elfogadja:** A program nem jelzi hibásnak a nulla percnél rövidebb időt.
5. **Nem világos, hogyan járnak együtt a kedvezmények:** A szabályok nem mondják meg, hogy hétvégén a VIP-kedvezmény a félárú díjból vonódik-e le, vagy a két kedvezményt össze kell adni.
6. **A napi díjkorlát miatt elveszhet a kedvezmény:** A program csak a kedvezmények után állítja meg a díjat 5 000 Ft-nál. Hosszabb parkolásnál emiatt a VIP-ügyfél is fizethet teljes 5 000 Ft-ot.