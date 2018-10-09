export function getGenders() {
  return [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'none', label: "I'd rather not say", displayLabel: '' }
  ];
}

export function getGenderDisplay(gender) {
  let obj = getGenders().find(({ value }) => value === gender);
  if (obj) {
    return obj.displayLabel || obj.label;
  }
}

export function getMovieGenres() {
  return [
    { value: 'action', label: 'Action' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'gangster', label: 'Gangster' },
    { value: 'drama', label: 'Drama' },
    { value: 'historical', label: 'Epic/Historical' },
    { value: 'horror', label: 'Horror' },
    { value: 'musical', label: 'Musical' },
    { value: 'scifi', label: 'Sci-fi' },
    { value: 'war', label: 'War/Anti-war' },
    { value: 'western', label: 'Western' }
  ];
}

export function getMovieGenreDisplay(movieGenre) {
  let obj = getMovieGenres().find(({ value }) => value === movieGenre);
  if (obj) {
    return obj.label;
  }
}

export function getNeighborhoods() {
  return [
    {
      groupName: 'Central Seattle',
      options: [
        { value: 'belltown', label: 'Belltown' },
        { value: 'broadmoor', label: 'Broadmoor' },
        { value: 'capHill', label: 'Capitol Hill' },
        { value: 'centralDist', label: 'Central District' },
        { value: 'dennyBlaine', label: 'Denny-Blaine' },
        { value: 'downtown', label: 'Downtown' },
        { value: 'eastlake', label: 'Eastlake' },
        { value: 'firstHill', label: 'First Hill' },
        { value: 'intlDist', label: 'International District' },
        { value: 'leschi', label: 'Leschi' },
        { value: 'madisonPark', label: 'Madison Park' },
        { value: 'madisonValley', label: 'Madison Valley' },
        { value: 'madrone', label: 'Madrona' },
        { value: 'montlake', label: 'Montlake' },
        { value: 'pioneerSquare', label: 'Pioneer Square' },
        { value: 'slu', label: 'South Lake Union' }
      ]
    },
    {
      groupName: 'Northeast Seattle',
      options: [
        { value: 'bryant', label: 'Bryant' },
        { value: 'hawthorneHills', label: 'Hawthorne Hills' },
        { value: 'lakeCity', label: 'Lake City' },
        { value: 'laurelhurst', label: 'Laurelhurst' },
        { value: 'mapleLeaf', label: 'Maple Leaf' },
        { value: 'matthewsBeach', label: 'Matthews Beach' },
        { value: 'northgate', label: 'Northgate' },
        { value: 'ravenna', label: 'Ravenna' },
        { value: 'roosevelt', label: 'Roosevelt' },
        { value: 'uDist', label: 'U-District' },
        { value: 'viewRidge', label: 'View Ridge' },
        { value: 'wedgewood', label: 'Wedgwood' },
        { value: 'widermere', label: 'Windermere' }
      ]
    },
    {
      groupName: 'Northwest Seattle',
      options: [
        { value: 'ballard', label: 'Ballard' },
        { value: 'northBeach', label: 'Blue Ridge/North Beach' },
        { value: 'broadview', label: 'Broadview' },
        { value: 'crownHill', label: 'Crown Hill' },
        { value: 'fremont', label: 'Fremont' },
        { value: 'greenlake', label: 'Greenlake' },
        { value: 'greenwood', label: 'Greenwood' },
        { value: 'hallerLake', label: 'Haller Lake' },
        { value: 'loyalHeights', label: 'Loyal Heights' },
        { value: 'magnolia', label: 'Magnolia' },
        { value: 'phinneyRidge', label: 'Phinney Ridge' },
        { value: 'queenAnne', label: 'Queen Anne' },
        { value: 'wallingford', label: 'Wallingford' },
        { value: 'westlake', label: 'Westlake' },
        { value: 'whittierHeights', label: 'WhittierHeights' }
      ]
    },
    {
      groupName: 'South Seattle',
      options: [
        { value: 'beaconHill', label: 'Beacon Hill' },
        { value: 'columbiaCity', label: 'Columbia City' },
        { value: 'georgetown', label: 'Georgetown' },
        { value: 'mountBaker', label: 'Mount Baker' },
        { value: 'rainierBeach', label: 'Rainier Beach' },
        { value: 'sewardPark', label: 'Seward Park' },
        { value: 'southPark', label: 'South Park' },
      ]
    },
    {
      groupName: 'West Seattle',
      options: [
        { value: 'admiral', label: 'Admiral' },
        { value: 'alki', label: 'Alki' },
        { value: 'fauntleroy', label: 'Fauntleroy' },
        { value: 'junction', label: 'Junction' },
      ]
    }
  ];
}

export function getNeighborhoodDisplay(neighborhood) {
  for (let { options } of getNeighborhoods()) {
    let found = options.find(({ value }) => value === neighborhood);
    if (found) {
      return found.label;
    }
  }
}

export function getSubstances() {
  return [
    { value: 'alcohol', label: 'Alcohol' },
    { value: 'tobacco', label: 'Tobacco' },
    { value: 'marijuana', label: 'Marijuana' },
    { value: 'illicit', label: 'Illict Substances' },
  ];
}

export function getSubstancesDisplay(substances = []) {
  let labels = [];
  substances.forEach((substance) => {
    let obj = getSubstances().find(({ value }) => value === substance);
    labels.push(obj.label);
  });
  return labels.join(', ') || 'none';
}
