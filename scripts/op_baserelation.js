function BaseRelation(name) {
  this.name = name;
}

BaseRelation.prototype.eval = function() {
  var table = findTable(this.name);
  this.attrs = getAttrsFromTable(table);
  this.result = getTuples(table, this.attrs);
  debug("BaseRelation '" + this.name + "' eval()ed.")
}

/*
 * Given a table, this function returns
 * the list of attributes.
 * E.g. on the table
 *   | id | name | street |
 *   | .....
 * it would return
 *   ['id', 'name', 'street']
 */
function getAttrsFromTable(table) {
  var th_data = table.getElementsByTagName('th');
  var attrs = new Array(th_data.length);
  for(var i = 0; i < th_data.length; i++) {
    attrs[i] = th_data[i].innerHTML;
  }
  return attrs;
}

/*
 * For a <tr>-Element and a list of attrs,
 * this function creates an object where the
 * keys are taken from attrs and the values
 * from the innerHTML of the <td>s
 */
function rowToTuple(trNode, attrs) {
  var tuple = {};
  var tds = trNode.getElementsByTagName('td');
  for(var i = 0; i < attrs.length; i++) {
    tuple[attrs[i]] = tds[i].innerHTML;
  }
  return tuple;
}

/*
 * Get the tuples stored in a table in form
 *   [
 *     {'pnr': 5, 'name': 'müller'},
 *     {'pnr': 3, 'name': 'meier'},
 *     ...
 *   ]
 */
function getTuples(table, attrs) {
  var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr')
  var tuples = new Array(rows.length);
  
  for(var i = 0; i < rows.length; i++) {
    tuples[i] = rowToTuple(rows[i], attrs);
  }
  return tuples
}


function findTable(tablename) {
  var tables = document.getElementsByClassName('relation');
  for(var i = 0; i < tables.length; i++) {
    var tcaption = tables[i].getElementsByTagName('caption')[0];
    if(tcaption.innerText.indexOf(tablename) === 0) {
      return tables[i];
    }
  }
  throw "No such relation defined"
}