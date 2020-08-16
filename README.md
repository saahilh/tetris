# About
A basic implementation of tetris using React.js

# Game algorithm
  * Generate a piece
  * Have the piece move down rows one tick at a time until it collides with board edge or placed pieces
    * If up pressed, change orientation of piece
    * If left or right pressed, move piece one column unless this moves it out of bounds
    * If down pressed, increase tick rate
    * If space pressed, immediately collide vertically and continue
  * Add piece to placed pieces
  * If placed pieces now out of bounds, end game due to loss
  * Remove 0 <= n <= 4 completed rows, increment score by n, and shift down all rows above n
  * Repeat until game end

# Key words / ideas
  * game
  * piece
  * placed pieces
    * cells
  * row
  * column
  * collision
  * tick (time)
  * board edge
  * orientation of piece
  * keypress
  * bounds
  * game end
  * score

# Feedback from younger brother
To add:
1) Ghost
2) Fix hold bug where held block transcends games
3) have score account for dropping quicker and for tetris's [https://harddrop.com/wiki/Scoring]
4) SFX
5) have levels [basically just increase gravity as time continues]
6) at least 3 previews
7) 2 rotation buttons
8) customizable controls, or at least a way to see what they are
9) customizable das/ar/soft drop speed [note: this isn't required, and you can create a tetris that forces you into 1 das/ar like the nes tetris did]
10) music
11) adjustable grid transparency
12) srs rotation13) decrease of lock delay after hitting a certain speed [e.g. after level 20 of gravity increases, you instead get less time to finiick with the pieces once they land]
14) bag system of getting next blocks. [https://harddrop.com/wiki/Random_Generator]
other rotation systems exist beyond just srs: https://tetris.fandom.com/wiki/Category:Rotation_Systems
to make tetris music: http://beepbox.co