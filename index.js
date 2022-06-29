const { DateTime } = require('luxon');
const { calculateReimbursement } = require('./calculator');

// Modify this to test any arbitrary set of projects
const set = [
  {
    startDate: DateTime.local(2015, 9, 1),
    endDate: DateTime.local(2015, 9, 1),
    cityCost: 'Low',
  },
  {
    startDate: DateTime.local(2015, 9, 2),
    endDate: DateTime.local(2015, 9, 6),
    cityCost: 'High',
  },
  {
    startDate: DateTime.local(2015, 9, 6),
    endDate: DateTime.local(2015, 9, 8),
    cityCost: 'Low',
  },
];

const result = calculateReimbursement(set);
console.log(`Result: ${result}`);
