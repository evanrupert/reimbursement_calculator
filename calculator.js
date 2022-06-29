const { DateTime } = require('luxon');

const FULL_DAY_COST = {
  Low: 75,
  High: 85,
};

const TRAVEL_DAY_COST = {
  Low: 45,
  High: 55,
};

const CITY_COST = {
  HIGH: 'High',
  LOW: 'Low',
};

function validateProject(project) {
  if (!Object.values(CITY_COST).includes(project.cityCost)) {
    throw new Error('Invalid city cost');
  }

  if (project.startDate > project.endDate) {
    throw new Error('endDate cannot come before startDate');
  }
}

function isFullDay(workingDates, date) {
  // Check if previous and following days exist in map, if so, it is a full day
  const previousDayInSeconds = date.minus({ days: 1 }).toSeconds();
  const nextDayInSeconds = date.plus({ days: 1 }).toSeconds();

  return workingDates.has(previousDayInSeconds) && workingDates.has(nextDayInSeconds);
}

function convertProjectListToDateMap(set) {
  const workingDates = new Map();

  // Loop over each project and flatten all working dates (dates between start and end)
  //    of all projects into a single map to handle any overlapping projects
  set.forEach((project) => {
    let date = project.startDate;
    while (date <= project.endDate) {
      const dateInSeconds = date.toSeconds();

      // If this date has a previous entry and this project is a high cost project,
      //    replace the previous entry's cost with high
      if (workingDates.has(dateInSeconds)) {
        if (project.cityCost === CITY_COST.HIGH) {
          workingDates.set(dateInSeconds, CITY_COST.HIGH);
        }
      } else {
        workingDates.set(dateInSeconds, project.cityCost);
      }

      date = date.plus({ days: 1 });
    }
  });

  return workingDates;
}

exports.calculateReimbursement = (set) => {
  if (set.length === 0) {
    return 0;
  }

  set.forEach(validateProject);

  const workingDates = convertProjectListToDateMap(set);

  let totalCost = 0;

  workingDates.forEach((cityCost, dateInSeconds) => {
    const date = DateTime.fromSeconds(dateInSeconds);

    totalCost += isFullDay(workingDates, date)
      ? FULL_DAY_COST[cityCost]
      : TRAVEL_DAY_COST[cityCost];
  });

  return totalCost;
};
