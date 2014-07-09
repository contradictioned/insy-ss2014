function Projection(attrs, relation) {
  this.attrs = attrs;
  this.relation = relation;
}

Projection.prototype.eval = function() {
  this.relation.eval()
  var child_res = this.relation.result;

  this.result = new Array();
  for(var i = 0; i < child_res.length; i++) {
    var projected_tuple = this.project(child_res[i]);
    this.result.pushDistinct(projected_tuple);
  }
  this.result;
}

Projection.prototype.project = function(tuple) {
  for(var name in tuple) {
    if(this.attrs.indexOf(name) == -1) {
      // Attribute name is not in list, so it will be deleted
      delete tuple[name];
    }
  }
  return tuple
}

Array.prototype.pushDistinct = function(x) {
  for(var i = 0; i < this.length; i++) {
    var equal = true;
    for(k in this[i]) {
      equal = equal && (this[i][k] == x[k])
    }
    if(equal) {
      // Object x is already in the array
      return this.length
    }
  }
  this.push(x)
}