type TCurrency = {
    name: string;
    symbol: string;
};

type TCurrencies = {
    [key: string]: TCurrency;
};

export const currencies: TCurrencies = {
    USD: { name: 'United States Dollar', symbol: '$' },
    EUR: { name: 'Euro', symbol: '€' },
    JPY: { name: 'Japanese Yen', symbol: '¥' },
    GBP: { name: 'British Pound Sterling', symbol: '£' },
    AUD: { name: 'Australian Dollar', symbol: 'A$' },
    CAD: { name: 'Canadian Dollar', symbol: 'C$' },
    CHF: { name: 'Swiss Franc', symbol: 'CHF' },
    CNY: { name: 'Chinese Yuan', symbol: '¥' },
    SEK: { name: 'Swedish Krona', symbol: 'kr' },
    NZD: { name: 'New Zealand Dollar', symbol: 'NZ$' }
};