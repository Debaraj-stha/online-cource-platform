const currencyMap: Record<string, string> = {
    en: 'USD',
    np: 'NPR',
    hi: 'INR',
    fr: 'EUR',
    es: 'EUR',
};
/**
 * format price based on locale
 * @param price 
 * @param languageCode  -languagecode of country like en for english,ne for nepali
 * @returns 
 */
export const formatPrice = (price: number, languageCode: string , localCurrency?: string) => {
    const currency = localCurrency || currencyMap[languageCode ?? "us"] || 'USD';

    return new Intl.NumberFormat(languageCode, {
        style: 'currency',
        currency:"USD",
    }).format(price);
};

/**
 * format date based on locale
 * @param date  -datetime to format
 * @param countryShortName -short country name like USA,Nep,IN
 * @returns 
 */
export const formatDate = (date: string | Date, countryShortName: string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return new Intl.DateTimeFormat(countryShortName, {
        year: "numeric",
        month: 'long',
        day: 'numeric',
        weekday: 'short'
    }).format(dateObj);
};
/**
 * format time based on locale
 * @param time  -time to format
 * @param countryShortName -short country name like USA,Nep,IN
 * @returns 
 */
export const formatTime = (time: string | Date, countryShortName: string) => {
    const dateObj = typeof time === 'string' ? new Date(time) : time;

    return new Intl.DateTimeFormat(countryShortName, {
        hour: "2-digit",
        minute: "2-digit",
    }).format(dateObj);
};

/**
 * format datetime based on locale
 * @param date  -datetime to format
 * @param countryShortName -short country name like USA,Nep,IN
 * @returns 
 */
export const formatDateTime = (date: string | Date, countryShortName: string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(countryShortName, {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        weekday: 'short',
        hour: "2-digit",
        minute: "2-digit",
    }).format(dateObj);
};

export const formatNumber = (value: number, countryShortName: string, options: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(countryShortName, {
        maximumFractionDigits: 2,
        ...options
    }).format(value)

}