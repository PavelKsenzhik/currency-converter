import { Fragment, useState } from "react";
import { connect } from 'react-redux';
import AbbrItem from "./abbrItem";
import FlagSelector from "./flagSelector";

import './abbrPicker.scss';

import { activeAbbrSelector, activeNameSelector, activeRatesSelector } from "../../redux/selectors";

function AbbrPicker({ activeRates, disabled, acvtiveAbbr, activeName}) {

    const [statusInput, setStatusInput] = useState(false);
    const [filterText, setFilterText] = useState('');

    return (
        <div className="abbr-picker">
            <div className="abbr-picker__input-wrapper">

                {disabled ?
                    <Fragment>
                        <FlagSelector  attr={'BYN'} />
                        <input className=" abbr-picker__input abbr-picker__input_disabled" type="text" value={"Белорусский рубль"} disabled={disabled} />
                    </Fragment>
                    :
                    <Fragment>
                        {                                   }
                        <FlagSelector attr={acvtiveAbbr} />
                        <input type="text"
                            className="abbr-picker__input"
                            placeholder={activeName}
                            value={filterText}
                            onClick={() => {
                                setStatusInput(!statusInput)
                                setFilterText('');
                            }}
                            onChange={(ev) => setFilterText(ev.target.value)} />
                    </Fragment>
                }
            </div>

            <div className="abbr-picker__items">
                {statusInput ?
                    activeRates.filter(rate => {
                        if (filterText === "") {
                            return rate
                        } else if (rate.Cur_Name.toLowerCase().includes(filterText.toLowerCase())) {
                            return rate
                        }
                    }).map(rate => {
                        return <AbbrItem key={rate.Cur_ID} rate={rate} setStatusInput={setStatusInput} setFilterText={setFilterText}/>
                    }) :
                    <Fragment></Fragment>
                }
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    activeRates: activeRatesSelector(state),
    acvtiveAbbr: activeAbbrSelector(state), 
    activeName: activeNameSelector(state),
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps )(AbbrPicker);