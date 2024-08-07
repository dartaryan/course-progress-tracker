function toggleTimeInput() {
    const remainingTimeGroup = document.getElementById('remainingTimeGroup');
    const watchedTimeGroup = document.getElementById('watchedTimeGroup');
    const timeToggle = document.querySelector('input[name="timeToggle"]:checked').value;

    if (timeToggle === 'remaining') {
        remainingTimeGroup.style.display = 'block';
        watchedTimeGroup.style.display = 'none';
    } else {
        remainingTimeGroup.style.display = 'none';
        watchedTimeGroup.style.display = 'block';
    }
}

function calculateProgress() {
    const totalHours = parseInt(document.getElementById('totalHours').value) || 0;
    const totalMinutes = parseInt(document.getElementById('totalMinutes').value) || 0;
    const remainingHours = parseInt(document.getElementById('remainingHours').value) || 0;
    const remainingMinutes = parseInt(document.getElementById('remainingMinutes').value) || 0;
    const watchedHours = parseInt(document.getElementById('watchedHours').value) || 0;
    const watchedMinutes = parseInt(document.getElementById('watchedMinutes').value) || 0;

    const totalTimeInMinutes = totalHours * 60 + totalMinutes;
    let remainingTimeInMinutes = remainingHours * 60 + remainingMinutes;
    const watchedTimeInMinutes = watchedHours * 60 + watchedMinutes;

    if (document.querySelector('input[name="timeToggle"]:checked').value === 'watched') {
        remainingTimeInMinutes = totalTimeInMinutes - watchedTimeInMinutes;
        document.getElementById('calculatedRemainingTime').innerText = formatTime(remainingTimeInMinutes);
    }

    const percentageWatched = ((totalTimeInMinutes - remainingTimeInMinutes) / totalTimeInMinutes) * 100;

    const progressCircle = document.getElementById('circleProgress');
    const percentageText = document.getElementById('percentage');

    progressCircle.style.strokeDashoffset = 283;
    progressCircle.style.transition = 'none';

    progressCircle.getBoundingClientRect();

    const circleCircumference = 2 * Math.PI * 45;
    const offset = circleCircumference - (percentageWatched / 100) * circleCircumference;

    setTimeout(() => {
        progressCircle.style.transition = 'stroke-dashoffset 1s ease-in-out, stroke 1s ease-in-out';
        progressCircle.style.strokeDashoffset = offset;
    }, 50);

    let color;
    if (percentageWatched < 10) {
        color = '#4f2323';
    } else if (percentageWatched < 20) {
        color = '#5d2828';
    } else if (percentageWatched < 30) {
        color = '#722e2e';
    } else if (percentageWatched < 40) {
        color = '#8f3a3a';
    } else if (percentageWatched < 50) {
        color = '#a94545';
    } else if (percentageWatched < 60) {
        color = '#bb4e4e';
    } else if (percentageWatched < 70) {
        color = '#d66161';
    } else if (percentageWatched < 80) {
        color = '#e87b7b';
    } else if (percentageWatched < 90) {
        color = '#ff6b6b';
    } else {
        color = '#ffabab';
    }
    progressCircle.style.stroke = color;

    percentageText.innerText = percentageWatched.toFixed(2) + '%';
    percentageText.style.opacity = 1;

    document.getElementById('time1_2').innerText = formatTime(remainingTimeInMinutes / 1.2);
    document.getElementById('time1_4').innerText = formatTime(remainingTimeInMinutes / 1.4);
    document.getElementById('time1_6').innerText = formatTime(remainingTimeInMinutes / 1.6);
    document.getElementById('time1_8').innerText = formatTime(remainingTimeInMinutes / 1.8);
}

function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${ hours }:${ mins < 10 ? '0' + mins : mins }`;
}
