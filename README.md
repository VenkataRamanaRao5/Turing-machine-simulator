# Turing-machine-simulator
Simulates the working of a turing machine using html, css, js.

Takes a transition table and optionally, tape input.

The state given in the first row becomes the start state.

Press space or click the screen to pause/play.

The action is given in the following format:
* Comma separated
* L for left, R for right (case-sensitive)
* E (case-sensitive) or space (' ') for erase
* Any other character for print
  
**Example** :
 Print 1, move right, Print 0, move left, Erase is given as 1, R, 0, L, E
