import dayjs from 'dayjs';

export const getDateNow = (format?: string) => {
    return dayjs().format(format ? format : 'DD/MM/YYYY HH:mm');
}