function makeTablesExpendable() {
  var tables = document.getElementsByClassName("expendable");
  
  var decorator = document.createElement('span');
  decorator.classList.add('toggle')
  decorator.innerHTML = '▼' // ▲ 
  decorator.style.cursor = 's-resize'

  for (var i = 0; i < tables.length; i++) {
    hideTable(tables[i]);

    // add decorative thingy
    var head = tables[i].getElementsByTagName("caption")[0];
    var dec = decorator.cloneNode(true);
    head.appendChild(dec);
    dec.onclick = toggleTable;
    foo = dec
  };
}

function toggleTable() {
  var table = this.parentElement.parentElement;
  var b = table.getElementsByTagName("tbody")[0];
  if (b.style.display == 'none') { // table is shown
    showTable(table);
    table.getElementsByClassName('toggle')[0].innerHTML = '▲'
    table.getElementsByClassName('toggle')[0].style.cursor = 'n-resize'
  } else {
    hideTable(table);
    table.getElementsByClassName('toggle')[0].innerHTML = '▼'
    table.getElementsByClassName('toggle')[0].style.cursor = 's-resize'
  }
}

function hideTable(table) {
  var b = table.getElementsByTagName("tbody")[0];
  b.style.display = 'none';
}
function showTable(table) {
  var b = table.getElementsByTagName("tbody")[0];
  b.style.display = '';
}

function execQuery() {
  var querystring = document.getElementById('input').value
  debug("Onload function called for query: " + querystring);
  
  // clear
  document.getElementById('error_output').innerHTML = '';
  var old = document.getElementById('result_output').getElementsByTagName('table');
  if (old.length > 0) {
    old[0].remove();
  }

  try {
    result = QueryParser.parse(querystring) 
  } catch(e) {
    document.getElementById('error_output').innerHTML = e
  }
  result.eval();
  var table = build_table(result.result);
  document.getElementById('result_output').appendChild(table);
}

function prepareExamples() {
  var lis = document.getElementById("examples").getElementsByTagName("li");
  for(var i = 0; i < lis.length; i++) {
    lis[i].onclick = insertExample;
  }
}

function insertExample() {
  var str = this.innerHTML.replace("&lt;", "<");
  str = str.replace("&gt;", ">");
  document.getElementById('input').value = str;
  execQuery();
}

window.onload = function() {
  makeTablesExpendable();
  prepareExamples();

  // register query executing actions
  document.getElementById('computeitlikeabauss').onclick = execQuery;
  document.getElementById('input').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){ execQuery() }
  }
}