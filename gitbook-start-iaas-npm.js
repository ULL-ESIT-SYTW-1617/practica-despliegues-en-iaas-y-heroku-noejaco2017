var fs = require('fs-extra');
var path = require('path');
var child = require("child_process");
var fs_extended = require('fs-extended');
var prompt = require("prompt");
var heroku = require('heroku-client');
var SSH = require('simple-ssh');


function initialize(directorio) {


    console.log("\nGenerando tarea gulp!!!!!")

    var contenido = `gulp.task("push-iaas" ,function(){
            var heroku = require("plugin-ssh-npm-noejaco17");
            heroku.deployiaas();
     });
     gulp.task("push-heroku" ,function(){
             var heroku = require("plugin-ssh-npm-noejaco17");
             heroku.deployheroku();
      });`;

      fs.writeFileSync(path.resolve(process.cwd()+"/"+directorio,'gulpfile.js'), contenido,  {'flag':'a'},  function(err) {
       if (err) {
       console.error(err);
       }
   });
    //  fs.copyFile(path.join(__dirname,'..','book.json'),"./" + directorio + "/book.json",function(err){
    //       if(err)
    //       console.log(err);
    //     });
    //Copia el server.js
    // fs_extended.copyFile(path.join(process.cwd(),'node_modules','gitbook-start-heroku-localstrategy-noejaco17','app.js'),path.join(process.cwd()+"/"+directorio, 'app.js'),function(err){
    //     if(err)
    //     console.log(err);
    //  });
    //
    //   fs.copyDir(path.join(process.cwd(),'node_modules','gitbook-start-heroku-localstrategy-noejaco17','views'),path.join(process.cwd()+"/"+directorio, 'views'),function(err){
    //     if(err)
    //     console.log(err);
    //  });
    //  fs.copyDir(path.join(process.cwd(),'node_modules','gitbook-start-heroku-localstrategy-noejaco17','public'),path.join(process.cwd()+"/"+directorio, 'public'),function(err){
    //    if(err)
    //    console.log(err);
    // });

    //  fs.copyDir(path.join(process.cwd(),'node_modules','gitbook-start-heroku-token-oauth-noejaco17','public'),path.join(process.cwd(), 'public'),function(err){
    //     if(err)
    //     console.log(err);
    //  });

    //añadimos la tarea
    // fs.writeFileSync(path.resolve(process.cwd()+"/"+directorio,'gulpfile.js'), contenido,  {'flag':'a'},  function(err) {
    //     if (err) {
    //         return console.error(err);
    //     }
    //   });
    //     fs.writeFileSync(path.resolve(process.cwd()+"/"+directorio,'gulpfile.js'), contenido1,  {'flag':'a'},  function(err) {
    //         if (err) {
    //             return console.error(err);
    //         }
    //
    // });
    // fs_extended.copyFile(path.join(process.cwd(),'node_modules','gitbook-start-heroku-localstrategy-noejaco17','Procfile'),path.join(process.cwd()+"/"+directorio, 'Procfile'),function(err){
    //     if(err)
    //     console.log(err);
    //  });

    datos_usuario_token(directorio);

};


//

//
function deployiaas(){

console.log("Llego a deployiaas");
var config = require(path.resolve(process.cwd(),".iaas-heroku.json"));

var host = config.IAAS.host ;
var user = config.IAAS.user ;
var pass = config.IAAS.pass ;
var path = config.IAAS.path ;
// var id_client= apli.Config.id_client;
// var secret_client= apli.Config.secret_client;
// var organizacion = apli.Config.organizacion;
console.log("Mostramos numero de host :"+host);


var ssh = new SSH({
host: host,
user: user,
pass: pass
});

ssh.exec(path, {
out: function(stdout) {
    console.log(stdout);
}
}).start();

/*** Using the `args` options instead ***/
ssh.exec('echo', {
args: ['$PATH'],
out: function(stdout) {
    console.log(stdout);
}
}).start();
}

function deployheroku() {



    console.log("Comenzando el deploy en HEROKU");



    child.exec('git add --all ; git commit -m "first push heroku"; git push heroku master;', function(error, stdout, stderr){
        if(error)
          console.log(error)
        console.log(stderr);
        console.log(stdout);
      });



};


function datos_usuario_token(directorio){
     //pedimos por pantall el nombre de la app y el token
      var git = require('simple-git')(path.join(process.cwd()));
      //console.log("hfhfhfhfhf   " + path.join(process.cwd()));
       prompt.get([{
              name: 'host',
              required: true
            },{
              name: 'user',
              required: true
            },{
                name: 'pass',
                require: true
            },{
                name: 'path',
                require: true
            },{
                name: 'token_heroku',
                require: true
            }], function (err, result) {
            //
            // Log the results.
            //
            console.log('  host: ' + result.host);
            console.log('  user: ' + result.user);
            console.log('  pass: ' + result.pass);
            console.log('  pass: ' + result.token_heroku);


            //variable con el contenido de config.json
            var iaas_config = '{\n "IAAS":{\n\t"host": "'+result.host+'",\n\t "user": "'+result.user+'",\n\t"pass":"'+result.pass+'",\n\t "token_heroku": "'+result.token_heroku+',\n\t "token_heroku": "'+result.path+'"}\n}';

            fs.writeFileSync(path.join(process.cwd()+"/"+directorio,".iaas-heroku.json"),iaas_config);

            //var token = require(path.join(process.cwd(), ".token_heroku","token.json"));

            //var her = new heroku({ token : iaas_config.IAAS.token_heroku });



          });

}

module.exports = {
  initialize,
  deployheroku,
  deployiaas
}
