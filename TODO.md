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
- [x] Countdown
  - [x] Create
  - [x] Start / pause / stop
- [x] Load sprite
  - Change image during rendering entity
- [x] Map

## Example Game "top-down-view"

- [x] Scene: Intro z obrazkiem powitalnym

- [x] Scene: Plansza
  - [x] Lecisz rakietą od dołu do góry
  - [x] Czas ciągle maleje (countdown)
    - [x] Gdy czas osiąga wartość 0 to "Game Over"
  - [x] Pojawiają się asteroidy
    - [x] Uderzenie w nie powoduje, że się ginie i "Game Over"
  - [x] Pojawiają się zegarki
    - [x] Dodanie czasu do głównego zegara
  - [x] Pojawiają się diamenty
    - [x] Po kolizji z nimi, dodają Ci się punkty
  - [x] Zmiana kolorystyczna (fiolet, zielony, pomarańczowy, czerwony)

- [ ] Scene: Game Over

## Example Game "side-view"

- [x] Scene: Plansza
  - [x] Chodzisz postacią i zbierać grzybki
  - [x] Czas ciągle maleje (countdown)
    - [x] Gdy czas osiąga wartość 0 to "Game Over"
  - [x] Pojawiają się wrogowie
    - [x] Dotknięcie nich powoduje, że się ginie i "Game Over"
  - [x] Możesz skoczyć na murek

- [x] Scene: Game Over
