var fs = require('fs');
var path = require('path');
var child = require("child_process");
var fs_extended = require('fs-extended');
var prompt = require("prompt");
var heroku = require('heroku-client');


function initialize(directorio) {


    console.log("\nGenerando tarea gulp!!!!!")

    var contenido = `gulp.task("push-iaas" ,function(){
            var heroku = require("gitbook-start-iaas-npm-noejaco17");
            heroku.deploy();
     });`;
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
    fs.writeFileSync(path.resolve(process.cwd()+"/"+directorio,'gulpfile.js'), contenido,  {'flag':'a'},  function(err) {
        if (err) {
            return console.error(err);
        }


    });
    // fs_extended.copyFile(path.join(process.cwd(),'node_modules','gitbook-start-heroku-localstrategy-noejaco17','Procfile'),path.join(process.cwd()+"/"+directorio, 'Procfile'),function(err){
    //     if(err)
    //     console.log(err);
    //  });

    datos_usuario_token(directorio);

};


//

//
function deploy() {



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
            }], function (err, result) {
            //
            // Log the results.
            //
            console.log('  host: ' + result.host);
            console.log('  user: ' + result.user);
            console.log('  pass: ' + result.pass);
            console.log('  fichero de config de dropbox: ' + result.fich_dropbox);
            // console.log('  secret_client: ' + result.secret_client);
            // console.log('  organizacion ' + result.organizacion);

            //variable con el contenido de config.json
            var iaas_config = '{\n "IAAS":{\n\t"host": "'+result.host+'",\n\t "user": "'+result.user+'",\n\t"pass":"'+result.pass+'"\n\t}\n}';

            fs.writeFileSync(path.join(process.cwd()+"/"+directorio,".iaas.json"),iaas_config);

            var token = require(path.join(process.cwd(), ".token_heroku","token.json"));

            var her = new heroku({ token : token.Heroku.token_app });



          });

}

module.exports = {
  initialize,
  deploy
}
