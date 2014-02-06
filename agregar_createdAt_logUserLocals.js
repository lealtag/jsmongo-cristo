db = db.getSiblingDB('api_development')
cursor = db.log_user_locals.find();
while ( cursor.hasNext() ) {
   logClient = cursor.next();
   print("\t "+logClient.client)
   if(logClient.invoices.length > 0){
   	cursor2 = db.invoices.aggregate([{$match : {_id:{$in : logClient.invoices}}},{ $group: { _id:0, minDate: { $min: "$date"} } }])
   	minD = cursor2.result[0].minDate  
   	logClient.created_at = minD
   	printjson(logClient)
   	db.log_user_locals.save(logClient)
   }
   else {
      print("CLIENTE LOCO")
   }
	
}
	










