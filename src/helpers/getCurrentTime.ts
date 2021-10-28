
export function getCurrentTime(date: Date) {
	var hours = date.getHours();
	var ampm = hours < 12 ? 'AM' : 'PM';
	hours = 12 < hours ? hours - 12 : hours;
	var minutes: string | number = date.getMinutes();
	minutes = minutes < 10 ? '0' + minutes : minutes;
	return hours + ':' + minutes + ' ' + ampm;
}
