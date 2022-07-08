import { ReactComponent as Icon } from '../../../icons/flags/ad.svg';
import FlagSelector from '../flagSelector';


import './abbrItem.scss'

function AbbItem({ rate, setActiveFlag, setStatusInput, setFilterText }) {
    const { Cur_Name, Cur_Abbreviation } = rate;
    return (
        <div className="abbr-item" onClick={() => {
            setActiveFlag(Cur_Abbreviation);
            setStatusInput(false)
            setFilterText(Cur_Name)
        }}>
            <div className="abbr-item__flag">
                {<FlagSelector  attr={Cur_Abbreviation}/> }
            </div>
             
            <p className="abbr-item__text">{Cur_Name}</p>
        </div>
    )
}

export default AbbItem;