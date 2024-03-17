

const getAllEmployees = (req, res) => {
  console.log('Get all employees');
}

const createEmployee = (req, res) => {
  //!!! Don't forget to check DB for duplicates
console.log('Create an employee');
}

const updateEmployee = (req, res) => {
  console.log('Update an employee');
}

const deleteEmployee = (req, res) => {
  console.log('Delete an employee');
}

const getOneEmployee = (req, res) => {
  console.log('Get an employee');
}


module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getOneEmployee
}