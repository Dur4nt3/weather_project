export function getTimePeriod() {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 18) {
        return 'day';
    }

    return 'night';
}
