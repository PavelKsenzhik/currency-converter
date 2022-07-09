export default function formatDate (unformattedDate){
    if(!unformattedDate) return;
    
    let date = unformattedDate;
    const month = date.getMonth().toString().length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1 }`;
    const fullDay = date.getDate().toString().length === 1 ? `0${date.getDate()}` : `${date.getDate()}`;
    date = `${date.getFullYear()}-${month}-${fullDay}T00:00:00`;
    return date
}