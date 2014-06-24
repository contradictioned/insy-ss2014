function debug(s) {
  console.log(s)
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

function fillTableHeader(table, attrs) {
  var thead = document.createElement('thead');
  var tr = document.createElement('tr');
  thead.appendChild(tr);
  for(var i = 0; i < attrs.length; i++) {
    var th = document.createElement('th');
    th.innerHTML = attrs[i];
    tr.appendChild(th)
  }
  table.appendChild(thead);
}

/* 
 * Creates a <tr>-element from a tuple 
 */
function createRow(tuple, attrs) {
  var tr = document.createElement('tr');
  for(var i = 0; i < attrs.length; i++) {
    var td = document.createElement('td')
    td.innerHTML = tuple[attrs[i]];
    tr.appendChild(td)
  }
  return tr
}

/*
 * Writes (1) the table header and
 *        (2) a row for every tuple
 * into the table.
 * Attenzione: Duplicates are preserved.
 */
function fillTableWithTuples(table, tuples, attrs) {
  fillTableHeader(table, attrs);
  
  var tbody = document.createElement('tbody');
  table.appendChild(tbody);
  
  for(var i = 0; i < tuples.length; i++) {
    var el = createRow(tuples[i], attrs)
    tbody.appendChild(el);
  }
}