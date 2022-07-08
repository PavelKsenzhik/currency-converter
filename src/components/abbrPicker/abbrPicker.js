import { Fragment, useState } from "react";
import { connect } from 'react-redux';
import AbbrItem from "./abbrItem";
import FlagSelector from "./flagSelector";

import './abbrPicker.scss';
import { setCurr, setRate } from "../../redux/actions";

function AbbrPicker({ rates, disabled, setRate}) {

    const [statusInput, setStatusInput] = useState(false);
    const [filterText, setFilterText] = useState('Доллар США');
    const [activeFlag, setActiveFlag] = useState('USD')

    return (
        <div className="abbr-picker">
            <div className="abbr-picker__input-wrapper">

                {disabled ?
                    <Fragment>
                        <FlagSelector attr={'BYN'} />
                        <input className=" abbr-picker__input abbr-picker__input_disabled" type="text" value={"Белорусский рубль"} disabled={disabled} />
                    </Fragment>
                    :
                    <Fragment>
                        <FlagSelector attr={activeFlag} />
                        <input type="text"
                            className="abbr-picker__input"
                            placeholder="Выберите валюту"
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
                    rates.filter(rate => {
                        if (filterText === "") {
                            return rate
                        } else if (rate.Cur_Name.toLowerCase().includes(filterText.toLowerCase())) {
                            return rate
                        }
                    }).map(rate => {
                        return <AbbrItem key={rate.Cur_ID} rate={rate} setRate={setRate} setActiveFlag={setActiveFlag} setStatusInput={setStatusInput} setFilterText={setFilterText}/>
                    }) :
                    <Fragment></Fragment>
                }
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    setRate: (rate) => dispatch(setRate(rate)),
})

export default connect(mapStateToProps, mapDispatchToProps )(AbbrPicker);