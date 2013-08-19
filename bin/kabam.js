#!/usr/bin/env node
var program = require('commander'),
  pkg = require('../package.json'),
  cwd = process.cwd(),
  fs = require('fs'),
  os = require('os'),
  async = require('async'),
  ncp = require('ncp').ncp,
  colors = require('colors');


program
  .version(pkg.version)
  .usage('[command] <parameters ...>')
  .option('-v, --verbose', ' be verbose')
;

program
  .command('create')
  .description('Create basic application structure in current directory')
  .action(function () {
    console.log('Creating you Kabam project!'.green);
    console.log('Enter values required and press ' + 'Enter'.green);
    //checking if directory is empty
    var dir = fs.readdirSync(process.cwd());
    if (dir.length === 0) {
      async.series({
        'projectName': function (cb) {
          program.prompt('What is the name of your project? Default is "my-kabam-project": ', function (name) {
            cb(null, name);
          });
        },
        'hostUrl': function (cb) {
          program.prompt('What is the hostname of your server? Default is "http://' + os.hostname() + '/": ', function (name) {
            cb(null, name);
          });
        },
        'mongoUrl': function (cb) {
          program.prompt('What is the mongoUrl of your project? Default is "mongo://localhost/kabam_dev" or it can be extracted from environment values: ', function (name) {
            cb(null, name);
          });
        },
        'redisUrl': function (cb) {
          program.prompt('What is the redis url of your project? Default is "redis://localhost:6379" or it can be extracted from environment values: ', function (name) {
            cb(null, name);
          });
        },
        'gitHubName': function (cb) {
          program.prompt('What is your github username?: ', function (name) {
            cb(null, name);
          });
        }
      }, function (err, input) {
                async.parallel({
          'createConfigJson':function(cb){
            var config = {
              'emailConfig': 'myemail@gmail.com:myLoooongPassword',
              "passport": {
              "GITHUB_CLIENT_ID": "--insert-github-client-id-here--",
                "GITHUB_CLIENT_SECRET": "--insert-github-client-secret-here--",
                "TWITTER_CONSUMER_KEY": "--insert-twitter-consumer-key-here--",
                "TWITTER_CONSUMER_SECRET": "--insert-twitter-consumer-secret-here--",
                "FACEBOOK_APP_ID": "--insert-facebook-app-id-here--",
                "FACEBOOK_APP_SECRET": "--insert-facebook-app-secret-here--"
            },
              "spine": {
              'domains': ['urgentTasks']
            }};

            if(input.hostUrl){
              config.hostUrl = input.hostUrl;
            } else {
              config.hostUrl = os.hostname();
            }

            if(input.mongoUrl){
              config.mongoUrl = input.mongoUrl;
            } else {
              config.mongoUrl = 'mongo://localhost/kabam_dev';
            }

            if(input.redisUrl){
              config.redisUrl = input.redisUrl;
            } else {
              config.redisUrl = 'redis://localhost:6379';
            }

            fs.writeFile(process.cwd()+'/config.json',JSON.stringify(config, null, 2),cb);
          },
          'createPackagejson':function(cb){
            var
              projectName = (input.projectName)?(input.projectName):'my-kabam-project',
              gitHubName = (input.gitHubName)?(input.gitHubName):'johgdoe',
              packageJson = {
              "name": projectName,
              "version": "0.0.1",
              "description": "My Kabam project",
              "main": "index.js",
              "engines": {
                "node": "0.10.x",
                "npm": "1.3.x"
              },
              "scripts": {
                "start": "node index.js"
              },
              "bin":{
                "kabam":"bin/kabam.js"
              },
              "repository": {
                "type": "git",
                "url": "git://github.com/"+gitHubName+"/"+projectName+".git"
              },
              "keywords": [],
              "author": (input.gitHubName)?(input.gitHubName):'johgdoe',
              "license": "MIT",
              "contributors": [
                {
                  "name": gitHubName,
                  "url": "https://github.com/"+gitHubName
                }
              ],
              "dependencies": {
                "async": "*",
                "commander":"1.3.2",
                "ncp":"*",
                "colors":"*",
                "kabam": "git+https://github.com/mykabam/kabam.git"
              },
              "devDependencies": {},
              "bugs": {
                "url": "https://github.com/"+gitHubName+"/"+projectName+"/issues"
              }
            };
            fs.writeFile(process.cwd()+'/package.json',JSON.stringify(packageJson, null, 2),cb);
          },
          'moveFiles':function(cb){
            ncp('../skel',process.cwd(),{'clobber':true},cb);
          }
        },function(err,actionsDone){
          if(err) throw err;
          console.log('Project created!'.green);
          process.exit(0);
        });


      });
    } else {
      console.error('This directory is not empty! Unable to process'.red);
      process.exit(1);
    }
  });

program
  .command('publishAssets')
  .description('Publish modules templates, css, javascripts and images')
  .action(function () {
    console.log('Publishing...');
    process.exit(0);
  });


program
  .command('procfile')
  .description('create Procfile for Foreman or nodeForeman')
  .action(function () {
    if (packageJson.scripts && packageJson.scripts.start) {
      var startCommand = packageJson.scripts.start;
//      console.log('We found command to start this application  - '+startCommand);

      var procFileText = 'web: ' + startCommand + '\n';
      fs.exists(cwd + '/Procfile', function (isExists) {
        if (isExists) {
          console.error('We already have Procfile created!'.red);
          process.exit(1);
        } else {
//          console.log('Trying to write');
//          console.log(procFileText);
//          console.log(cwd+'/Procfile');

          fs.writeFile(cwd + '/Procfile', procFileText, function (err) {
            if (err) {
              throw err;
            }
            console.log('Procfile created successfully! You can edit it if you want.'.green);
            process.exit(0);
          });
        }
      });

    } else {
      console.error('We need this project to be run by `npm start`'.red);
      process.exit(1);
    }
  });

program.on('--help', function () {
  console.log(' Examples');
  console.log((' $ kabam create').bold);
  console.log((' $ kabam procfile').bold);
});

console.log(('Kabam-Cli version ' + pkg.version).bold.yellow.redBG);
program.parse(process.argv);

if (process.argv.length === 2) {
  program.outputHelp();
}

