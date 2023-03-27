const countries = [
    { code: 'US', name: 'United State' },
    { code: 'UA', name: 'Ukraine' },
    // ... other countries
  ];
  
export function getCountryByCode(code) {
    return countries.find(country => country.code === code);
}

export function getCountryName(countryCode) {
    const country = getCountryByCode(countryCode)
    return country ? country.name : countryCode
}