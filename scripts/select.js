/*
 * old is the old table
 * new is the new table
 */
function applySelection(oldT, newT, pred) {
  var attrs = getAttrsFromTable(oldT);
  var oldtuples = getTuples(oldT, attrs);
  var newtuples = [];
  for(var i = 0; i < oldtuples.length; i++) {
    if(pred(oldtuples[i])) {
      newtuples.push(oldtuples[i]);
    }
  }
  fillTableWithTuples(newT, newtuples, attrs);
}