const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const { Printer } = require('../models');
global.isEmpty = (str) => {
  if (str) {
    return str.replace(/^\s+/g, '').length;
  } else {
    return 0
  }
}
global.ValidateIPaddress = (ipaddress)=>{  
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
    return true
  }   
  return false  
}  
global.validate_add =[
	 check('name')
    .exists().withMessage('name field is required')
    .custom(value => {
       return Printer.findOne({ where: { name: value } }).then(printer => {
        if (printer) {
          throw new Error('This name already in use');
        }

      })
    }),
  check('printer_ip')
    .exists().withMessage('Printer IP field is required')
    .custom(value => {
      return Printer.findOne({ where: { printer_ip: value } }).then(printer => {
        if (printer) {
          throw new Error('This Printer IP already in use');
        }else if (ValidateIPaddress(value) == false) {
          throw new Error('Invalid Printer IP supplied');
           
        }

      })
    }),
  check('status')
    .exists().withMessage('status field is required')
    
]
global.validate_update =[
 	check('id')
    .exists().withMessage('id field is required')
    .custom(value => {
       return Printer.findOne({ where: { id: value } }).then(printer => {
        if (!printer) {
          throw new Error('Printer with supplied id does not exists');
        }

      })
    }),
	 check('name')
    .exists().withMessage('name field is required')
    .custom(value => {
      if (isEmpty(value) == 0) {
        throw new Error('name field is required');
        return false
      } else {
        return true
      }
    }),
  check('printer_ip')
    .exists().withMessage('Printer IP field is required')
    .custom(value => {
      if (ValidateIPaddress(value) == false) {
        throw new Error('Invalid Printer IP supplied');
        return false
      } else {
        return true
      }
    }),
  check('status')
    .exists().withMessage('status field is required')
    
]