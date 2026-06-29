# List of features to be implemented

## Engine

- [x] Game
  - [x] Create
  - [x] Initiate the game loop
- [x] World
  - [x] Create
  - [x] Render a canvas
- [x] Entity
  - [x] Create / Remove
  - [x] Set position
  - [x] Render image
  - [x] Display character label above the asset
  - [x] Display bounding box
  - [x] Destroy entities
  - [x] UI Events on entities
- [x] Arcade entity (like player)
  - [x] Create
- [x] Controlling: with keyboard
  - [x] Support different keys controls for each character on board
  - [x] Auto-moving by computer
- [x] Scenes
  - Switching between them
- [x] Views: Top Down View
- [x] Views: Side View
  - [x] Gravity
  - [x] Jumping
- [x] Collisions
  - [x] Support set handle for resolving collision
- [ ] Countdown
  - [ ] Create
  - [ ] Start / pause / stop
- [x] Load sprite
  - Change image during rendering entity
- [ ] Map

## Example Game "top-down-view"

- [x] Scene: Intro z obrazkiem powitalnym

- [ ] Scene: Plansza
  - [ ] Lecisz rakietą od dołu do góry
  - [ ] Czas ciągle maleje (countdown)
    - [ ] Gdy czas osiąga wartość 0 to "Game Over"
  - [ ] Pojawiają się asteroidy
    - [ ] Uderzenie w nie powoduje, że się ginie i "Game Over"
  - [ ] Pojawiają się zegarki
    - [ ] Dodanie czasu do głównego zegara
  - [ ] Pojawiają się diamenty
    - [ ] Po kolizji z nimi, dodają Ci się punkty
  - [ ] Zmiana kolorystyczna (fiolet, zielony, pomarańczowy, czerwony)

- [ ] Scene: Game Over

## Example Game "side-view"

- [ ] Scene: Plansza
  - [ ] Chodzisz postacią i zbierać grzybki
  - [ ] Czas ciągle maleje (countdown)
    - [ ] Gdy czas osiąga wartość 0 to "Game Over"
  - [ ] Pojawiają się wrogowie
    - [ ] Dotknięcie nich powoduje, że się ginie i "Game Over"
  - [ ] Możesz skoczyć na murek

- [ ] Scene: Game Over
