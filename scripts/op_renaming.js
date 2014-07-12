function RelationRenaming(new_name, relation) {
  this.new_name = new_name;
  this.relation = relation;
}

/*Projection.prototype.eval = function() {
  this.relation.eval()
  var child_res = this.relation.result;

  this.result = new Array();
  for(var i = 0; i < child_res.length; i++) {
    var projected_tuple = this.project(child_res[i]);
    this.result.pushDistinct(projected_tuple);
  }
  this.result;
}*/

RelationRenaming.prototype.eval = function() {
  this.relation.eval();
}


function ColumnRenaming(renaming, relation) {
  this.renaming = renaming;
  this.relation = relation;
}

ColumnRenaming.prototype.eval = function() {
  this.relation.eval();
  console.log("# ColumnRenaming started")
  this.buildAttrs();
  var child_res = this.relation.result;

  this.result = new Array();
  for(var i = 0; i < child_res.length; i++) {
    console.log("# cr step " + i)
    this.result.push(this.applyRenaming(child_res[i]));
  }
}

ColumnRenaming.prototype.applyRenaming = function(tuple) {
  var newTuple = {}
  for(var attr in tuple) {
    for(var i = 0; i < this.renaming.length; i++) {
      var newname = this.renaming[i].newname;
      if(this.renaming[i].oldname == attr) {
        newTuple[newname] = tuple[attr]
      } else {
        newTuple[attr] = tuple[attr]
      }
    }
  }
  return newTuple;
}

ColumnRenaming.prototype.buildAttrs = function() {
  this.attrs = []
  for(var i = 0; i < this.relation.attrs.length; i++) {
    var was_changed = false;
    for(var j = 0; j < this.renaming.length; j++) {
      if(this.relation.attrs[i] == this.renaming[j].oldname) {
        was_changed = true;
        this.attrs.push(this.renaming[j].newname)
      }
    }
    if(!was_changed) {
      this.attrs.push(this.relation.attrs[i])
    }
  }
  console.log(this.relation.attrs)
  console.log(this.attrs)
}