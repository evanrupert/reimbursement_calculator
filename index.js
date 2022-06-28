const { DateTime } = require('luxon');

const FULL_DAY_COST = {
  Low: 75,
  High: 85,
};

const TRAVEL_DAY_COST = {
  Low: 45,
  High: 55,
};

function isFullDay(activeDates, date) {
  const previousDayInSeconds = date.minus({ days: 1 }).toSeconds();
  const nextDayInSeconds = date.plus({ days: 1 }).toSeconds();

  return activeDates.has(previousDayInSeconds) && activeDates.has(nextDayInSeconds);
}

function convertProjectListToDateMap(set) {
  const activeDates = new Map();

  // Loop over each project and flatten all active dates (dates between start and end)
  //    of all projects into a single map to handle any overlapping
  set.forEach((project) => {
    let date = project.startDate;
    while (date <= project.endDate) {
      const dateInSeconds = date.toSeconds();

      // If this date has a previous entry and this project is a high cost project,
      //    replace the previous entry's cost with high
      if (activeDates.has(dateInSeconds)) {
        if (project.cityCost === 'High') {
          activeDates.set(dateInSeconds, 'High');
        }
      } else {
        activeDates.set(dateInSeconds, project.cityCost);
      }

      date = date.plus({ days: 1 });
    }
  });

  return activeDates;
}

exports.calculateReimbursement = (set) => {
  if (set.length === 0) {
    return 0;
  }

  const activeDates = convertProjectListToDateMap(set);

  let totalCost = 0;

  activeDates.forEach((cost, dateInSeconds) => {
    const date = DateTime.fromSeconds(dateInSeconds);

    const fullDay = isFullDay(activeDates, date);

    console.log(`${date.toString()}: ${fullDay ? 'Full' : 'Travel'}, ${cost}`);

    totalCost += fullDay ? FULL_DAY_COST[cost] : TRAVEL_DAY_COST[cost];
  });

  return totalCost;
};
