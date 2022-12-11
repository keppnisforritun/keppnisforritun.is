/**
 * Checks whether the value is a valid date string corresponding to format YYYY-MM-DD
 */
function isValidDate(value) {
    const matches = value.match(/^(\d\d\d\d)-(\d\d)-(\d\d)$/);

    if (matches === null) {
        return false;
    }

    const year = parseInt(matches[1], 10);
    const month = parseInt(matches[2], 10);
    const day = parseInt(matches[3], 10);

    if (year < 1970 || year > 2100 || month === 0 || month > 12) {
        return false;
    }

    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        monthLength[1] = 29;
    }

    // check the range of the day
    return (day > 0) && (day <= monthLength[month - 1]);
}

/**
 * Checks whether the value is a valid time string corresponding to format hh:mm[:ss]
 */
function isValidTime(value) {
    const matches = value.match(/^(\d\d):(\d\d)(:(\d\d))?$/);

    if (matches === null) {
        return false;
    }

    const hours = parseInt(matches[1], 10);
    const minutes = parseInt(matches[2], 10);
    const seconds = (matches[4] === undefined) ? null : parseInt(matches[4], 10);

    return (hours < 24) && (minutes < 60) && (seconds === null || seconds < 60);
}

function twodigit(x) {
    // There must be a better way in Javascript?
    return (x < 10 ? '0' : '') + x;
}

function formatDuration(seconds, alwaysShowHours, verboseDays) {
    if (seconds < 0) {
        return `-${formatDuration(-seconds, alwaysShowHours, verboseDays)}`;
    }
    const totalSeconds = Math.floor(seconds);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const displayDays = verboseDays ? totalDays : 0;
    const displayHours = (displayDays > 0) ? (totalHours % 24) : totalHours;
    const displayMinutes = totalMinutes % 60;
    const displaySeconds = totalSeconds % 60;

    let daysAndHours;
    if (displayDays === 1) {
        daysAndHours = [`1 day ${displayHours}`];
    } else if (displayDays > 0) {
        daysAndHours = [`${displayDays} days ${displayHours}`];
    } else if (alwaysShowHours || displayHours > 0) {
        daysAndHours = [displayHours];
    } else {
        daysAndHours = [];
    }

    return [...daysAndHours, twodigit(displayMinutes), twodigit(displaySeconds)].join(':');
}

export {
    formatDuration,
    isValidDate,
    isValidTime,
    twodigit,
};