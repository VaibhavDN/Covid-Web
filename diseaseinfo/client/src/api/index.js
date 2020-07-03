import axios from 'axios';

export const fetchData = async() => {
    try{
        const response = await axios.get('https://covidinfoweb.herokuapp.com/covid');
        return response;
    }
    catch{
        return [{'city': 'failed'}];
    }
};

export const fetchHistoricData = async(city) => {
    try{
        const response = await axios.get('https://covidinfoweb.herokuapp.com/covid/historic?city='+city);
        return response;
    }
    catch{
        return [{'city': 'failed'}];
    }
}

export const fetchTotalData = async() => {
    try{
        const response = await axios.get('https://covidinfoweb.herokuapp.com/covid/country');
        return response;
    }
    catch{
        return [{'city': 'failed'}];
    }
}