module.exports = function (timestamp, valueFormat = 'YYYY-MM-DD HH:mm:ss') {
    timestamp  = timestamp || Date.now()
    const myDate = new Date(timestamp)

    const year = myDate.getFullYear()
    const month  = myDate.getMonth()
    let date = myDate.getDate() + 1
    date  = date  < 10 ? '0' + date  : date
    const hour  = myDate.getHours()
    const minute = myDate.getMinutes()
    const second = myDate.getSeconds()
    const milSecond = myDate.getMilliseconds()

    return valueFormat.replace('YYYY', year).replace('MM', month).replace('DD', date).replace('HH', hour).replace('mm', minute).replace('ss', second).replace('SSS', milSecond)
}