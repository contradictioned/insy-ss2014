function BaseRelation(name) {
  this.name = name;
  this.result = new Relation();
}

/**
 * Evaluating a BaseRelation means reading the content
 * of the HTML Table with the corresponding name.
 */
BaseRelation.prototype.eval = function() {
  var table = this.findTable(this.name);
  
  // TODO: Braucht man den Namen?!
  this.result.name = this.name;

  this.result.attributes = this.getAttrsFromTable(table);
  this.result.tuples = this.getTuples(table, this.result.attributes);
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
BaseRelation.prototype.getAttrsFromTable = function(table) {
  var th_data = table.getElementsByTagName('th');
  if(th_data.length == 0) {
    throw "Table seems to have no columns."
  }

  var attrs = new Array(th_data.length);
  for(var i = 0; i < th_data.length; i++) {
    var attr = th_data[i].innerHTML;
    attrs[i] = [this.name, attr]
  }
  return attrs;
}

/*
 * For a <tr>-Element and a list of attrs,
 * this function creates an object where the
 * keys are taken from attrs and the values
 * from the innerHTML of the <td>s
 */
BaseRelation.prototype.rowToTuple = function(trNode, attrs) {
  var tuple = new Tuple();
  tuple.values = new Array();
  var tds = trNode.getElementsByTagName('td');
  for(var i = 0; i < attrs.length; i++) {
    tuple.values[i] = tds[i].innerHTML;
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
BaseRelation.prototype.getTuples = function(table, attrs) {
  var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr')
  var tuples = new Array(rows.length);
  
  for(var i = 0; i < rows.length; i++) {
    tuples[i] = this.rowToTuple(rows[i], attrs);
  }
  return tuples;
}


BaseRelation.prototype.findTable = function(tablename) {
  var tables = document.getElementsByClassName('relation');
  for(var i = 0; i < tables.length; i++) {
    var tcaption = tables[i].getElementsByTagName('caption')[0];
    if(tcaption.innerText.indexOf(tablename) === 0) {
      return tables[i];
    }
  }
  throw "No such relation defined"
}