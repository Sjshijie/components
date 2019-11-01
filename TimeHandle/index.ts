type TimeType = 'YYYY-MM-DD hh:mm:ss' | 'YYYY-MM-DD' | 'hh:mm:ss' | "YYYY"
type TimeRangeType = 1 | 2 | 3 | 4 | 5 | number

class Time {
    public getTime(dateString: string | number, type: TimeType = 'YYYY-MM-DD hh:mm:ss') {
        const date = new Date(dateString)
        const [year, month, day, hours, minutes, seconds] = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()].map(item => {
            return item < 10 ? `0${item}` : item
        })
        let time = ''
        switch (type) {
            case "YYYY":
                time = `${year}`
                break;
            case 'YYYY-MM-DD':
                time = `${year}-${month}-${day}`;
                break;
            case 'hh:mm:ss':
                time = `${hours}:${minutes}:${seconds}`;
                break;
            case 'YYYY-MM-DD hh:mm:ss':
                time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                break;
            default: time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
        return time
    }

    public getTimeRange(timeRangeType: TimeRangeType, type: TimeType = 'YYYY-MM-DD hh:mm:ss') {
        const date = new Date().getTime();
        let startTime = '';
        let endTime = '';
        switch (timeRangeType) {
            case 1:
                startTime = this.getTime(date, 'YYYY-MM-DD')
                endTime = this.getTime(date, 'YYYY-MM-DD')
                break;
            case 2:
                startTime = this.getTime(date - 6 * 24 * 60 * 60 * 1000, 'YYYY-MM-DD')
                endTime = this.getTime(date, 'YYYY-MM-DD')
                break;
            case 3:
                startTime = this.getTime(date - 29 * 24 * 60 * 60 * 1000, 'YYYY-MM-DD')
                endTime = this.getTime(date, 'YYYY-MM-DD')
                break;
            case 4:
                startTime = `${this.getTime(date, "YYYY")}-01-01`
                endTime = this.getTime(date, 'YYYY-MM-DD')
                break;
        }
        return [`${startTime} 00:00:00`, `${endTime} 23:59:59`]
    }

}


export default new Time()