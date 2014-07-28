if (typeof BD != 'undefined' && typeof LOCAL != 'undefined') {
	db = db.getSiblingDB(BD)
	db.invoices.remove({local:LOCAL})
	db.log_invoices.remove({local:LOCAL})
	db.products.remove({local:LOCAL})
	db.log_products.remove({local:LOCAL})
	db.log_user_locals.remove({local:LOCAL})
	db.logs.remove({local:LOCAL})


}
else{

	print("Variable BD or LOCAL missing")



}









