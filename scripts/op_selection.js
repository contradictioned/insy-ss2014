function Selection(predicate, relation) {
  this.predicate = predicate;
  this.relation = relation;
}

Selection.prototype.eval = function() {
  this.relation.eval();
  var child_res = this.relation.result;

  console.log(this);
  
  this.attrs = this.relation.attrs;
  this.result = new Array();
  for(var i = 0; i < child_res.length; i++) {
    if(this.predicate(child_res[i])) {
      this.result.push(child_res[i]);
    }
  }
}