db = db.getSiblingDB('api_production')
cursor = db.log_user_locals.find();
while ( cursor.hasNext() ) {
   logClient = cursor.next();
   if(logClient.created_at == null){
   print("\t "+logClient.client)
   cursor2 = db.invoices.aggregate([{$match : {_id:{$in : logClient.invoices}}},{ $group: { _id:0, minDate: { $min: "$date"} } }])
   minD = cursor2.result[0].minDate  
   logClient.created_at = minD
   printjson(logClient)
   db.log_user_locals.save(logClient)
   }
	
}
	










