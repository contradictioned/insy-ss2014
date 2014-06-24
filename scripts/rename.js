function renameAttr(tuple, newA, oldA) {
  if(tuple[oldA]) {
    tuple[newA] = tuple[oldA];
    delete tuple[oldA]
  }
  return tuple
}

/*
 * old is the old table
 * new is the new table
 */
function applyRename(oldT, newT, op) {
  var attrs = getAttrsFromTable(oldT);
  var oldtuples = getTuples(oldT, attrs);
  var newtuples = new Array(oldtuples.length);

  var matches = op.match(/(\w+)\s*(<-)\s*(\w+)/)
  if(matches == null) {
    // renaming of relation
    for(var i = 0; i < oldtuples.length; i++) {
      newtuples[i] = oldtuples[i]
    }
  } else {
    // renaming of an attribute
    debug(matches)
    debug(attrs)
    for(var i = 0; i < oldtuples.length; i++) {
      newtuples[i] = renameAttr(oldtuples[i],matches[1],matches[3]);
    }
    idx = attrs.indexOf(matches[3])
    debug(idx)
    attrs[idx] = matches[1]
  }
  fillTableWithTuples(newT, newtuples, attrs);
}