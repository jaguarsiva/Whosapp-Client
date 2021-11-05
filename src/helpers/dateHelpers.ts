
export function getCurrentTime(date: Date) {

	let hours = date.getHours();
	const ampm = hours < 12 ? 'AM' : 'PM';
	hours = 12 < hours ? hours - 12 : hours;
	const min = date.getMinutes();
	const s = date.getSeconds();
	return hours + ':' + min + ' ' + ampm;
}

export function toTimeString( date: Date ) {
	const d = date.getDate();
	const m = date.getMonth() + 1;
	const y = date.getFullYear();
	let hours = date.getHours();
	const ampm = hours < 12 ? 'AM' : 'PM';
	hours = 12 < hours ? hours - 12 : hours;
	const min = date.getMinutes();
	const s = date.getSeconds();

	return m + '/' + d + '/' + y + ', ' + hours + ':' + min + ':' + s + ' ' + ampm;
}
