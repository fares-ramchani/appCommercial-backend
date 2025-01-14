import Store from "../../Model/storeController/Store";
import { Request, Response } from "express";

const createStore = async (req: Request, res: Response) => {
    try {
        const store = new Store(req.body)
        await store.save()
        return res.status(201).json({
            msg: "Store created successfully!",
            success: true,
            data: { store }
        });

    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}
const deleteStore = async (req: Request, res: Response) => {
    try {
        const { code } = req.params
        const store = await Store.findOneAndDelete({ store: code })
        if (!store) {
            return res.status(404).json({ success: false, message: 'Store not found' });
        }
        return res.status(200).json({
            msg: "Store deleted successfully!",
            success: true,
        });
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const getAllStores = async (req: Request, res: Response) => {
    try {
        const stores = await Store.find({})
        return res.status(200).json({
            msg: "Stores does got successfully!",
            success: true,
            data: { stores }
        });
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const updateStore = async (req: Request, res: Response) => {
    try {
        const { code } = req.params
        const updatedStore = await Store.findOneAndUpdate(
            { store: code },
            { $set: req.body },
            { new: true }
        )
        if (!updatedStore) {
            return res.status(404).json({ success: false, message: 'Store not found' });
        }
        return res.status(200).json({
            msg: "Store does update successfully!",
            success: true,
            data: { store: updatedStore }
        });
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const getStoreByCode = async (req: Request, res: Response) => {
    try {
        const { code } = req.params
        const store = await Store.findOne({ store: code })
        if (!store) {
            return res.status(404).json({ success: false, message: 'Store not found' });
        }
        return res.status(200).json({
            msg: "Store does got successfully!",
            success: true,
            data: { store }
        });
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}
const getStoresByPagination = async (req: Request, res: Response) => {
    try {
        const { page, perPage } = req.body
        const skipCount = (page - 1) * perPage;
        const stores = await Store.find({})
            .skip(skipCount)
            .limit(perPage)

        return res.status(200).json({
            msg: "Stores does got successfully!",
            success: true,
            data: { stores }
        });

    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

export { createStore, deleteStore, getAllStores, updateStore, getStoreByCode, getStoresByPagination }