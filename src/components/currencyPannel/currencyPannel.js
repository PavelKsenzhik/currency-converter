import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import AbbrPicker from "../abbrPicker";
import CountPicker from "../countPicker";
import Loader from '../loader';
import Flatpickr from 'react-flatpickr';
import { Russian } from "flatpickr/dist/l10n/ru.js"

import "flatpickr/dist/themes/material_red.css";

import './currencyPannel.scss'

import { loadRates, setDay } from '../../redux/actions'
import { daySelector, rateSelector, ratesLoadedSelector, ratesLoadingSelector } from "../../redux/selectors";


// DEV ONLY
let count = 0;

function CurrencyPannel({ loadRates, setDay, loading, loaded, day, rate }) {

    const today = new Date().setHours(0, 0, 0, 0);
    const [currAmount, setCurrAmout] = useState(1);
    const [bynAmount, setBynAmount] = useState(rate * currAmount);

    useEffect(() => {
        if (!loading && !loaded) loadRates()
    }, [loadRates])


    useEffect(() => {
        if (!!rate) {
            handleCurrAmountChange(1)
        }
    }, [rate]);

    useEffect(() => {
        if (loaded) loadRates()
    }, [day, loadRates])

    console.log(`${++count} render`);
    if (loading) return <Loader />;
    if (!loaded) return 'Что-то пошло не так. Необходимо обновить страницу'

    function handleBynAmountChange(bynAmount) {
        if (bynAmount === '' || bynAmount === 0) {
            setBynAmount('');
            setCurrAmout('');
            return;
        }
        setCurrAmout(bynAmount / (1 * rate));
        setBynAmount(bynAmount)
    }

    function handleCurrAmountChange(currAmountReturned) {
        if (currAmountReturned === '' || currAmountReturned === 0) {
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
            <div className="currency-pannel__wrapper">
                <div className="currency-pannel__input-pickers">
                    <div className="currency-pannel__picker">
                        <AbbrPicker disabled={true} />
                        <CountPicker value={bynAmount} setter={handleBynAmountChange} />
                    </div>
                    <div className="currency-pannel__picker">
                        <AbbrPicker />
                        <CountPicker value={currAmount} setter={handleCurrAmountChange} />
                    </div>
                </div>
                <div className="currency-pannel__flatpickr">
                    <Flatpickr
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
        </div>
    )
}

const mapStateToProps = (state) => ({
    loading: ratesLoadingSelector(state),
    loaded: ratesLoadedSelector(state),
    day: daySelector(state),
    rate: rateSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
    loadRates: () => dispatch(loadRates()),
    setDay: (day) => dispatch(setDay(day)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyPannel);
