const itemRepository = require('../repositories/item.repository.js');
const baseResponse = require('../utils/baseResponse.js');
const cloudinary = require('../utils/cloudinary.js');

exports.createItem = async (req, res) => {
    try {
        const { name, price, store_id, stock } = req.body;
        let image_url = '';

    if (req.file) {
        await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) return reject(error);
            image_url = result.secure_url;
            resolve(result);
        });
            stream.end(req.file.buffer);
        });
    }

        const item = await itemRepository.createItem({ name, price, store_id, stock, image_url });
        return baseResponse(res, true, 201, 'Item created', item);
    } catch (err) {
        console.error(err);
        return baseResponse(res, false, 400, 'Store doesnt exist', null);
    }
};

exports.getAllItems = async (req, res) => {
    try {
        const items = await itemRepository.getAllItems();
        return baseResponse(res, true, 200, 'Items found', items);
    } catch (err) {
        return baseResponse(res, false, 400, err.message, null);
    }
};

exports.getItemById = async (req, res) => {
    try {
        const item = await itemRepository.getItemById(req.params.id);
        if (!item) return baseResponse(res, false, 404, 'Item not found', null);
        return baseResponse(res, true, 200, 'Item found', item);
    } catch (err) {
        return baseResponse(res, false, 400, err.message, null);
    }
};

exports.getItemsByStoreId = async (req, res) => {
    try {
        const items = await itemRepository.getItemsByStoreId(req.params.store_id);
        if (items.length === 0) return baseResponse(res, false, 404, 'Store doesnt exist', null);
        return baseResponse(res, true, 200, 'Items found', items);
    } catch (err) {
        return baseResponse(res, false, 400, err.message, null);
    }
};

/*
exports.updateItem = async (req, res) => {
    try {
    const { id, name, price, store_id, stock } = req.body;
    let image_url = req.body.image_url;

    const existingItem = await itemRepository.updateItem(id);
    if (!existingItem || existingItem.store_id !== store_id) {
        return baseResponse(res, false, 404, 'Item not found', null);
    }

    if (req.file) {
        await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) return reject(error);
            image_url = result.secure_url;
            resolve(result);
        });
        stream.end(req.file.buffer);
        });
    }

    const item = await itemRepository.updateItem({ id, name, price, store_id, stock, image_url });
    return baseResponse(res, true, 200, 'Item updated', item);

    } catch (err) {
    return baseResponse(res, false, 400, err.message, null);
    }
};
*/

exports.updateItem = async (req, res) => {
    try {
        const { id, name, price, store_id, stock } = req.body;
        let image_url = req.body.image_url;

        // Periksa apakah item ada
        const existingItem = await itemRepository.getItemById(id);
        if (!existingItem || existingItem.store_id !== store_id) {
            return baseResponse(res, false, 404, 'Item not found', null);
        }

        // Upload image kalau ada
        if (req.file) {
            await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) return reject(error);
                    image_url = result.secure_url;
                    resolve(result);
                });
                stream.end(req.file.buffer);
            });
        }

        // Update item
        const item = await itemRepository.updateItem({ id, name, price, store_id, stock, image_url });
        return baseResponse(res, true, 200, 'Item updated', item);

    } catch (err) {
        return baseResponse(res, false, 400, err.message, null);
    }
};

exports.deleteItem = async (req, res) => {
    try {
    const item = await itemRepository.deleteItem(req.params.id);
    if (!item) return baseResponse(res, false, 404, 'Item not found', null);
    return baseResponse(res, true, 200, 'Item deleted', item);
    } catch (err) {
    return baseResponse(res, false, 400, err.message, null);
    }
};
