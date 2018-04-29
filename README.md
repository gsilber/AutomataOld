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