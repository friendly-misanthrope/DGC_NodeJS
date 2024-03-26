// const Employees = require('../models/employee.model');

// const getAllEmployees = (req, res) => {
//   Employees.find()
//     .then((allEmployees) => {
//       res.json(allEmployees);
//     })
//     .catch(err => console.log(err));
// }

// const getOneEmployee = (req, res) => {
//   Employees.findOne({_id: req.params.id})
//     .then(emp => res.json(emp))
//     .catch(err => res.json(err))
// }

// const createEmployee = async (req, res) => {
//   try {
//     const potentialEmployee = await Employees.findOne({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName
//     })
//     if (potentialEmployee) {
//       res.status(418).json({error: "This employee already exists"})
//     } else {
//       const newEmployee = await Employees.create(req.body);
//       res.status(201).json(newEmployee);
//     }
//   } catch(err) {
//     console.log(err)
//     res.status(400).json({error: err, message: "Employee could not be created"})
//   }
// }

// const updateEmployee = (req, res) => {
//   Employees.findOneAndUpdate(
//     {_id: req.body._id},
//     req.body,
//     {new: true, runValidators: true}
//   )
//     .then(updatedEmployee => res.json(updatedEmployee))
//     .catch((err) => {
//       res.status(400).json({error: err, message: "Failed to update employee"})
//     });
// }

// const deleteEmployee = (req, res) => {
//   Employees.deleteOne({_id: req.params.id})
//     .then(result => res.json(result))
//     .catch(err => res.status(400).json(err));
// }




// module.exports = {
//   getAllEmployees,
//   getOneEmployee,
//   createEmployee,
//   updateEmployee,
//   deleteEmployee
// }