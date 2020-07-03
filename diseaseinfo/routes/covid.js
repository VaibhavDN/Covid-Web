const router = require('express').Router();
let {CityCovidInfo} = require('../models/covid.model');
let {TotalCovidInfo} = require('../models/covid.model');

router.route('/').get((req, res)=>{
    CityCovidInfo.find((err, cityCovidInfo)=>{
        if(err) res.send('Error!');
        console.log(cityCovidInfo);
    })
    .sort({current_date: -1, total_cases: -1})
    .limit(35)
    .then(covidinfo => res.json(covidinfo))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/historic').get((req, res)=>{
    CityCovidInfo.find(({city: req.query.city}), (err, cityCovidInfo)=>{
        if(err) res.send('Error!');
        console.log(cityCovidInfo);
    })
    .sort({current_date: -1})
    .limit(30)
    .then(covidinfo => res.json(covidinfo))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/country').get((req, res)=>{
    TotalCovidInfo.find((err, totalCovidInfo)=>{
        if(err) res.send('Error!');
        console.log(totalCovidInfo);
    })
    .limit(1)
    .sort({current_date: -1})
    .then(covidinfo => res.json(covidinfo))
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;

