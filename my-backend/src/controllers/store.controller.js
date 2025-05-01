const storeRepository = require('../repositories/store.repository.js');
const baseResponse = require('../utils/baseResponse.js');

exports.getAllStores = async (req, res) => {
    try {
        const stores = await storeRepository.getAllStores();
        baseResponse(res, true, 200, "Retrieving all ID Success", stores);
    }
    catch (error) {
        baseResponse(res, false, 500, error);
    }
};

exports.createStore = async (req, res) => {
    if(!req.body.name || !req.body.address) {
        return baseResponse(res, false, 400, "Bad request", req.body);
    }

    try {
        const store = await storeRepository.createStore(req.body);
        baseResponse(res, true, 201, "Creating store success", store);
    }
    catch (error) {
        baseResponse(res, false, 500, error.message || "Internal server error", error);
    }
};

exports.getStoreID = async (req, res) => {
    if (!req.params.id) {
        return baseResponse(res, false, 400, "Bad request");
    }
    try {
        const store = await storeRepository.getStoreID(req.params.id);

        if (!store) {
            return baseResponse(res, false, 404, "Store not found");
        }

        return baseResponse(res, true, 200, "Store found", store);
    }
    catch (error) {
        return baseResponse(res, false, 500, error.message || "Internal server error", error);
    }
};

exports.putStore = async (req, res) => {
    if(!req.body.name || !req.body.address) {
        return baseResponse(res, false, 400, "Bad request");
    }

    try {
        const store = await storeRepository.putStore(req.body);
        baseResponse(res, true, 200, "Updating by ID Success", store);
    }
    catch (error) {
        baseResponse(res, false, 500, error.message || "Internal server error", error);
    }
};

exports.deleteStoreID = async (req, res) => {
    try {
        const store = await storeRepository.deleteStoreID(req.params.id);
        baseResponse(res, true, 200, "Deleting by ID Success", store);
    }
    catch (error) {
        baseResponse(res, false, 500, error.message || "Internal server error", error);
    }
}
