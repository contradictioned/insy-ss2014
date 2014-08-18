/*
 * This models a relation (which is input and result for every relational operator)
 */
function Relation() {
  this.name = undefined;
  this.attributes = [];
  this.tuples = [];
}

// TODO: Löschmich?
Relation.prototype = Array;