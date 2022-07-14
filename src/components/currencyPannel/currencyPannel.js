import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import AbbrPicker from "../abbrPicker";
import CountPicker from "../countPicker";
import Flatpickr from 'react-flatpickr';
import { Russian } from "flatpickr/dist/l10n/ru.js"
import { loadRates, setPrevData } from '../../redux/actions'
import { 
    daySelector, 
    prevBynAmountSelector, 
    prevCurrAmountSelector, 
    rateSelector, 
    ratesErrorSelector, 
    ratesLoadedSelector, 
    ratesLoadingSelector 
} from "../../redux/selectors";


import "flatpickr/dist/themes/material_red.css";

import './flatpickr.scss';
import './currencyPannel.scss';



function CurrencyPannel({ loadRates, setPrevData, loading, loaded, day, rate, error, prevBynAmount, prevCurrAmount }) {

    const today = new Date().setHours(0, 0, 0, 0);
    const [currAmount, setCurrAmout] = useState(1);
    const [bynAmount, setBynAmount] = useState(rate * prevCurrAmount);
    const [activeField, setActiveField] = useState('USD');

    // Loading Data
    useEffect(() => {
        if (!loading && !loaded) loadRates()
    }, [loadRates])

    // Init first render
    useEffect(() => {
        if (!!rate) {
            switch(activeField){
                case "USD":
                    handleCurrAmountChange(prevCurrAmount);
                    break;
                case "BYN":
                    handleBynAmountChange(prevBynAmount);
                    break;
                default:
                    break;
            }
            
        }
    }, [rate]);
    
    // Rerender if day changed
    useEffect(() => {
        if (loaded) loadRates();
    }, [day, loadRates])

    if (error) alert(`Ошибка ${error}. Попробуйте обновить страницу`);

    function handleBynAmountChange(bynAmount) {
        if (bynAmount === '' || bynAmount === 0) {
            setBynAmount('');
            setCurrAmout('');
            return;
        }
        setCurrAmout(+bynAmount / (1 * rate));
        setBynAmount(+bynAmount)
    }

    function handleCurrAmountChange(currAmountReturned) {
        if (currAmountReturned === '' || currAmountReturned === 0) {
            setCurrAmout('')
            setBynAmount('')
            return;
        }
        setBynAmount(+currAmountReturned * rate);
        setCurrAmout(+currAmountReturned)
    }

    return (
        <div className="currency-pannel">
            <h1 className="currency-pannel__title">Калькулятор валют</h1>
            <div className="currency-pannel__wrapper">
                <div className="currency-pannel__input-pickers">
                    <div className="currency-pannel__picker">
                        <AbbrPicker disabled={true} />
                        <CountPicker value={bynAmount} setter={handleBynAmountChange} field={"BYN"} setActiveField={setActiveField}/>
                    </div>
                    <div className="currency-pannel__picker">
                        <AbbrPicker />
                        <CountPicker value={currAmount} setter={handleCurrAmountChange} field={"USD"} setActiveField={setActiveField}/>
                    </div>
                </div>
                <div className="currency-pannel__flatpickr">
                    <Flatpickr
                        value={day}
                        onChange={(day) => {
                            setPrevData(day[0], +bynAmount, +currAmount);
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
        </div>
    )
}

const mapStateToProps = (state) => ({
    loading: ratesLoadingSelector(state),
    loaded: ratesLoadedSelector(state),
    day: daySelector(state),
    rate: rateSelector(state),
    error: ratesErrorSelector(state),
    prevBynAmount: prevBynAmountSelector(state),
    prevCurrAmount: prevCurrAmountSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
    loadRates: () => dispatch(loadRates()),
    setPrevData: (day, bynAmount, currAmount) => dispatch(setPrevData(day, bynAmount, currAmount)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyPannel);
