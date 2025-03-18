/* Your Code Here */

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
	return {
		firstName,
		familyName,
		title,
		payPerHour,
		timeInEvents: [],
		timeOutEvents: [],
	};
}

function createEmployeeRecords(arr) {
	return arr.map(item => createEmployeeRecord(item))
}

function createTimeInEvent(date) {
	// "YYYY-MM-DD HHMM"
	this.timeInEvents.push({
		type: 'TimeIn',
		hour: +(date.split(' ')[1].slice(0, 2) + '00'),
		date: date.split(' ')[0],
	});
	return this;
}

function createTimeOutEvent(date) {
	this.timeOutEvents.push({
		type: 'TimeOut',
		hour: +(date.split(' ')[1].slice(0, 2) + '00'),
		date: date.split(' ')[0],
	});
	return this;
}

function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find((instance) => instance.date === date).hour / 100;
	let timeOut = this.timeOutEvents.find((instance) => instance.date === date).hour / 100;
	return timeOut - timeIn;
}

function wagesEarnedOnDate(date) {
    let val = hoursWorkedOnDate.call(this, date) * this.payPerHour
    return val
}

function findEmployeeByFirstName(arr, name) {
    return arr.find(item => item.firstName === name) || undefined
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
	const eligibleDates = this.timeInEvents.map(function (e) {
		return e.date;
	});

	const payable = eligibleDates.reduce(
		function (memo, d) {
			return memo + wagesEarnedOnDate.call(this, d);
		}.bind(this),
		0
	); // <== Hm, why did we need to add bind() there? We'll discuss soon!

	return payable;
};

function calculatePayroll(arr) {
    return arr.reduce((total, employee) => {
        return total += allWagesFor.call(employee)
    },0)
}