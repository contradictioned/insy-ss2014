function debug(s) {
  console.log(s)
}

/*
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
 
function createRow(tuple, attrs) {
  var tr = document.createElement('tr');
  for(var i = 0; i < attrs.length; i++) {
    var td = document.createElement('td')
    td.innerHTML = tuple[attrs[i]];
    tr.appendChild(td)
  }
  return tr
}*/

/*
 * Writes (1) the table header and
 *        (2) a row for every tuple
 * into the table.
 * Attenzione: Duplicates are preserved.
 
function fillTableWithTuples(table, tuples, attrs) {
  fillTableHeader(table, attrs);
  
  var tbody = document.createElement('tbody');
  table.appendChild(tbody);
  
  for(var i = 0; i < tuples.length; i++) {
    var el = createRow(tuples[i], attrs)
    tbody.appendChild(el);
  }
}*/