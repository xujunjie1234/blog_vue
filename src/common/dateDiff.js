//js中时间戳为13位，python为10位
export function dateDiff(timestamp) {
    // timestamp = timestamp * 1000
    let now = new Date();
    let pre = new Date(timestamp);
    let stamp = now.getTime() - pre.getTime();
    let years = Math.floor(stamp / (365 * 24 * 3600 * 1000));
    let months = Math.floor(stamp / (30 * 24 * 3600 * 1000));
    let days = Math.floor(stamp / (24 * 3600 * 1000));
    let hours = Math.floor(stamp / (3600 * 1000));
    let minutes = Math.floor(stamp / (60 * 1000));
    let seconds = Math.floor(stamp / 1000);
    if (seconds === 0){
        return '刚刚'
    }else if (seconds < 60) {
        return seconds + '秒前';
    }
    else if (minutes < 60) {
        return minutes + '分钟前';
    }
    else if (hours < 24) {
        return hours + '小时前';
    }
    else if (days < 30) {
        return days + '天前';
    }
    else if (months < 13) {
        return months + '个月前';
    }
    return years + '年前';
}
