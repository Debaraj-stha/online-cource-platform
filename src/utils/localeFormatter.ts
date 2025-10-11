

/**
 * Format price based on locale, defaulting to Nepali Rupee (NPR)
 */
export const currencyMap: Record<string, string> = {
  en: 'USD',
  np: 'NPR',
  hi: 'INR',
  fr: 'EUR',
  es: 'EUR',
};

/**
 * Format price based on locale and currency.
 * Always returns a string, never undefined.
 */
export const formatPrice = (
  price: number,
  languageCode?: string,
  localCurrency?: string
): string => {
  // Ensure languageCode fallback
  const langKey = languageCode?.split('-')[0]?.toLowerCase() || 'np';

  // Ensure currency fallback
  const currency = localCurrency || currencyMap[langKey] || 'NPR';

  // Ensure valid locale
  const locale = languageCode ? languageCode.replace('_', '-') : 'np-NP';
  console.log("currency",currency)

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(price);
  } catch (error) {
    console.error(
      'formatPrice failed, falling back to default:',
      error,
      { price, locale, currency }
    );
    // fallback: Nepali currency and locale
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR',
    }).format(price);
  }
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