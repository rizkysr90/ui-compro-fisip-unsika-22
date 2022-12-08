export function formattedDate(strDate) {
    const month = {
        '01' : 'January',
        '02' : 'February',
        '03' : 'Maret',
        '04' : 'April',
        '05' : 'Mei',
        '06' : 'Juni',
        '07' : 'Juli',
        '08' : 'Agustus',
        '09' : 'September',
        '10' : 'Oktober',
        '11' : 'November',
        '12' : 'Desember'
    }
    const split = strDate.split('-');
    let res = '';
    res += `${split[2].substring(0,2)} `
    res += `${month[split[1]]} `;
    res += `${split[0]}`
    return res;

}