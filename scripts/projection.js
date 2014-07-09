/*function project(tuple, plist) {
  for(var name in tuple) {
    if(plist.indexOf(name) == -1) {
      // Attribute name is not in plist, so it will be deleted
      delete tuple[name];
    }
  }
  return tuple
}*/

/*
 * old is the old table
 * new is the new table
 */
function applyProjection(oldT, newT, plist) {
  var oldAttrs = getAttrsFromTable(oldT);
  var oldtuples = getTuples(oldT, oldAttrs);
  var newtuples = new Array(oldtuples.length);
  for(var i = 0; i < oldtuples.length; i++) {
    newtuples[i] = project(oldtuples[i],plist);
  }
  fillTableWithTuples(newT, newtuples, plist);
}

