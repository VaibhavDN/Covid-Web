import React, { Component } from 'react';
import Lottie from 'react-lottie';
import animationData_stayhome from '../lotties/stay-safe-stay-home.json';
import animationData_coronavirus from '../lotties/corona-virus.json';
import animationData_symptoms from '../lotties/temperature-meter.json';
import '../CSS/covidinfo.css';

export default class CityList extends Component{
    state = {lottieStopped: false, lottiePaused: false};

    render(){
        const options_stayhome = {
            loop: true,
            autoplay: true,
            animationData: animationData_stayhome,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };

        const options_coronavirus = {
            loop: true,
            autoplay: true,
            animationData: animationData_coronavirus,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };
        
        const options_symptoms = {
            loop: true,
            autoplay: true,
            animationData: animationData_symptoms,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };

        return(
            <div className="container-fluid">
                <div className="row mrow">
                    <div id="heading" className="col-sm-12">
                        Covid-Info
                    </div>
                </div>
                <div className="row mrow">
                    <div className="col-sm-8">
                        Coronavirus disease 2019 (COVID-19) is an infectious disease caused by severe
                        acute respiratory syndrome coronavirus 2 (SARS-CoV-2). It was first identified
                        in December 2019 in Wuhan, China.
                    </div>
                    <div id="stayhomeanim" className="col-sm-4">
                        <Lottie 
                            options={options_coronavirus}
                            height={150}
                            width={150}
                        />
                    </div>
                </div>

                <div className="row mrow">
                    <div className="col-sm-4">
                        <Lottie 
                            options={options_symptoms}
                            height={250}
                            width={150}
                        />
                    </div>
                    <div className="col-sm-8">
                        <h5><b>Covid-19 Symptoms</b></h5>
                        Most common symptoms:
                        <ul>
                            <li>fever</li>
                            <li>dry cough</li>
                            <li>tiredness</li>
                        </ul>
                        Less common symptoms:
                        <ul>
                            <li>aches and pains</li>
                            <li>sore throat</li>
                            <li>diarrhoea</li>
                            <li>conjunctivitis</li>
                            <li>headache</li>
                            <li>loss of taste or smell</li>
                            <li>a rash on skin, or discolouration of fingers or toes</li>
                        </ul>
                        Serious symptoms:
                        <ul>
                            <li>difficulty breathing or shortness of breath</li>
                            <li>chest pain or pressure</li>
                            <li>loss of speech or movement</li>
                        </ul>
                    </div>
                </div>

                <div className="row mrow">
                    <div className="col-sm-4">
                        <h5><b>Prevention:</b></h5>
                    </div>
                    <div className="col-sm-4">
                        <ul>
                            <li>Stay Home</li>
                            <li>KEEP a safe distance</li>
                            <li>WASH hands often</li>
                            <li>COVER your cough</li>
                            <li>SICK? Call the helpline</li>
                        </ul>
                        
                    </div>
                    <div className="col-sm-4">
                        <Lottie 
                            options={options_stayhome}
                            height={200}
                            width={150}
                        />
                    </div>
                </div>
            </div>
        )
    }
}