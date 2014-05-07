


db = db.getSiblingDB("api_production")



var hoy = new ISODate();
var maximaD1 = db.invoices.aggregate({$match:{local:"Demo01"}},{$group:{_id:"chiabe","max":{$max:"$date"}}})['result'][0]['max']
var maximaD2 = db.invoices.aggregate({$match:{local:"Demo02"}},{$group:{_id:"chiabe","max":{$max:"$date"}}})['result'][0]['max']
var segundosD1 = ((hoy - maximaD1) / 1000) + 3600*24
var segundosD2 = ((hoy - maximaD2) / 1000) + 3600*24


var cursor = db.invoices.find({"local":"Demo01"});
while (cursor.hasNext()) {
  var x = cursor.next();
  x['date'].setUTCSeconds(Math.ceil(segundosD1));
  db.invoices.save(x)
}


var cursor = db.invoices.find({"local":"Demo02"});
while (cursor.hasNext()) {
  var x = cursor.next();
  x['date'].setUTCSeconds(Math.ceil(segundosD2));
  db.invoices.save(x)
}

var cursor = db.log_invoices.find({"local":"Demo01"}).sort({date:-1});
while (cursor.hasNext()){
  var x = cursor.next();
  x['date'].setUTCSeconds(Math.ceil(segundosD1));
  x['date'].setUTCHours(0,0,0,0);
  q = x['_id'];
  ax = (x['date'].getUTCMonth()+1).toString()
  if (ax.length == 1){
    ax = '0'+ax
  }
  bx = x['date'].getUTCDate().toString()
  if (bx.length == 1){
    bx = '0'+bx
  }
  x['_id'] = x['local'] + "_" + x['date'].getUTCFullYear()+""+ax+""+bx;
//  print(q);
//  print(JSON.stringify(x));
  db.log_invoices.remove({"_id":q});
  db.log_invoices.insert(x);
}
 
var cursor = db.log_invoices.find({"local":"Demo02"}).sort({date:-1});
while (cursor.hasNext()){
  var x = cursor.next();
  x['date'].setUTCSeconds(Math.ceil(segundosD2));
  x['date'].setUTCHours(0,0,0,0);
  q = x['_id'];
  ax = (x['date'].getUTCMonth()+1).toString()
  if (ax.length == 1){
    ax = '0'+ax
  }
  bx = x['date'].getUTCDate().toString()
  if (bx.length == 1){
    bx = '0'+bx
  }
  x['_id'] = x['local'] + "_" + x['date'].getUTCFullYear()+""+ax+""+bx;
  db.log_invoices.remove({"_id":q});
  db.log_invoices.insert(x);
}


var cursor = db.log_products.find({"local":"Demo01"});
while (cursor.hasNext()){
  var x = cursor.next();
  x['date'].setUTCSeconds(Math.ceil(segundosD1));
  x['date'].setUTCHours(0,0,0,0);
  q = x['_id'];
  ax = (x['date'].getUTCMonth()+1).toString()
  if (ax.length == 1){
    ax = '0'+ax
  }
  bx = x['date'].getUTCDate().toString()
  if (bx.length == 1){
    bx = '0'+bx
  }
  x['_id'] = x['local']+"_"+x['product']+"_"+x['date'].getUTCFullYear()+""+ax+""+bx;
  db.log_products.remove({"_id":q});
  db.log_products.insert(x);
}

var cursor = db.log_products.find({"local":"Demo02"});
while (cursor.hasNext()){
  var x = cursor.next();
  x['date'].setUTCSeconds(Math.ceil(segundosD2));
  x['date'].setUTCHours(0,0,0,0);
  q = x['_id'];
  ax = (x['date'].getUTCMonth()+1).toString()
  if (ax.length == 1){
    ax = '0'+ax
  }
  bx = x['date'].getUTCDate().toString()
  if (bx.length == 1){
    bx = '0'+bx
  }
  x['_id'] = x['local']+"_"+x['product']+"_"+x['date'].getUTCFullYear()+""+ax+""+bx;
  db.log_products.remove({"_id":q});
  db.log_products.insert(x);
}



var cursor = db.log_user_locals.find({"local":"Demo01"});
while (cursor.hasNext()) {
  var x = cursor.next();
  x['created_at'].setUTCSeconds(Math.ceil(segundosD1));
  db.log_user_locals.save(x)
}

var cursor = db.log_user_locals.find({"local":"Demo02"});
while (cursor.hasNext()) {
  var x = cursor.next();
  x['created_at'].setSeconds(Math.ceil(segundosD2));
  db.log_user_locals.save(x)
}
