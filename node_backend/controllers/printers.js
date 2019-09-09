const {
    Printer,
} = require('../models')
const { validationResult } = require('express-validator/check');
module.exports = {
    async index(req, res) {
    	try{
	        let printers = await Printer.findAll()
	        res.status(201).send({ 'success': true,'data':printers })
	    }catch(err){
	      	res.status(400).send({ 'success': false, 'msg':"something went wrong"})
	    }
    },
     async post(req, res) {
     	const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return  res.status(400).send({ 'success': false, errors: errors.mapped() });
        }
    	try{
    		const {body} = req
	        let printer = await Printer.create(body)
	        res.status(201).send({ 'success': true,'data':printer })
	    }catch(err){
	      	res.status(400).send({ 'success': false, 'msg':"something went wrong"})
	    }
    },
    async put(req, res) {
     	const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return  res.status(400).send({ 'success': false, errors: errors.mapped() });
        }
    	try{
    		const {body} = req
	        let printer = await Printer.findOne({where:{
	        	id:body.id
	        }})
	        let existPrinter = await Printer.findOne({
                where: {
                    name: body.name
                }
            })
            let existPrinterip = await Printer.findOne({
                where: {
                    printer_ip: body.printer_ip
                }
            })
           
            if (existPrinter) {
                if (existPrinter.toJSON().id != printer.toJSON().id) {
                    return res.status(400).send({
                        'success': false, errors: {
                            'name': {
                                msg: 'Printer with this name already exist'
                            }
                        }
                    });
                }

            }
            if (existPrinterip) {
                if (existPrinterip.toJSON().id != printer.toJSON().id) {
                    return res.status(400).send({
                        'success': false, errors: {
                            'printer_ip': {
                                msg: 'Printer with this printer IP already exist'
                            }
                        }
                    });
                }

            }
            const results = await Printer.update(body, {
                where: {
                    id: body.id
                }
            })
	        res.status(201).send({ 'success': true,'mgs':"Printer has been updated successfully" })
	    }catch(err){
	      	res.status(400).send({ 'success': false, 'msg':"something went wrong"})
	    }
    },
    async get(req, res) {
    	try{
    		const { params } = req
	        let printer = await Printer.findOne({where:{id:params.id}})
	        if(!printer){
	        	return res.status(400).send({
                        'success': false, 'msg':'Invalid printer id supplied'
                    });
	        }
	        res.status(201).send({ 'success': true,'data':printer })
	    }catch(err){
	    	
	      	res.status(400).send({ 'success': false, 'msg':"something went wrong"})
	    }
    },
    async remove(req, res) {
    	try{
    		  const { params } = req
	        let printer = await Printer.findOne({where:{id:params.id}})
	        if(!printer){
	        	return res.status(400).send({
                        'success': false, 'msg':'Invalid printer id supplied'
                    });
	        }
	      
            await printer.destroy();

	        res.status(201).send({ 'success': true,'msg':'Printer has been successful deleted' })
	    }catch(err){
	      	res.status(400).send({ 'success': false, 'msg':"something went wrong"})
	    }
    },
};