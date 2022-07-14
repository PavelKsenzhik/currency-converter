import { useEffect, useMemo } from 'react';
import AbbrItem from '../abbrPicker/abbrItem';

const abbrModuleRootElement = document.querySelector('#abbr-modal');

const AbbrModal = ({ activeRates, filterText, setStatusInput, setFilterText }) => {
    const element = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        abbrModuleRootElement.appendChild(element);

        return () => {
            abbrModuleRootElement.removeChild(element)
        }
    }, [])

    return (
        activeRates.filter(rate => {
            if (filterText === "") {
                return rate
            } else if (rate.Cur_Name.toLowerCase().includes(filterText.toLowerCase())) {
                return rate
            }
        }).map(rate => {
            return (
                <AbbrItem key={rate.Cur_ID} rate={rate} setStatusInput={setStatusInput} setFilterText={setFilterText} />
            )
        })
    )
}

export default AbbrModal;