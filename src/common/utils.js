export function get_month(nowDate){
    // let nowDate = new Date();
    let cloneNowDate = nowDate;
    let fullYear = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
    let endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
    function getFullDate(targetDate) {
            let D, y, m, d;
            if (targetDate) {
                D = new Date(targetDate);
                y = D.getFullYear();
                m = D.getMonth() + 1;
                d = D.getDate();
            } else {
                y = fullYear;
                m = month;
                d = date;
            }
            // m = m > 9 ? m : '0' + m;
            // d = d > 9 ? d : '0' + d;
            return y + '/' + m + '/' + d;
        };
    let endDate = getFullDate(cloneNowDate.setDate(endOfMonth));//当月最后一天
    let starDate = getFullDate(cloneNowDate.setDate(1));//当月第一天
    return [starDate, endDate]
}