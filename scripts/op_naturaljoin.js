function NaturalJoin(left, right) {
  this.left = left;
  this.right = right;
}

NaturalJoin.prototype.eval = function() {
  this.left.eval()
  this.right.eval()
  var left_res = this.left.result;
  var right_res = this.right.result;

  this.join_attrs = getJoinAttrs(this.left.attrs, this.right.attrs)
  this.result = new Array();
  this.attrs = new Array();
  for(var i = 0; i < this.left.attrs.length; i++) {
    var name = this.left.attrs[i];
    if(this.join_attrs.indexOf(name) == -1) {
      this.attrs.push(this.left.attrs[i])
    }
  }
  for(var i = 0; i < this.join_attrs.length; i++) {
    this.attrs.push(this.join_attrs[i])
  }
  for(var i = 0; i < this.right.attrs.length; i++) {
    var name = this.right.attrs[i];
    if(this.join_attrs.indexOf(name) == -1) {
      this.attrs.push(this.right.attrs[i])
    }
  }

  for(var i = 0; i < left_res.length; i++) {
    for(var j = 0; j < right_res.length; j++) {
      var old_left = left_res[i]
      var old_right = right_res[j]
      // 1. check if these are to be joined
      var joinme = true
      for(var k = 0; k < this.join_attrs.length; k++) {
        joinme = joinme && (old_left[this.join_attrs[k]] == old_right[this.join_attrs[k]])
      }
      if(!joinme) {
        continue;
      }

      var new_tuple = {};
      for(var name in old_left) {
        new_tuple[name] = old_left[name]
      }
      for(var name in old_right) {
        if(this.join_attrs.indexOf(name) == -1) {
          new_tuple[name] = old_right[name]
        }
      }
      this.result.push(new_tuple)
    }
  }
}

function getJoinAttrs(l,r) {
  joinAttrs = []
  for(var i = 0; i < l.length; i++) {
    if(r.indexOf(l[i]) != -1) {
      joinAttrs.push(l[i])
    }
  }
  return joinAttrs;
}