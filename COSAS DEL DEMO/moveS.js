
db = db.getSiblingDB(destiny)
var cursor = db.invoices.find({"local":localo});
while (cursor.hasNext()) {
  var x = cursor.next();
  x['_id'] = x['_id'].replace(localo, locald);
  x['client'] = x['client'].replace(localo, locald);
  x['local'] = locald;
  var arrayLength = x['products'].length;
  for (var i = 0; i < arrayLength; i++) {
    x['products'][i]['pr'] = x['products'][i]['pr'].replace(localo, locald);
  }
  db.invoices.save(x)
}


var cursor = db.products.find({"local":localo});
while (cursor.hasNext()) {
  var x = cursor.next();
  x['_id'] = x['_id'].replace(localo, locald);
  x['local'] = locald;
  db.products.save(x)
}

var cursor = db.log_invoices.find({"local":localo});
while (cursor.hasNext()) {
  var x = cursor.next();
  x['_id'] = x['_id'].replace(localo, locald);
  x['local'] = locald;
  db.log_invoices.save(x)
}


var cursor = db.log_products.find({"local":localo});
while (cursor.hasNext()) {
  var x = cursor.next();
  x['_id'] = x['_id'].replace(localo, locald);
  x['product'] = x['product'].replace(localo, locald);
  x['local'] = locald;
  db.log_products.save(x)
}


var cursor = db.log_user_locals.find({"local":localo});
while (cursor.hasNext()) {
  var x = cursor.next();
  x['_id'] = x['_id'].replace(localo, locald);
  x['client'] = x['client'].replace(localo, locald);
  x['local'] = locald;
  var arrayLength = x['invoices'].length;
  for (var i = 0; i < arrayLength; i++) {
    x['invoices'][i] = x['invoices'][i].replace(localo, locald);
  }
  db.log_user_locals.save(x)
}

