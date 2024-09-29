document.getElementById('setReminderButton').addEventListener('click', function() {
    const reminderTime = new Date(document.getElementById('reminderTime').value);
    const reminderText = document.getElementById('reminderText').value;
    const currentTime = new Date();

    if (reminderTime <= currentTime) {
        alert("Please select a future date and time.");
        return;
    }

    const timeDiff = reminderTime.getTime() - currentTime.getTime();

    setTimeout(() => {
        alert(Reminder: ${reminderText});
        document.getElementById('message').innerText = Reminder set for: ${reminderText} at ${reminderTime.toLocaleString()};
    }, timeDiff);

    document.getElementById('message').innerText = Reminder set for: ${reminderText} at ${reminderTime.toLocaleString()};
});