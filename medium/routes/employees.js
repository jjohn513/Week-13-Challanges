const express = require('express');

const router = express.Router();


let data = [
    { employeeID: 1, name: 'Pharrell',   department: 'artist', salary: "$1"},
    { employeeID: 2, name: 'Jay-Z',      department: 'Vice President', salary: "$1"},
    { employeeID: 3, name: 'Beyonce',    department: 'artist', salary: "$1"},
    { employeeID: 4, name: 'Mos Def',    department: 'artist', salary: "$1"},
    { employeeID: 5, name: 'H.E.R.',     department: 'artist', salary: "$1" },
    { employeeID: 6, name: 'Baby Jesus', department: 'PR', salary: "$1" },
    { employeeID: 7, name: 'Swae Lee',   department: 'Marketing', salary: "$1" },
    { employeeID: 8, name: 'Stephen',    department: 'Analytics', salary: "$1" },
    { employeeID: 9, name: 'Loren',      department: 'President', salary: "$1,000,000" },
    { employeeID: 10, name: 'Jared',     department: 'CEO', salary: "$1,000,000" },
];


router.get('/', function (req, res) {
    res.status(200).json(data)
});


router.get('/:employeeID', function (req, res) {
    
    let found = data.find(function (employee) {
        return employee.employeeID === parseInt(req.params.employeeID);
    })
   
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
})

//Add an employee
router.post('/', function (req, res){
    let newID = data.map(employee => employee.employeeID)

    let departmentName = data.map(employee = employee.department)

    //Any employees added only get $1 sorry, not sorry, im running a business...
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


module.exports = router