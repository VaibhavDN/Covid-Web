import React, { Component } from 'react';
//import axios from 'axios';
import { fetchData, fetchTotalData } from '../api';
import '../CSS/citylist.css';

const CityComponent = props => {
    //console.log(props['cityinfo']);
    return(
        <tr>
            <td>{props['cityinfo']['city']}</td>
            <td>{props['cityinfo']['active_cases']}</td>
            <td>{props['cityinfo']['cured']}</td>
            <td>{props['cityinfo']['deaths']}</td>
            <td>{props['cityinfo']['total_cases']}</td>
            <td>{props['cityinfo']['current_date']}</td>
        </tr>
    )
}

export default class CityList extends Component{
    constructor(props) {
        super(props);
        this.state = {cities: [], countryWide: []};
    }

    async componentDidMount(){
        const response1 = await fetchData();
        if (response1.data.length > 0) {
            this.setState({ 
                cities: response1.data.map(covidinfo => covidinfo),
            });
        }

        const response2 = await fetchTotalData();
        if (response2.data.length > 0) {
            this.setState({ 
                countryWide: response2.data.map(covidinfo => covidinfo),
            });
        }
        // axios.get('http://localhost:4000/covid')
        //     .then(response => {
        //         if (response.data.length > 0) {
        //             console.log(response.data);
        //             this.setState({ 
        //                 cities: response.data.map(covidinfo => covidinfo),
        //             });
        //         }
        //     });
    }

    covidInfo(){
        return this.state.cities.map(currentcity => {
            //console.log(currentcity);
            return <CityComponent cityinfo={currentcity}/>
        })
    }

    countryCovidInfo(){
        return this.state.countryWide.map(info => {
            return <div className="row">
                <div className="col-sm-* activeContryCovidInfo"><b>Total active cases: {info.active_cases}</b></div>
                <div className="col-sm-* curedContryCovidInfo"><b>Total cured: {info.cured}</b></div>
                <div className="col-sm-* deathsContryCovidInfo"><b>Total deaths: {info.deaths}</b></div>
                <div className="col-sm-* totalContryCovidInfo"><b>Total covid-19 cases: {info.total_cases}</b></div>
            </div>
        });
    }

    render(){
        return(
            <div>
                <div className="countryCovidInfoWrapper">
                    {this.countryCovidInfo()}
                </div>
                <div className="table-responsive" id="citylisttable">
                    <table className="table table-striped table-hover">
                        <thead className="thead">
                            <tr>
                                <th>State</th>
                                <th>Active cases</th>
                                <th>Cured</th>
                                <th>Deaths</th>
                                <th>Total cases</th>
                                <th>Updated on</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.covidInfo()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}