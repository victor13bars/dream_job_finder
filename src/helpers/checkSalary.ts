export const checkSalary = (from: number, to: number, currency: string) => {
    if (from === 0 && to === 0) {
        return 'з/п не указана'
    }
    if (from > 0 && to > 0) {
        return `з/п ${from} - ${to} ${currency}`
    }
    if (from > 0 && to === 0) {
        return `з/п от ${from} ${currency}`
    }
    if (from === 0 && to > 0) {
        return `з/п ${to} ${currency}`
    }
}