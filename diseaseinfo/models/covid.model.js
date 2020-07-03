const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cityCovidInfoSchema = new Schema({
    city: {type: String, required: true},
    active_cases: {type: Number, required: true},
    cured: {type: Number, required: true},
    deaths: {type: Number, required: true},
    total_cases: {type: Number, required: true},
    current_date: {type: String, required: true},
    date: {type: Date, required: true},
},{
    timestamps: true,
});

cityCovidInfoSchema.methods.showcity = ()=>{
    const _cityname = this.city;
    console.log(_cityname);
}

const totalCovidInfoSchema = new Schema({
    active_cases: {type: Number, required: true},
    cured: {type: Number, required: true},
    deaths: {type: Number, required: true},
    total_cases: {type: Number, required: true},
    current_date: {type: String, required: true},
},{
    timestamps: true,
});

const CityCovidInfo = mongoose.model('CityCovidInfo', cityCovidInfoSchema);
const TotalCovidInfo = mongoose.model('TotalCovidInfo', totalCovidInfoSchema);

module.exports = {
    CityCovidInfo: CityCovidInfo,
    TotalCovidInfo: TotalCovidInfo
}