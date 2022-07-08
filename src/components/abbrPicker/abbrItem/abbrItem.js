import { connect } from 'react-redux';
import { setCurr, setRate } from '../../../redux/actions';

import FlagSelector from '../flagSelector';

import './abbrItem.scss';

function AbbItem({ rate, setRate, setCurr, setActiveFlag, setStatusInput, setFilterText }) {
    const { Cur_Name, Cur_Abbreviation, Cur_OfficialRate, Cur_Scale } = rate;
    return (
        <div className="abbr-item" onClick={() => {
            setRate(Cur_OfficialRate)
            setActiveFlag(Cur_Abbreviation);
            setStatusInput(false)
            setFilterText(Cur_Name)
            setCurr(Cur_Abbreviation, Cur_Scale, Cur_OfficialRate)
        }}>
            <div className="abbr-item__flag">
                {<FlagSelector  attr={Cur_Abbreviation}/> }
            </div>
             
            <p className="abbr-item__text">{Cur_Name}</p>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    setCurr: (abbr, scale, rate) => dispatch(setCurr(abbr, scale, rate))
})


export default connect(mapStateToProps, mapDispatchToProps)(AbbItem);