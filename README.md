# Automata Simulator Project 
Releases: v0.2 - Current state of the project

This is a project I started to demonstrate various types of computational models in Computer Science.

Currently, only the FSM editor is implemented and working.  It should be fully featured.

### What's coming next:
* Adding epsilon transitions to the model for FSM
* Adding a strong mode, which will require all states to have transitions for all characters in the alphabet.  Thinking about an auto-correct button
* Displaying information including
  * Display formal definition (Q,Sigma,Delta,S,F) for nfsm (Q,Sigma,delta,q0,F) for dfsm
  * Display a corresponding regular expression wiht copy button
  * Allow download of delta as a csv file
  * Show quirks
* Build a page which will show the formal definition (with or without anotations from the creation) of a deterministic version of the drawn machine if it is non-deterministic.

### What's coming later:
1) Push down automata
2) Turing Machines

### Current Documentation
#### FSM Editor
##### Features
* Draw automata deterministic or non-deterministic with detection
* FSM Validation
* Save and load to/from local machine
* Export as a PNG image
##### Guide
###### General instructions
* All toolbar items and most UI elements have tooltips to help you.
* All drawing elements have context menus
###### Create an automata
To create an automata, simply click on the state button in the toolbar, and click somewhere on the drawing surface.  States are by default named qx where x is an ascending integer.  You may change the name so long as it is unique, and does not begin with a q.
Add more states as needed.
To add a transition, click the transition button in the toolbar, and click on a state.  Then move your mouse to the destination state, and click on it.  The state is created.  You can change the characters accepted by the transition (or set to epsilon) by typing them.  Character sets consist of a comma sepearated list of single characters, escape characters, or character ranges of the form a-z.
####### Note: All state and transition property changes will not become permenent until you click the update button.
