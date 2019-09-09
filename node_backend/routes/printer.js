var express = require('express');
var router = express.Router();
var printers = require('../controllers/printers')

// Routes related to printer

router.get('/',printers.index);
router.post('/',validate_add,printers.post);
router.put('/',validate_update,printers.put);
router.get('/:id', printers.get);
router.delete('/:id', printers.remove);
module.exports = router;
