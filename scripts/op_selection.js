function Selection(predicate, relation) {
  this.predicate = predicate;
  this.relation = relation;
}

Selection.prototype.eval = function() {
  this.relation.eval();
  var child_res = this.relation.result;
  
  this.result = new Relation();
  this.result.attributes = this.relation.result.attributes;
  this.result.tuples = new Array();
  for(var i = 0; i < child_res.tuples.length; i++) {
    if(this.predicate(child_res.tuples[i])) {
      this.result.tuples.push(child_res.tuples[i]);
    }
  }
}

Selection.prototype.getAttr = function(attrname) {
  var attr_index;
  if(attrname.indexOf(".") === -1) {
    for(var i = 0; i < this.result.attributes.length; i++) {
      if(this.result.attributes[i][1] == attrname) {
        attr_index = i;
      }
    }
  } else {
    var x = attrname.split(".")
    for(var i = 0; i < this.result.attributes.length; i++) {
      if(this.result.attributes[i][0] == x[0] && this.result.attributes[i][1] == x[1]) {
        attr_index = i;
      }
    }
  }
  return attr_index;
}
