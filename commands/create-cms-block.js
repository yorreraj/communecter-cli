const syncExec = require('sync-exec');
const config = require("../config.json");
const checkConfig = require("../utils/check-config");
const inquirer = require('inquirer');
const fs = require("fs");
const chalk = require('chalk');
const MongoClient = require('mongodb').MongoClient;

module.exports = function(program){
    program
    .command('create-cms-block')
    .description('Effacer tous les caches des assets')
    .action(() => {
        if(checkConfig()){
            if(!config.mongoUrl || config.mongoUrl == ""){
                console.log(chalk.red("Configurer d'abord l'url de connexion à mongodb."))
            }else{
                inquirer.prompt([
                    {
                        type:"list",
                        name:"type",
                        choices: [
                            {
                                name:"Annuaire",
                                value:"annuaire"
                            },
                            {
                                name:"App",
                                value:"app"
                            },
                            {
                                name:"Article",
                                value:"article"
                            },
                            {
                                name:"Communauté",
                                value:"community"
                            },
                            {
                                name:"Contact",
                                value:"contact"
                            },
                            {
                                name:"Document",
                                value:"docs"
                            },
                            {
                                name:"Element",
                                value:"elements"
                            },
                            {
                                name:"Evenement",
                                value:"events"
                            },
                            {
                                name:"FAQ",
                                value:"faq"
                            },
                            {
                                name:"Bas de page",
                                value:"footer"
                            },
                            {
                                name:"Galerie",
                                value:"Gallery"
                            },
                            {
                                name:"Graph",
                                value:"graph"
                            },
                            {
                                name:"En tête",
                                value:"header"
                            },
                            {
                                name:"Carte",
                                value:"map"
                            },
                            {
                                name:"Menu",
                                value:"menu"
                            },
                            {
                                name:"Divers",
                                value:"misc"
                            },
                            {
                                name:"Multimedia",
                                value:"multimedia"
                            },
                            {
                                name:"Nouvelles",
                                value:"news"
                            },
                            {
                                name:"Photo",
                                value:"photo"
                            },
                            {
                                name:"Projet",
                                value:"projects"
                            },
                            {
                                name:"Recherche",
                                value:"search"
                            },
                            {
                                name:"Sociale",
                                value:"social"
                            },
                            {
                                name:"Tags",
                                value:"tags"
                            },
                            {
                                name:"Text",
                                value:"text"
                            },
                            {
                                name:"Text et image",
                                value:"textImg"
                            },
                            {
                                name:"Video",
                                value:"video"
                            }
                        ],
                        message:"Choisir le type du bloc:"
                    },
                    {
                        type:"input",
                        name:"fileName",
                        message:"Entrer le nom du fichier du bloc: ",
                        validate: function(input, answer){
                            if(!/^[a-z][a-z0-9]+/i.test(input))
                                return "Entrer un nom de fichier valide.";
                            else if(fs.existsSync(`${config.projectpath}/modules/costum/views/tpls/blockCms/${answer.type}/${input}.php`)){
                                return "Le nom de fichier existe déjà."
                            }
                            return true;
                        }
                    },
                    {
                        type:"input",
                        name:"name",
                        message:"Entrer le nom du bloc: ",
                        validate: function(input){
                            if(!/\w+/.test(input))
                                return "Vous dévez entrer un nom pour le bloc.";
                            return true;
                        }
                    },
                    {
                        type:"input",
                        name:"description",
                        message: "Entrer la description du bloc: "
                    },
                    {
                        type:"list",
                        choices:[
                            {
                                name:"Oui",
                                value:true
                            },
                            {
                                name:"Non",
                                value:false
                            }
                        ],
                        name:"developper",
                        message: "Est-ce-que ce bloc est pour le developpeur seulement?",
                        default:false
                    }
                ]).then((answer) => {
                    const blockData = {
                        "type" : "blockCms",
                        "path" : `tpls.blockCms.${answer.type}.${answer.fileName}`,
                        "name" : answer.name,
                        "developpeur" : answer.developper,
                        "img" : "",
                        "description" : answer.description,
                        "parent" : ""
                    }
                    const blockPath = `${config.projectpath}/modules/costum/views/tpls/blockCms/${answer.type}/${answer.fileName}.php`,
                          blockDataPath = `${config.projectpath}/modules/costum/data/blockCms/${answer.fileName}.json`
    
                    const {stdout, stderr} = syncExec(`touch ${blockPath}`)
                    
                    if(!stderr){
                        fs.writeFile(blockDataPath, JSON.stringify(blockData), function(){
                            const client = new MongoClient(config.mongoUrl);
                            // Use connect method to connect to the server
                            client.connect(function(err) {
                                if(!err){
                                    const db = client.db("pixelhumain");
                                    const collection = db.collection('cms');
                                    collection.insertOne(blockData, function(){
                                        client.close();
                                    })
                                }
                            });
                        })
                    }else{
                        console.log(stderr)
                    }
                })
            }
        }
    });
}