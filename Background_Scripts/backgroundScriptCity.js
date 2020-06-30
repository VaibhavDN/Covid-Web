let CityCovidInfo = require('./models/covid.model');
const mongoose = require('mongoose');
const got = require('got');
const cheerio = require('cheerio');
const { request } = require('express');
require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB connection established!");
});


console.log('backgroundScriptCity: Background script running..');

async function mongooseFetchAndSave(){
    try {
        const response = await got('https://www.mohfw.gov.in/');
        body = response.body;
        //console.log(html);

        //const htmlparser2 = require('htmlparser2');
        //const dom = htmlparser2.parseDOM(body, options);
        const $ = cheerio.load(body);

        selected = []
        $('tr').each(function (i, e) {
            let text = $(this).text();
            while(true){
                text = text.replace('\n', ',');
                text = text.replace('\t', ',');
                text = text.replace(' ', '-');
                text = text.replace(',,', ',');
                
                if(text.search("\n") == -1 && text.search('\t') == -1 && text.search(' ') == -1 && text.search(',,') == -1){
                    break;
                }
            }
            let split = [];
            split = text.split(',');
            text = split.join(' ');
            text = text.trim();
            selected[i] = text;
        });

        let _city;
        let _active_cases;
        let _cured;
        let _deaths;
        let _total_cases;
        let _date;

        console.log(selected);
        for(var itr=1; itr<selected.length; itr++){
            let split = selected[itr].split(' ');
            //console.log(split.length);
            if(split.length == 6){
                _city = split[1];
                _active_cases = split[2];
                _cured = split[3];
                _deaths = split[4];
                _total_cases = split[5];
                _date = new Date();
                _currentdate = _date.getDate() + '-' + _date.getMonth() + '-' + _date.getFullYear();
            
                console.log(_city+ ' ' + _active_cases + ' ' +  _cured + ' ' +  _deaths + ' ' +  _total_cases + ' ' +  _currentdate);
                
                CityCovidInfo.deleteMany({current_date: _currentdate}, (err)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Deleted duplicates!");
                    }
                });

                const newSave = new CityCovidInfo({
                    city: _city,
                    active_cases: _active_cases,
                    cured: _cured,
                    deaths: _deaths,
                    total_cases: _total_cases,
                    current_date: _currentdate,
                    date: new Date()
                });
    
                newSave.save((err, newSave)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log('Saved new values!');
                    /*if(newSave.city == 'West-Bengal'){
                        process.exit(0);
                    }*/
                    //newSave.showcity();
                });
            }
        }
        console.log("Waiting for 20 seconds..");
        setTimeout(()=>{
            process.exit(0);
        }, 20000);
    } catch (error) {
        console.log(error);
    }
}

mongooseFetchAndSave();

/*
module.exports = {
    saveCovidInfo: ()=>{
        return "Working!!";
    }
}
*/