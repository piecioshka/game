# TODO

## Engine

- [x] Create screen: Game
- [x] Engine: Create game object
- [x] Engine: Create world object
- [x] Engine: Create items object
- [x] Create player
- [x] Move player with LEFT, RIGHT arrows on keyboard
- [x] Support different keys controls for each character on board
- [x] Display character name above the asset (behind Feature Flag)
- [x] Display bounding box (behind Feature Flag)
- [ ] Create items: tickets, asteroids, clocks
- [ ] Create global countdown
- [ ] Move background during the flight
- [ ] Create screen: Login
- [ ] Create screen: User panel
- [ ] Create screen: Game over

## Features

- [ ] Ekran: Intro Wpisz
  - username
  - unikalny token, aby móc zweryfikować Twoje konto, dzięki temu, nie musisz podawać maila
  - [ ] Przechowywać dane w localStorage
  - [ ] Firebase: Stworzyć nowy wpis w rankingu
- [ ] Ekran: Panel użytkownika
  - [ ] Wyświetlać dane z localStorage
  - [ ] (Opcjonalnie) Dać możliwość zmiany username
- [ ] Ekran: Gra
  - [ ] Leci rakieta od dołu do góry
  - [ ] Czas ciągle maleje (countdown)
  - [ ] Poziomy trudności
    - [ ] Zmiana kolorystyczna (fiolet, zielony, pomarańczowy, czerwony)
    - [ ] Pojawiają zegarki z czasem
      - [ ] Dodanie czasu do ogólnego
    - [ ] Pojawiają się bilety na konferencję
      - [ ] Zwykłe punkty
- [ ] Ekran: Koniec gry
  - [ ] Pojawia się, gdy zmniejszający czas osiąga wartość 0
  - [ ] Firebase: Zapisać / Zaktualizować stan gry w rankingu
