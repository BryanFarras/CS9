const storeController = require('../controllers/store.controller.js');
const express = require('express');
const router = express.Router();

router.get('/getAll', storeController.getAllStores);
router.get('/:id', storeController.getStoreID);
router.delete('/:id', storeController.deleteStoreID);
router.post('/create', storeController.createStore);
router.put('/', storeController.putStore);


module.exports = router;
