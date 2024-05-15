import { isToday, isTodayOrBefore } from '../src/time';

describe('isToday', () => {
    it('should return true if the date matches today', () => {
        const today = new Date();
        expect(isToday(today)).toBe(true);
    });

    it('should return false if the date does not match today', () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        expect(isToday(tomorrow)).toBe(false);
    });
});

describe('isTodayOrBefore', () => {
    it('should return true if the date is today', () => {
        const today = new Date();
        expect(isTodayOrBefore(today)).toBe(true);
    });

    it('should return true if the date is before today', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        expect(isTodayOrBefore(yesterday)).toBe(true);
    });

    it('should return false if the date is after today', () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        expect(isTodayOrBefore(tomorrow)).toBe(false);
    });
});

