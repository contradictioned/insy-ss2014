/*
 * Returns a new dom-table-element
 */
function build_table(tuples, attrs) {
  var table = document.createElement('table');
  table.classList.add('relation');
  
  var caption = document.createElement('caption');
  caption.innerHTML = 'RESULT';
  table.appendChild(caption);
  
  fillTableHeader(table, attrs);

  var tbody = document.createElement('tbody');
  table.appendChild(tbody);
  
  for(var i = 0; i < tuples.length; i++) {
    var el = createRow(tuples[i], attrs)
    tbody.appendChild(el);
  }
  return table;
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