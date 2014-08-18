
Meta
====

A *constant* is 

*attribute*


Selection
=========

Selections are to be written as

    \sigma[predicate](relation)

And are parsed into a `Selection` js object. The predicate itself consists of a boolean formula that is composed by formula with ∧, ∨, or ¬. Or it is the evaluation of `left θ right` with left and right either constants or attributes.

θ can be one of ('==' / '!=' / '<=' / '>=' / '<' / '>') and is named *predicateOp*.

The attribute is referenced via the `getAttr` attribute.


selection
 = '\\sigma['pred:predicate']('rel:relation')' { return new Selection(pred, rel) }
predicate
 = fst:predicateEl [ ]* p:predicateOp [ ]* snd:predicateEl { return Function("tuple", "return " + fst + p + snd) }
predicateOp
 = ('==' / '!=' / '<=' / '>=' / '<' / '>')
predicateEl
 = a:attrName { return "tuple['"+ a +"']"; } /* An attribute */
 / "\""a:[^"]+"\"" { return "\"" + a.join("") + "\""; } /* A constant string */
 / digits:[0-9]+ { return parseInt(digits.join(""), 10); }
