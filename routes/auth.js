// CONNEXION
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var mail= post.mail;
      var pass= post.password;
     
      var sql="SELECT userID, mail, name, admin FROM `users` WHERE `mail`='"+mail+"' and password = '"+pass+"'";                           
      database.query(sql, function(err, results){      
         if(err){
            message = "L'identifiant ou le mot de passe est incorrect.";
            res.render('connect.ejs',{message: message});
            console.log(err);
         }
         else{
            
            if(results[0] == undefined) {
               message = "L'identifiant ou le mot de passe est incorrect.";
               res.render('connect.ejs',{message: message});
               console.log(err);
            } else {

               sess.userId = results[0].userID;
               sess.admin = results[0].admin;
               sess.user = results[0];
               sess.minprice = 0;
               console.log(results[0].userID);
               res.redirect('/profile');
            }


            
         }
                 
      });
   } else {
      message = "Une erreur est survenue.";
      res.render('connect.ejs',{message: message});
   }
           
};

// PAGE EMPLOYE
exports.dashboard = function(req, res, next){
           
   var user =  req.session.user,
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/connect");
      return;
   }

   var sql="SELECT admin FROM `users` WHERE `id`='"+userId+"'";

   database.query(sql, function(err, results){
      if(results.length){
         // TODO: Check si admin est toujours bon (1 ou 0) pour éviter les "hacks"
         res.render('dashboard.ejs', {user:user});    
      }
   });       
};
// DECONNEXION
exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};
// PAGE CLIENT + PANIER
exports.profile = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   if(req.session.admin == 1) {
      var sql="SELECT * FROM `commands`"; 
      var commands;  

      database.query(sql, function(err, result){  
         console.log("RESULT="+result);
         commands = result; 

         sql="SELECT * FROM `commands_contents`"; 
         var contentsdata;     
         database.query(sql, function(err, result){  

            contentsdata = result;


            sql="SELECT * FROM `flowers`";  
            var flowers;
            database.query(sql, function(err, result){
               flowers = result;

               sql="SELECT * FROM `premade`";  
               database.query(sql, function(err, result){
                  res.render('admin.ejs',{commands:commands, contents:contentsdata, flowers:flowers, premades:result});
               });

            });


           
         });

      });
   } else {
      var sql="SELECT * FROM `users` WHERE `userID`='"+userId+"'"; 
      var profiledata;         
      database.query(sql, function(err, result){  
         console.log("RESULT="+result);
         profiledata = result[0]; 

         console.log("PROFILE DATA="+profiledata);

         sql="SELECT * FROM `cart` WHERE `user`='"+userId+"'";     
         var cartdata; 
         database.query(sql, function(err, result){  
            cartdata = result;

            sql="SELECT * FROM `flowers`";  
            var flowers;
            database.query(sql, function(err, result){
               flowers = result;

               sql="SELECT * FROM `premade`";  
               var premades;
               database.query(sql, function(err, result){
                  premades = result;

                  sql="SELECT * FROM `commands` WHERE `user`='"+userId+"'"; 
                  database.query(sql, function(err, result){
                     res.render('profile.ejs',{profile:profiledata, cart:cartdata, flowers:flowers, premades:premades, commands:result});
                  });
                 
               });

            });

            
         });

      });
   }

   
};

// PAGE COMMANDE
exports.viewcommand = function(req, res){
}
