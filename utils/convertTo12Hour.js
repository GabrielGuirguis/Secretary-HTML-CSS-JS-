export function convertTo12Hour(time24) {
    const [hour, minute] = time24.split(':').map(Number);
    const ampm = hour >= 12 ? 'pm' : 'am';
    const hour12 = hour % 12 || 12; // Convert 0 -> 12, 13 -> 1, etc.
    return `${hour12}:${minute.toString().padStart(2, '0')} ${ ampm}`;
}