import './countPicker.scss'


function CountPicker({ value, setter, curr, setActiveCurr }) {
    return (
        <div className="count-picker">
            <input className="count-picker__input" type='number' value={value} 
                onChange={(event) => {
                    setter(event.target.value);
                    setActiveCurr(curr);
                }}
            />
        </div>
    )
}

export default CountPicker;