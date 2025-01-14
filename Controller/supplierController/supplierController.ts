import { Request, Response } from "express";
import PDFDocument from 'pdfkit';

import Supplier from "../../Model/supplierModel/Supplier";

const createSupplier = async (req: Request, res: Response) => {
    try {
        const supplier = new Supplier(req.body)
        await supplier.save()
        return res.status(201).json({
            msg: "Supplier created successfully!",
            success: true,
            data: { supplier }
        });

    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const deleteSupplier = async (req: Request, res: Response) => {
    try {
        const { code } = req.params
        const supplier = await Supplier.findOneAndDelete({ code })
        if (!supplier) {
            return res.status(404).json({ success: false, message: 'Supplier not found' });
        }
        return res.status(200).json({
            msg: "Supplier deleted successfully!",
            success: true,
        });
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }

}

const getAllSupplliers = async (req: Request, res: Response) => {
    try {
        const suppliers = await Supplier.find({})
        return res.status(200).json({
            msg: "Suppliers does got successfully!",
            success: true,
            data: { suppliers }
        });
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const getSupplierByCode = async (req: Request, res: Response) => {
    try {
        const { code } = req.params
        const supplier = await Supplier.findOne({ code })
        if (!supplier) {
            return res.status(404).json({ success: false, message: 'Supplier not found' });
        }
        return res.status(200).json({
            msg: "Supplier does got successfully!",
            success: true,
            data: { supplier }
        });
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const getSuppliersByPagination = async (req: Request, res: Response) => {
    try {
        const { page, perPage } = req.body
        const skipCount = (page - 1) * perPage;
        const suppliers = await Supplier.find({})
            .skip(skipCount)
            .limit(perPage)

        return res.status(200).json({
            msg: "Suppliers does got successfully!",
            success: true,
            data: { suppliers }
        });

    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const printingSuppliers = async (req: Request, res: Response) => {
    try {
        const { city, country, activity, payment, postalCode, type, nature, bank, isVATSubject, isBlockedAccount, agent, sortQuery, fromCode, toCode } = req.body
        const filter: object = {
            ...(city && { city }),
            ...(country && { country }),
            ...(activity && { activity }),
            ...(payment && { payment }),
            ...(postalCode && { postalCode }),
            ...(type && { type }),
            ...(nature && { nature }),
            ...(bank && { bank }),
            ...(isVATSubject && { isVATSubject }),
            ...(isBlockedAccount && { isBlockedAccount }),
            ...(agent && { agent }),
        };
        if (!fromCode || !toCode || !sortQuery) {
            return res.status(400).json({
                msg: "Please fill in all the required fields before proceeding.",
                success: false,
            });
        }

        const printing = await Supplier.find({ code: { $gte: fromCode, $lte: toCode }, ...filter })
            .sort(sortQuery);

        // const doc = new PDFDocument();

        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'attachment; filename="suppliers.pdf"');

        // doc.pipe(res);

        // printing.forEach(item => {
        //     doc.text(`code: ${item.code}`);
        //     doc.moveDown();
        //     doc.text(`companyName: ${item.companyName}`);
        //     doc.moveDown();
        //     doc.text(`address: ${item.address}`);
        //     doc.moveDown();
        //     doc.moveDown();
        // });

        // doc.end();


        return res.status(200).json({
            msg: "Suppliers does got successfully!",
            success: true,
            data: { suppliers: printing }
        });

    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const getSuppliersByProjection = async (req: Request, res: Response) => {
    try {
        const suppliers = await Supplier.aggregate([
            {
                $group: {
                    _id: {
                        city: "$city",
                        postalCode: "$postalCode",
                        country: "$country",
                        activity: "$activity",
                        bank: "$bank",
                        payment: "$payment",
                        type: "$type",
                        nature: "$nature",
                        currency: "$currency",
                        agent: "$agent",
                        code: "$code",
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    cities: { $addToSet: "$_id.city" },
                    postalCodes: { $addToSet: "$_id.postalCode" },
                    countries: { $addToSet: "$_id.country" },
                    activities: { $addToSet: "$_id.activity" },
                    banks: { $addToSet: "$_id.bank" },
                    payments: { $addToSet: "$_id.payment" },
                    types: { $addToSet: "$_id.type" },
                    natures: { $addToSet: "$_id.nature" },
                    currencies: { $addToSet: "$_id.currency" },
                    agents: { $addToSet: "$_id.agent" },
                    codes: { $addToSet: "$_id.code" },
                }
            },
            {
                $project: {
                    _id: 0,
                    city: "$cities",
                    postalCode: "$postalCodes",
                    country: "$countries",
                    activity: "$activities",
                    bank: "$banks",
                    payment: "$payments",
                    type: "$types",
                    nature: "$natures",
                    currency: "$currencies",
                    agent: "$agents",
                    code: "$codes",
                }
            }
        ]);
        return res.status(200).json({
            msg: "Suppliers does got successfully!",
            success: true,
            data: { suppliers }
        });

    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const updateSupplier = async (req: Request, res: Response) => {
    try {
        const { code } = req.params
        const updatedSupplier = await Supplier.findOneAndUpdate(
            { code },
            { $set: req.body },
            { new: true }
        )
        if (!updatedSupplier) {
            return res.status(404).json({ success: false, message: 'Supplier not found' });
        }
        return res.status(200).json({
            msg: "Supplier does update successfully!",
            success: true,
            data: { supplier: updatedSupplier }
        });
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}
export { createSupplier, deleteSupplier, getAllSupplliers, getSupplierByCode, getSuppliersByPagination, printingSuppliers, getSuppliersByProjection, updateSupplier }