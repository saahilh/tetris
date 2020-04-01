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
