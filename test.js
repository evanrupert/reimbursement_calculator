const { DateTime } = require('luxon');
const { calculateReimbursement } = require('./calculator');

describe('Reimbursement Calculator', () => {
  // Example Set 1
  it('should calculate reimbursement for a single project', () => {
    const result = calculateReimbursement([{
      startDate: DateTime.local(2015, 9, 1),
      endDate: DateTime.local(2015, 9, 3),
      cityCost: 'Low',
    }]);

    expect(result).toBe(45 + 75 + 45);
  });

  // Example Set 2
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

    expect(result).toBe(45 + 85 + 85 + 85 + 85 + 85 + 75 + 45);
  });

  // Example Set 3
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

    expect(result).toBe(45 + 75 + 45 + 55 + 85 + 85 + 55);
  });

  // Example Set 4
  it('should correctly calculate when a travel day has multiple overlapping projects', () => {
    const result = calculateReimbursement([
      {
        startDate: DateTime.local(2015, 9, 1),
        endDate: DateTime.local(2015, 9, 1),
        cityCost: 'Low',
      },
      {
        startDate: DateTime.local(2015, 9, 1),
        endDate: DateTime.local(2015, 9, 1),
        cityCost: 'Low',
      },
      {
        startDate: DateTime.local(2015, 9, 2),
        endDate: DateTime.local(2015, 9, 2),
        cityCost: 'High',
      },
      {
        startDate: DateTime.local(2015, 9, 2),
        endDate: DateTime.local(2015, 9, 3),
        cityCost: 'High',
      },
    ]);

    expect(result).toBe(45 + 85 + 55);
  });

  // Additional test cases

  it('should calculate reimbursement for projects spanning over multiple months', () => {
    const result = calculateReimbursement([
      {
        startDate: DateTime.local(2015, 9, 1),
        endDate: DateTime.local(2015, 11, 1),
        cityCost: 'Low',
      },
      {

        startDate: DateTime.local(2015, 10, 3),
        endDate: DateTime.local(2015, 10, 4),
        cityCost: 'High',
      },
    ]);

    // 62 days total, 2 travel low cost, 58 full low cost, 2 full high cost
    expect(result).toBe((2 * 45) + (58 * 75) + (2 * 85));
  });

  it('should throw an exception if given project has an invalid city cost value', () => {
    const set = [{
      startDate: DateTime.local(2015, 9, 1),
      endDate: DateTime.local(2015, 11, 1),
      cityCost: 'Medium',
    }];

    expect(() => calculateReimbursement(set)).toThrow(new Error('Invalid city cost'));
  });

  it('should throw an exception if given project has an endDate before its startDate', () => {
    const set = [{
      startDate: DateTime.local(2015, 9, 2),
      endDate: DateTime.local(2015, 9, 1),
      cityCost: 'Low',
    }];

    expect(() => calculateReimbursement(set)).toThrow(new Error('endDate cannot come before startDate'));
  });
});
