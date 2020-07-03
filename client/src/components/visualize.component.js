import React, { Component } from 'react';
import { fetchData, fetchHistoricData } from '../api';
import { Line } from 'react-chartjs-2';
import '../CSS/visualize.css';

const VisualizeComponent = props => {
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

const StatsComponent = props => {
    if(props.entries[0] != null){
        //console.log(props.entries);
        var new_active = props['entries'][0]['active_cases'] - props['entries'][1]['active_cases'];
        var new_active_text = 'Active cases: ';
        var new_active_arrow_img = 'RedArrow.svg';
        if(new_active<0){
            new_active = Math.abs(new_active);
            new_active_arrow_img = 'GreenArrow.svg';
        }

        var new_cured_text = 'Cured cases: ';
        var new_cured = props['entries'][0]['cured'] - props['entries'][1]['cured'];

        var new_death_text = 'Death cases: ';
        var new_death = props['entries'][0]['deaths'] - props['entries'][1]['deaths'];

        var new_total_text = 'Total cases: ';
        var new_total = props['entries'][0]['total_cases'] - props['entries'][1]['total_cases'];

        return(
            <div className="stat">
                <div><b>({props['entries'][0]['current_date']})</b></div>
                <div className="totalStatDiv">
                    <div className="totalStat">
                        {new_total_text}
                        {props['entries'][0]['total_cases']}
                    </div>
                    <div className="totalStat">
                        <span>In 24 hours:</span>
                        {" "+new_total+" "}
                        <img src={ require('../images/RedArrow.svg') } height="15%" width="10%" alt="arrow"/>
                    </div>
                </div>

                <div className="activeStatDiv">
                    <div className="activeStat">
                        {new_active_text}
                        {props['entries'][0]['active_cases']}
                    </div>
                    <div className="activeStat">
                        <span>In 24 hours:</span>
                        {" "+new_active+" "}
                        <img src={ require('../images/'+new_active_arrow_img) } height="15%" width="10%" alt="arrow"/>
                    </div>
                </div>

                <div className="curedStatDiv">
                    <div className="curedStat">
                        {new_cured_text}
                        {props['entries'][0]['cured']}
                    </div>
                    <div className="curedStat">
                        <span>In 24 hours:</span>
                        {" "+new_cured+" "}
                        <img src={ require('../images/GreenArrowUp.svg') } height="15%" width="10%" alt="arrow"/>
                    </div>
                </div>

                <div className="deathStatDiv">
                    <div className="deathStat">
                        {new_death_text}
                        {props['entries'][0]['deaths']}
                    </div>
                    <div className="deathStat">
                        <span>In 24 hours:</span>
                        {" "+new_death+" "}
                        <img src={ require('../images/RedArrow.svg') } height="15%" width="10%" alt="arrow"/>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return('');
    }
}

export default class CityList extends Component{
    constructor(props) {
        super(props);
        this.state = {entries: [], cities: [], selected_city: 'Maharashtra', date: ''};
        this.formRef = React.createRef();
        this.update_details = this.update_details.bind(this);
    }

    async updateData(){
        //console.log('Fetching..');
        const response1 = await fetchData();
        const response2 = await fetchHistoricData(this.state.selected_city);
        if (response1.data.length > 0) {
            //console.log(response.data);
            this.setState({ 
                cities: response1.data.map(covidinfo => covidinfo),
            });
       }

        if (response2.data.length > 0) {
             this.setState({ 
                entries: response2.data.map(covidinfo => covidinfo),
             });
        }

        this.setState({date: this.state.entries['0'].current_date});
    }

    componentDidMount(){
        this.updateData();
    }

    covidCityInfo(){
        var city_entries = this.state.entries;
        return city_entries.slice(0, 7).map(currentcity => {
            return <VisualizeComponent cityinfo={currentcity}/>
        })
    }

    chart(){
        //console.log(this.state.entries);
        var city_entries_rev = this.state.entries;
        city_entries_rev.reverse();
        const historicData = {
            responsive: true,
            maintainAspectRatio: false,
            labels: city_entries_rev.map(covidinfo => covidinfo.current_date),
            datasets: [
                {
                    label: 'Total cases',
                    data: this.state.entries.map(covidinfo => covidinfo.total_cases),
                    backgroundColor: "rgba(150,150,150,0.5)",
                    borderColor: "rgba(150,150,150,0.8)",
                    fill: true,
                },
                {
                    label: 'Deaths',
                    data: this.state.entries.map(covidinfo => covidinfo.deaths),
                    backgroundColor: "rgba(255,0,0,0.6)",
                    borderColor: "rgba(255,0,0,0.8)",
                    fill: true,
                },
                {
                    label: 'Active cases',
                    data: this.state.entries.map(covidinfo => covidinfo.active_cases),
                    backgroundColor: "rgba(255,255,0,0.7)",
                    borderColor: "rgba(255,255,0,0.8)",
                    fill: true,
                },
                {
                    label: 'Cured cases',
                    data: this.state.entries.map(covidinfo => covidinfo.cured),
                    backgroundColor: "rgba(0,255,0,0.8)",
                    borderColor: "rgba(0,255,0,0.8)",
                    fill: true,
                },
            ]
        }
        return <Line 
                data={historicData} 
                options={{
                    title:{
                        display:true,
                        text:'Covid-19 cases',
                        fontSize: 20
                    },
                    legend:{
                        display:true,
                        position:'top'
                    }
                }}
            />
    }

    city_options(){
        return this.state.cities.map(covidinfo => {
            return <option value={covidinfo.city}>{covidinfo.city}</option>
        })
    }

    update_details(event){
        var selected_val = event.target.value;
        if(selected_val !== this.state.selected_city){
            this.setState({selected_city: selected_val});
            this.updateData();
            /*
            console.log(selected_val);
            this.formRef.current.action = "/visualize?"+selected_val;
            console.log(this.formRef.current.action);
            this.forceUpdate();
            this.formRef.current.submit();
            */
        }
    }

    state_stats(){
        return <StatsComponent entries={this.state.entries.reverse()}/>
    }

    render(){
        return(
            <div className="scrollmenu_wrapper">
                <div>
                    <form action="#" method='GET' ref={this.formRef}>
                        <div className="selectDiv">
                            <b>Select the state: </b>
                            <select onChange={this.update_details} className="selectClass">
                                { this.city_options() }
                            </select>
                        </div>
                    </form>
                </div>

                <div className="wrapper_visual">
                    <table className="table_visual">
                        <tr>
                            <td className="Chart sibling" id="chart_city_info">
                                <div>{this.chart()}</div>
                            </td>
        <td className="selectedCityInfo sibling"><b>{this.state.selected_city}</b>{this.state_stats()}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" width="100%">
                                <div className="table-responsive" id="visualizetable">
                                    <table className="table table-striped table-hover">
                                        <thead className="thead">
                                            <tr>
                                                <td>State</td>
                                                <td>Active cases</td>
                                                <td>Cured</td>
                                                <td>Deaths</td>
                                                <td>Total cases</td>
                                                <td>Updated on</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.covidCityInfo()}
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}