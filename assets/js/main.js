// Fisher-Yates shuffle function
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

$(function () {
"use strict";

	var countdown_number = 1;
	var current_countdown = 0;
	var last_coundown_changed = 0;

	function next_coundown(force=false) {
		if (countdown_number == 1) return;
		if (!force && Date.now() < last_coundown_changed + 5) return;

		last_coundown_changed = Date.now();

		$(`#countdown_${current_countdown}`).fadeOut(() => $(`#countdown_${current_countdown}`).fadeIn() );
		current_countdown = (current_countdown+1) % countdown_number;
	}

	fetch('assets/db/dates.json')
	.then(response => response.json())
	.then(data => {

		// Removing old countdowns
		const filteredData = data.filter((obj) => {
			const objDate = new Date(obj.date);
			return objDate > Date.now();
		});

		if (filteredData.length === 0) return;

		const shuffledData = shuffle(filteredData);
		countdown_number = shuffledData.length;

		var html = "";
		for (var i=0; i<countdown_number; i++) {
			var current = shuffledData[i];
			var fade_in_first = i==0? ' class="wow fadeInRight" data-wow-delay=".4s"' : ''
			html += `<div id="countdown_${i}"${fade_in_first}><h4>⮕ ${current.name}</h4><div data-countdown="${current.date}"></div></div>`;
		}
		$('#countdowns').html(html);

		for (var i=1; i<countdown_number; i++) $(`#countdown_${i}`).hide();

		setInterval(next_coundown, 5100);

		$('h4').click(() => next_coundown(true))
	})
	.catch(error => {
		console.error('Error fetching dates:', error);
	})
	.finally( () => {

		//Countdown
		$('[data-countdown]').each(function () {
			var $this = $(this),
				finalDate = $(this).data('countdown');
			$this.countdown(finalDate, function (event) {
				$this.html(event.strftime('<div class="countdown d-flex"><div class="single-count-content"><span class="count">%D</span><p class="text">Days</p></div><div class="single-count-content"><span class="count">%H</span><p class="text">Hours</p></div><div class="single-count-content"><span class="count">%M</span><p class="text">Minutes</p></div><div class="single-count-content"><span class="count">%S</span><p class="text">Seconds</p></div></div>'));
			});
		});
	
		// WOW active
		new WOW().init();
	});
});	

