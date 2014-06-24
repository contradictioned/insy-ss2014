/*
 * Returns a strings which represents attributes
 * Attenzione: this may not be compatible with
 * the actual present attributes!
 */
function parseAttrlist(str) {
  var arr = str.split(',')
  for(var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].trim()
  }
  return arr;
}

// normalizes an operand
function operandToStr(str) {
  if(/'\w+'|"\w+"|\d+/.test(str)) {
    debug("I think, this is a digit or a string: " + str)
    return str
  }
  debug("I think, this is a column: " + str)
  return 'tuple.' + str
}

/*
 * Parses a string which represtens a predicate
 * that should be evaluated upon a tuple.
 * Supported operators:
 *   ==, !=, <, <=, >, >=
 * This function returns a function that can be
 * executed on a tuple and returns a boolean.
 * (I.e. str => (tuple => bool))
 */
function parsePred(str) {
  var matches = str.match(/([\w|'|"]+)\s*(==|!=|<|>|<=|>=)\s*([\w|'|"]+)/)
  debug(matches)
  var op1 = operandToStr(matches[1])
  var operator = matches[2]
  var op2 = operandToStr(matches[3])
  var fn = Function("tuple", "return " + op1 + operator + op2)
  return fn
}