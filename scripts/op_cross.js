function Cross(left, right) {
  this.left = left;
  this.right = right;
}

/*
 * Implements a nested loop - cross product
 */
Cross.prototype.eval = function() {
  this.left.eval()
  this.right.eval()
  var left_res = this.left.result;
  var right_res = this.right.result;
  
  this.attrs = this.left.attrs.concat(this.right.attrs);
  this.result = new Array();
  for(var i = 0; i < left_res.length; i++) {
    for(var j = 0; j < right_res.length; j++) {
      var old_left = left_res[i]
      var old_right = right_res[j]
      var new_tuple = {};

      for(var name in old_left) {
        new_tuple[name] = old_left[name]
      }
      for(var name in old_right) {
        new_tuple[name] = old_right[name]
      }
      console.log(new_tuple)
      this.result.push(new_tuple)
    }
  }
  console.log(this.result)
}