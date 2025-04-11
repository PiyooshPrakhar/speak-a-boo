export const formatDate = (dateInput) => {
    if(dateInput instanceof Array && dateInput.length === 7) {
        const year = dateInput[0];
        const month = dateInput[1] - 1;
        const day = dateInput[2];
        const hour = dateInput[3];
        const minute = dateInput[4];
        const second = dateInput[5];

        const date = new Date(year, month, day, hour, minute, second);const options = { year: 'numeric', month: 'long', day: '2-digit' };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    }
}