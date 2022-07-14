import './countPicker.scss'


function CountPicker({ value, setter, field, setActiveField }) {
    return (
        <div className="count-picker">
            <input className="count-picker__input" type='number' value={value} 
                onChange={(event) => {
                    setter(event.target.value);
                    setActiveField(field);
                }}
            />
        </div>
    )
}

export default CountPicker;