const { DateTime } = require('luxon');
const { calculateReimbursement } = require('./index');

describe('Reimbursement Calculator', () => {
  it('should calculate reimbursement for a single project', () => {
    const result = calculateReimbursement([{
      startDate: DateTime.local(2015, 9, 1),
      endDate: DateTime.local(2015, 9, 3),
      cityCost: 'Low',
    }]);

    expect(result).toBe(165);
  });

  it('should calculate reimbursement for multiple projects', () => {
    const result = calculateReimbursement([
      {
        startDate: DateTime.local(2015, 9, 1),
        endDate: DateTime.local(2015, 9, 3),
        cityCost: 'Low',
      },
      {
        startDate: DateTime.local(2015, 9, 5),
        endDate: DateTime.local(2015, 9, 7),
        cityCost: 'High',
      },
      {
        startDate: DateTime.local(2015, 9, 8),
        endDate: DateTime.local(2015, 9, 8),
        cityCost: 'High',
      },
    ]);

    expect(result).toBe(445);
  });

  it('should calculate correctly with overlapping projects that have different costs', () => {
    const result = calculateReimbursement([
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
    ]);

    expect(result).toBe(590);
  });
});
