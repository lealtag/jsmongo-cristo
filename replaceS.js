mapaPFroyo = {
    "Yogur Helado":"Granjeros",
    "Agua Mineral Minalba 330Ml": "Agua",
    "Barquilla" : "Pepitos",
    "Tapa Plastica Tina 250cc": "Extra queso",
    "Agua Mineral Minalba 600Ml":"Extra tocineta", 
    "Lipton Limon Peq":"Té de durazno",
    "Lipton Durazno Peq":"Té de limón",
    "Promo 200g x 40":"Perro caliente promoción"
             }


mapaPWok = {   
    "FIDEOS DE ARROZ":"Hamburguesa tradicional",
    "FIDEOS DE HUEVO":"Hamburguesa de pollo",
    "FIDEOS INTEGRALES":"Hamburguesa de camaron",
    "ARROZ FRITO":"Tocineta",
    "ARROZ INTEGRAL FRITO":"Huevo",
    "VEGETALES SALTEADOS":"Lechuga",
    "POLLO A LA PARRILLA":"Ensalada Cesar",
    "CERDO A LA PARRILLA":"Ensalada Capressa",
    "CAMARONES":"Nuggets",
    "CARNE A LA PARRILLA":"Papas fritas pequeñas",
    "TOFU":"Papas fritas medianas",
    "BROCOLI":"Cebolla caramelizada",
    "COLIFLOR":"Queso azul",
    "ZANAHORIA":"Lechuga",
    "PIMENTON":"Tomate",
    "AJI PICANTE":"Pepinillo",
    "CEBOLLA":"Champiñón",
    "HONGOS":"Salsa especial",
    "AGRIDULCE PICANTE":"Ketchup",
    "CURRY PICANTE":"Mayonesa",
    "KUNG PAO ":"Mostaza",
    "WASABI PICANTE":"Picante",
    "HONG KONG (CIRUELA)":"Mostaza miel",
    "TERIYAKI ":"Tartara",
    "BEIJING (OSTRAS)":"Pimentón",
    "MANI":"Cebolla morada",
    "CILANTRO":"Cilantro",
    "AJO FRITO":"Chuleta",
    "CEBOLLA FRITA":"Queso americano",
    "SEMILLAS DE SESAMO":"Queso paisa",
    "MANGO THAI":"Mani",
    "LOMITO DULCE Y PICANTE":"Barquilla de helado",
    "COCA COLA LATA":"Refresco tradicional",
    "CHINOTO DE LATA":"Refresco limón",
    "FRECOLITA DE LATA":"Refresco naranja",
    "UVA DE LATA":"Jugo de naranja",
    "AGUA MINERAL PEQ.":"Jugo de patilla",
    "AGUA MINERAL GDE.":"Agua",
    "AGUA SABORIZADA":"Jugo de limón",
    "TE":"Té de durazno",
    "CERVEZA":"Cerveza",
    "JUGO":"Té de limón",
    ".COBRO VEGATALES":"Empaque para llevar",
    ". COBRO TOPPINGS":"Servilletas adicionales",
    "PROTEINAS MIXTAS":"Hamburguesa Mixta",
    "POSTRE":"Sundae",
    "COMIDA OSCAR":"Promoción sabados",
    "COMIDA ARMANDO":"Promoción jueves",
    "COMIDA CARLOS":"Comida con descuento empleados",
    "COMIDA VINICIO":"Combo para niños",
    "POWERADE":"Bebida energetica",
    "COMIDA DESCUENTO EMPLEADO":"Combo para estudiantes",
    "Comida Desc Caja":"Promoción de cumpleaños",
    "MALTA":"Malta",
    "REF. 600 ML":"Vino",
    "BURN":"Promoción especial dia de las madres",
    "GALLETAS FORTUNA":"Juguete especial",
    "BEBIDA PEQ":"Salsa BBQ"
}


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
  x['subtotal'] = x['subtotal'] * multiplicador
  x['tax'] = x['tax'] * multiplicador
  x['total'] = x['total'] * multiplicador 
  db.invoices.insert(x)
}


var cursor = db.products.find({"local":localo});
while (cursor.hasNext()) {
  var x = cursor.next();
  x['_id'] = x['_id'].replace(localo, locald);
  x['local'] = locald;
  db.products.insert(x)
}

if (localo == "Froyo01") {
  for (var props in mapaPFroyo){
    db.products.update( {local:locald,description:props},{$set:{description:mapaPFroyo[props]}})
  }
}else{
  for (var props in mapaPWok){
    db.products.update( {local:locald,description:props},{$set:{description:mapaPWok[props]}})
  }
}


var cursor = db.log_invoices.find({"local":localo});
while (cursor.hasNext()) {
  var x = cursor.next();
  x['_id'] = x['_id'].replace(localo, locald);
  x['local'] = locald;
  for (var i = 0; i < 24; i++) {
    if (!!x[i]){
      x[i]['ammount'] = x[i]['ammount'] * multiplicador  
    }
  }
  x['total']['ammount'] = x['total']['ammount'] * multiplicador 
  db.log_invoices.insert(x)
}


var cursor = db.log_products.find({"local":localo});
while (cursor.hasNext()) {
  var x = cursor.next();
  x['_id'] = x['_id'].replace(localo, locald);
  x['product'] = x['product'].replace(localo, locald);
  x['local'] = locald;
  for (var i = 0; i < 24; i++) {
    if (!!x[i]){
      x[i]['ammount'] = x[i]['ammount'] * multiplicador  
    }
  }
  x['total']['ammount'] = x['total']['ammount'] * multiplicador 
  db.log_products.insert(x)
}


var cursor = db.log_user_locals.find({"local":localo});
while (cursor.hasNext()) {
  var x = cursor.next();
  x['_id'] = x['_id'].replace(localo, locald);
  x['local'] = locald;
  var arrayLength = x['invoices'].length;
  for (var i = 0; i < arrayLength; i++) {
    x['invoices'][i] = x['invoices'][i].replace(localo, locald);
  }
  x['totalAmmount'] = x['totalAmmount'] * multiplicador
  db.log_user_locals.insert(x)
}

