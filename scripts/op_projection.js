function Projection(attrs, relation) {
  this.attrs = attrs;
  this.relation = relation;
  this.indecesToStay = [];
}

Projection.prototype.eval = function() {
  this.relation.eval()
  var child_res = this.relation.result;
  this.result = new Relation();

  for(var i = 0; i < child_res.attributes.length; i++) {
    var cattr = child_res.attributes[i];
    for(var j = 0; j < this.attrs.length; j++) {
      // just attr
      if(this.attrs[j].indexOf(".") === -1) {
        if (this.attrs[j] == cattr[1]) {
          this.indecesToStay.push(i)
          this.result.attributes.push(cattr)
        }
      }
      // full qualified
      if(this.attrs[j].indexOf(".") >= 0) {
        var split = this.attrs[j].split(".")
        if (split[0] == cattr[0] && split[1] == cattr[1]) {
          this.indecesToStay.push(i)
          this.result.attributes.push(cattr)
        }
      }
    }
  }

  for(var i = 0; i < child_res.tuples.length; i++) {
    var projected_tuple = this.project(child_res.tuples[i]);
    this.result.tuples.pushDistinct(projected_tuple);
  }
  console.log(this.result)
}

Projection.prototype.project = function(tuple) {
  console.log("=======")
  console.log("starting projecting the following tuple")
  console.log(tuple)
  console.log("with indeces to stay = ")
  console.log(this.indecesToStay)
  var newt = new Tuple()
  console.log(this.relation.result.attributes)
  for(var i = 0; i < tuple.values.length; i++) {
    if(this.indecesToStay.indexOf(i) != -1) {
      newt.values.push(tuple.values[i])
    }
  }
  console.log("results in:")
  console.log(newt)
  console.log("-------")
  return newt
}

Array.prototype.pushDistinct = function(x) {
  for(var i = 0; i < this.length; i++) {
    var equal = true;
    for(j = 0; j < this[i].values.length; j++) {
      equal = equal && (this[i].values[j] == x.values[j])
    }
    if(equal) {
      // Object x is already in the array
      return this.length
    }
  }
  this.push(x)
}