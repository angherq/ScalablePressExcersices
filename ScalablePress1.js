// Add a custon function to the js date object
Date.prototype.addSeconds = function(s) { 
	this.setSeconds(this.getSeconds() + s)
	return this
}

function addBusinessTime(holiday, time, duration) {
	calculated_time = new Date(time)
	calculated_time.addSeconds(duration)

	// Check if the calculated time is between holiday period
	if (calculated_time <= holiday.end && calculated_time >= holiday.start) {
		diff = duration
		// Check if the original time is smaller than the start of the holiday period
		if (time <= holiday.start) {
			diff =  86400 - ((holiday.end - calculated_time) / 1000)	
		}
		holiday_start = new Date(holiday.end)
		console.log(holiday_start.addSeconds(diff))
		return holiday_start.addSeconds(diff)
	}
	// Just add the duration
	console.log(calculated_time)
	return calculated_time
}

// Christmas 2019, 9pm Dec 24th to 9pm Dec 25th
const holiday = {
	start: new Date('2019-12-24T21:00:00'),
	end: new Date('2019-12-25T21:00:00')
};

addBusinessTime(holiday, new Date('2019-12-01T00:00:00'), 60 * 60) // returns 2019-12-01T01:00:00
addBusinessTime(holiday, new Date('2019-12-24T21:00:00'), 1) // returns 2019-12-25T21:00:01
addBusinessTime(holiday, new Date('2019-12-24T20:30:00'), 60 * 60) // returns 2019-12-25T21:30:00
addBusinessTime(holiday, new Date('2019-12-25T00:00:00'), 1) // returns 2019-12-25T21:00:01
addBusinessTime(holiday, new Date('2019-12-25T00:00:00'), -1) // returns 2019-12-24T20:59:59