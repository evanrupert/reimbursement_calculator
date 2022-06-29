Reimbursement Calculator
-
### Setup
1. Make sure to have node and npm installed on your system
2. Clone the repository on to your local machine
3. Run `npm install`

### Testing arbitrary sets
To test the function with a set of your choice do the following:
1. Navigate to the bottom of the `index.js` file starting at line 86
2. Modify the `set` variable to contain your preferred project data using the following fields: `cityCost`, `startDate`
and `endDate`.
3. Run the command `npm start`, the total reimbursement cost of your set will then be displayed in the console.

### Running the test suite
All four of the example sets as well as a few other cases have been represented as tests in the `test.js` file.

Run the command `npm test` to run all tests.
