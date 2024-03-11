export function hhmmss(myDate) {
    const hours = myDate.getHours().toString().padStart(2, '0');
    const minutes = myDate.getMinutes().toString().padStart(2, '0');
    const seconds = myDate.getSeconds().toString().padStart(2, '0');

    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime
}

export function yyyymmdd(myDate) {
    const year = myDate.getFullYear().toString();
    const month = (myDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = myDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

export function getDate(hhmmss, yyyymmdd) {
    const [year, month, dayOfMonth] = yyyymmdd.split('-');
    const [hours, minutes, seconds] = hhmmss.split(':');
    const myDate = new Date(year, month - 1, dayOfMonth, hours, minutes, seconds);
    return myDate;
}
