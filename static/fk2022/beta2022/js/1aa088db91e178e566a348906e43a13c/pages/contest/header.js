import {formatDuration} from "../../modules/util/date.js";

class ContestHeader {
    constructor(props) {
        console.log("Initializing header:", props);
        this.hasStart = props.has_start;
        this.elapsedSeconds = props.elapsed_seconds;
        this.durationSeconds = props.total_seconds;
        this.refreshAtStart = props.refresh_at_start;
        this.loadedAt = window.page_loaded_at;

        // If the initial page load was more than 10 minutes before the start
        // of the contest, then reload the page sometime within the last 5
        // minutes (randomized to avoid everyone reloading at once).
        this.reload1Time = (this.elapsedSeconds < -10 * 60) ? -(5 * 60 + Math.random() * 5 * 60) : -Infinity;

        // If the contest as not started, reload sometime in the range of 0-30 seconds
        // after the contest starts (randomized to avoid everyone reloading at once).
        this.reload2Time = (this.elapsedSeconds < 0 ? Math.random() * 30 : -Infinity);

        this.pastReload1 = (this.elapsedSeconds >= this.reload1Time);
        this.pastReload2 = (this.elapsedSeconds >= this.reload2Time);

        let t = this;
        setInterval(() => {
            t.tick();
        }, 200);
    }

    tick() {
        let elapsed = Math.floor(this.elapsedSeconds + (new Date() - this.loadedAt) / 1000);

        // if the document is hidden, delay doing reload checks until it is
        // not hidden
        if (!document.hidden) {
            // Reload the current document if we cross a time threshold
            const newPastReload1 = (elapsed >= this.reload1Time);
            const newPastReload2 = (elapsed >= this.reload2Time);
            const crossedReload = (!this.pastReload1 && newPastReload1)
                || (!this.pastReload2 && newPastReload2);

            if (this.refreshAtStart && crossedReload) {
                window.location.reload();
            }

            this.pastReload1 = newPastReload1;
            this.pastReload2 = newPastReload2;
        }

        let nearEnd = false;
        let finished = false;
        let notStarted = false;
        let noStart = false;

        if (!this.hasStart) {
            noStart = true;
            elapsed = 0;
        } else if (elapsed < 0) {
            notStarted = true;
        } else if (elapsed >= this.durationSeconds) {
            finished = true;
        } else if (this.durationSeconds - elapsed <= 15 * 60) {
            nearEnd = true;
        }

        const elem = jQuery('.contest-progress');

        elem.toggleClass('session-nostart', noStart);
        elem.toggleClass('session-notstarted', notStarted);
        elem.toggleClass('session-nearend', nearEnd);
        elem.toggleClass('session-finished', finished);

        if (elapsed < 0) {
            elem.find('.countdown').text(formatDuration(-elapsed, false, true));
        }

        const clamped = Math.min(this.durationSeconds, Math.max(elapsed, 0));

        let perc;
        if (noStart || notStarted) {
            perc = 100;
        } else {
            perc = (100 * clamped) / this.durationSeconds;
        }

        elem.find('.count_elapsed').text(formatDuration(clamped, true));
        elem.find('.count_remaining').text(formatDuration(this.durationSeconds - clamped, true));
        elem.find('.progress-bar').css('width', `${perc}%`);
    }

    updateContestHeader(newHasStart, newElapsed, newDuration) {
        this.hasStart = newHasStart;
        this.elapsedSeconds = newElapsed;
        this.durationSeconds = newDuration;
        this.loadedAt = new Date();
        // The header DOM element has been replaced, so trigger a tick
        // immediately to make it look sane.
        tick();
    }

    update() {
        const el = document.getElementById('contest_time');
        if (!el) {
            return;
        }
        const props = JSON.parse(el.dataset.props);
        this.updateContestHeader(props.has_start, props.elapsed_seconds, props.total_seconds);
    }
}

const el = document.getElementById("contest_time");
if (el) {
    const timerData = JSON.parse(el.dataset.props);
    new ContestHeader(timerData);
}