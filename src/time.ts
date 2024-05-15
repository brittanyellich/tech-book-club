// Check if a date matches today's date
export const isToday = (date: Date): boolean => {
    const today = new Date();

    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}


// Function to check if a date occurred before or on today's date
export const  isTodayOrBefore = (date: Date): boolean => {
    const today = new Date();
    return (
        date.getDate() <= today.getDate() &&
        date.getMonth() <= today.getMonth() &&
        date.getFullYear() <= today.getFullYear()
    );
}
