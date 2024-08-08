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
    const circleCircumference = 2 * Math.PI * 45;
    const offset = circleCircumference - (percentageWatched / 100) * circleCircumference;

    progressCircle.style.strokeDashoffset = '283';
    progressCircle.style.transition = 'none';

    progressCircle.getBoundingClientRect();

    setTimeout(() => {
        progressCircle.style.transition = 'stroke-dashoffset 1s ease-in-out';
        progressCircle.style.strokeDashoffset = offset.toString();
        animatePercentageText(percentageWatched);
    }, 50);
}

function calculateColor(percentage) {
    const darkColor = { h: 0, s: 50, l: 30 };
    const lightColor = { h: 0, s: 100, l: 80 };

    const h = darkColor.h + (lightColor.h - darkColor.h) * (percentage / 100);
    const s = darkColor.s + (lightColor.s - darkColor.s) * (percentage / 100);
    const l = darkColor.l + (lightColor.l - darkColor.l) * (percentage / 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
}

function animatePercentageText(finalPercentage) {
    const percentageText = document.getElementById('percentage');
    const progressCircle = document.getElementById('circleProgress');
    percentageText.style.opacity = '1';
    let currentPercentage = 0;
    const increment = finalPercentage / 100;
    const interval = setInterval(() => {
        currentPercentage += increment;
        if (currentPercentage >= finalPercentage) {
            currentPercentage = finalPercentage;
            clearInterval(interval);
        }
        percentageText.innerText = currentPercentage.toFixed(2) + '%';
        progressCircle.style.stroke = calculateColor(currentPercentage);
    }, 10);
}

function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const roundedMinutes = Math.round(minutes % 60);
    return `${hours}:${roundedMinutes < 10 ? '0' + roundedMinutes : roundedMinutes}`;
}
