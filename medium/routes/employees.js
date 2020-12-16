// import required essentials
const express = require('express');
// create new router
const router = express.Router();

// create a JSON data array
let data = [
    { employeeID: 1, name: 'Pharrell',   department: 'artist', salary: "$1"},
    { employeeID: 2, name: 'Jay-Z',      department: 'artist', salary: "$1"},
    { employeeID: 3, name: 'Beyonce',    department: 'artist', salary: "$1"},
    { employeeID: 4, name: 'Mos Def',    department: 'artist', salary: "$1"},
    { employeeID: 5, name: 'H.E.R.',     department: 'artist', salary: "$1" },
];


router.get('/', function (req, res) {
    res.status(200).json(data);
});


router.get('/:id', function (req, res) {
    
    let found = data.find(function (employee) {
        return employee.employeeID === parseInt(req.params.employeeID);
    });
   
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

//Add an employee
router.post('/', function (req, res){
    let newID = data.map(employee => employee.employeeID)

    let departmentName = data.map(employee = employee.department)

    let newEmployee = {
        employeeID: newID,
        name: req.body.name,
        department: req.body.department,
        salary: '$1'
    }

    data.push(newEmployee)

    res.status(201).json(newEmployee)
})

//update info
router.put('/:employeeID', function (req, res){

    let found = data.find(function (employee) {
        return employee.employeeID === parseInt(req.params.employeeID)
    })

    if(found){
        let updated = {
            employeeID: found.employeeID,
            name: req.body.name,
            department: req.body.department,
            salary: '$1'

        }

        let targetIndex = data.indexOf(found)

        data.splice(targetIndex, 1, updated)

        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

//delete employee
router.delete('/:employeeID', function (req, res){
    let found = data.find(function (employee) {
        return employee.employeeID === parseInt(req.params.employeeID)
    })

    if(found) {
        let targetIndex = data.indexOf(found)

        data.splice(targetIndex, 1)
    }

    res.sendStatus(204)
})


module.exports = router;