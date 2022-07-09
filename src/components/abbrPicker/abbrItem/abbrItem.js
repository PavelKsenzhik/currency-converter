import { connect } from 'react-redux';
import { setCurr } from '../../../redux/actions';

import FlagSelector from '../flagSelector';

import './abbrItem.scss';

function AbbItem({ rate, setCurr, setStatusInput, setFilterText }) {
    const { Cur_Name, Cur_Abbreviation } = rate;
    
    return (
        <div className="abbr-item" onClick={() => {
            setStatusInput(false)
            setFilterText(Cur_Name)
            setCurr(rate)
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