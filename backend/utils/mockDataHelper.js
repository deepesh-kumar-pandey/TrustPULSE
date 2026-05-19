// Pre-seeded real data for common companies to make the demo realistic
const REAL_DATA = {
  'tcs': { Google: 3.9, Trustpilot: 3.7, Glassdoor: 3.9, Indeed: 3.8 },
  'google': { Google: 4.5, Trustpilot: 3.8, Glassdoor: 4.4, Indeed: 4.2 },
  'amazon': { Google: 3.8, Trustpilot: 1.8, Glassdoor: 3.8, Indeed: 3.5 },
  'apple': { Google: 4.4, Trustpilot: 2.1, Glassdoor: 4.2, Indeed: 4.2 },
  'microsoft': { Google: 4.3, Trustpilot: 1.9, Glassdoor: 4.3, Indeed: 4.1 },
  'salesforce': { Google: 4.2, Trustpilot: 3.5, Glassdoor: 4.3, Indeed: 4.1 }
};

const adjustRating = (baseRating, companyName, platformName, platformSeed) => {
  const name = companyName.toLowerCase().trim();
  
  // If we have real data for this company and platform, use it directly!
  if (REAL_DATA[name] && REAL_DATA[name][platformName]) {
    return REAL_DATA[name][platformName];
  }

  // Otherwise, fallback to the dynamic mathematical offset
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  
  const offset = ((sum + platformSeed) % 5) * 0.5 - 1.0; 
  let newRating = baseRating + offset;
  newRating = Math.round(newRating * 2) / 2;
  return Math.max(1, Math.min(5, newRating));
};

module.exports = { adjustRating };
