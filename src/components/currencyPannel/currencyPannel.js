import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import AbbrPicker from "../abbrPicker";
import CountPicker from "../countPicker";
import Loader from '../loader';
import Flarpickr from 'react-flatpickr';
import { Russian } from "flatpickr/dist/l10n/ru.js"

import "flatpickr/dist/themes/material_red.css";

import './currencyPannel.scss'

import { loadRates, setDay } from '../../redux/actions'
import { daySelector, rateSelector, ratesLoadedSelector, ratesLoadingSelector, ratesSelector} from "../../redux/selectors";

let count = 0;

function CurrencyPannel({ loadRates, setDay, loading, loaded, rates, day, rate }) {

    const today = new Date().setHours(0,0,0,0);
    const [currAmount, setCurrAmout] = useState(1);
    const [bynAmount, setBynAmount] = useState(rate * currAmount);
    
    useEffect(() =>{
        if(!loading && !loaded) loadRates()
    }, [rate])

    useEffect(() =>{
        if(!!rate){
            handleCurrAmountChange(1)
        }
    },[rate]);

    useEffect(() =>{
        if(loaded) loadRates()
    },[day])

    console.log(`${++count} render`);
    if(loading) return <Loader />;
    if(!loaded) return 'No data =(';

    function handleBynAmountChange(bynAmount) {
        if(bynAmount === '' || bynAmount === 0){
            setBynAmount('');
            setCurrAmout('');
            return;
        }
        setCurrAmout(bynAmount / ( 1 * rate));
        setBynAmount(bynAmount)
    }
    
    function handleCurrAmountChange(currAmountReturned) {
        if(currAmountReturned === '' || currAmountReturned === 0){
            setCurrAmout('')
            setBynAmount('')
            return;
        }
        setBynAmount(currAmountReturned * rate);
        setCurrAmout(currAmountReturned)
    }

    return (
        <div className="currency-pannel">
            <h1 className="currency-pannel__title">Калькулятор валют</h1>
            <div className="currency-pannel__items">
                <div className="currency-pannel__item">
                    Рубли
                    <AbbrPicker />
                    <CountPicker value={bynAmount} setter={handleBynAmountChange}/>
                </div>
                <div className="currency-pannel__item">
                    <AbbrPicker />
                    <CountPicker value={currAmount} setter={handleCurrAmountChange}/>
                </div>
            </div>
            <div className="currency-pannel__item">
                <Flarpickr 
                    value={day}
                    onChange={(day) => {
                        setDay(day[0]);
                    }}
                    options={{
                        mode: 'single',
                        altInputClass: 'flatpickr-input',
                        inline: true,
                        maxDate: today + 86400000,
                        locale: Russian,
                        errorHandler: () => {
                        },
                    }}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    loading: ratesLoadingSelector(state),
    loaded: ratesLoadedSelector(state), 
    rates: ratesSelector(state),
    day: daySelector(state),
    rate: rateSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
    loadRates: () => dispatch(loadRates()),
    setDay: (day) => dispatch(setDay(day)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyPannel);