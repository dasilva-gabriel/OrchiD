const flowerType = {
	FLOWER: "flowers",
	PREMADE: "premade",
}

// BOUQUETS PREFAITS
exports.premade = function(req, res){

   var sess = req.session; 
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `premade`";                           
      database.query(sql, function(err, results){      
         if(err){
            throw err;
         }
         else{
            
            if(req.method == "POST"){
               var post  = req.body;
               var price= post.minprice;

               console.log("MIN PRICE CHANGED INTO " + price);
               sess.minprice = price;
         
              
            } else {
               console.log("MIN PRICE FIND " + sess.minprice);
               res.render('premade.ejs',{flowers: results, range: sess.minprice});
            }
            
         }
                 
      });
           
};


// LES FLEURS
exports.custom = function(req, res){

   //var sess = req.session; 
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `flowers`";                           
      database.query(sql, function(err, results){      
         if(err){
            throw err;
         }
         else{
            
            res.render('custom.ejs', {flowers: results});
         }
                 
      });
           
};

// AJouter un bouquet au panier
exports.addpremade = function(req, res){

   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var postID= post.id;

      var sql="INSERT INTO cart VALUES ("+sess.userId+", '"+flowerType.PREMADE+"', "+postID+")";  
      database.query(sql);  
   }

   console.log("Bravo tu as ajouté "+getNameByID(postID, flowerType.PREMADE));
           
};

// AJouter une fleur au panier
exports.addflower = function(req, res){

   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var postID= post.id;

      var sql="INSERT INTO cart VALUES ("+sess.userId+", '"+flowerType.FLOWER+"', "+postID+")";  
      database.query(sql);  
   }
   console.log("Bravo tu as ajouté "+getNameByID(postID, flowerType.FLOWER));
           
};

// Retirer un bouquet au panier
exports.removepremade = function(req, res){

   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var postID= post.id;

      var sql="DELETE FROM cart WHERE type = '"+flowerType.PREMADE+"' AND id = "+postID+" AND user = "+sess.userId+" LIMIT 1;";  
      console.log("DEL=>"+sql);
      database.query(sql);  
   }

   console.log("Bravo tu as retiré "+getNameByID(postID, flowerType.PREMADE));
           
};

// Retirer une fleur du panier
exports.removeflower = function(req, res){

   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var postID= post.id;

      var sql="DELETE FROM cart WHERE type = '"+flowerType.FLOWER+"' AND id = "+postID+" AND user = "+sess.userId+" LIMIT 1;";  
      database.query(sql);  
   }

   console.log("Bravo tu as retiré "+getNameByID(postID, flowerType.PREMADE));
           
};

// Tanforme le panier en commande
exports.toCommand = function(req, res){

   var sess = req.session; 
   var id = makeid(12);
   var sql="SELECT * FROM `cart` WHERE user = "+sess.userId;  
   console.log("BOOM: " + sql);                         
      database.query(sql, function(err, cartcontents){      
         if(err){
            throw err;
         }
         else{
            
            var sql3="INSERT INTO commands(commandID, user) VALUES ('"+id+"', "+sess.userId+")"; 
            console.log("BOOM: " + sql3); 
            database.query(sql3, function(err, results){

               if(err){
                  throw err;
               }
               else{

                  for(i in cartcontents) {
                     if(cartcontents[i].type != undefined) {
                        var sql2="INSERT INTO commands_contents VALUES ('"+id+"', '"+cartcontents[i].type+"', "+cartcontents[i].id+")";  
                        console.log("==> CONTENU: " + sql2);
                        database.query(sql2);
                     } else {
                        console.log("ohoh lu problem");
                        console.log(cartcontents[i]);
                     }
                     
                  }

               }
            }); 
         }
                 
      });
           
};

exports.commandReady = function(req, res){

   if(req.method == "POST"){
      var post  = req.body;
      var postID= post.id;

      var sql="UPDATE commands SET state = 1 WHERE commandID = '"+postID+"';";  
      database.query(sql);  
   }
}



function getNameByID(id, type) {

   var idName = "flowerID";
   if(type = flowerType.PREMADE) {
      idName = "premadeID";
   }

   var sql="SELECT name FROM "+type+" WHERE "+idName+" = "+id;      
   console.log("REQUEST: "+sql);                     
   database.query(sql, function(err, results){      
         if(err){
            throw err;
         }
         else{

            return results[0].name;
         }
                 
      });
}

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}