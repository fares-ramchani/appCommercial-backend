import Family from "../../Model/familyModel/Family";
import { Request, Response } from "express";

const createFamily = async (req: Request, res: Response) => {
    try {
        const family = new Family(req.body)
        await family.save()
        return res.status(201).json({
            msg: "Family created successfully!",
            success: true,
            data: { family }
        });

    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const deleteFamily = async (req: Request, res: Response) => {
    try {
        const { code } = req.params
        const family = await Family.findOneAndDelete({ code })
        if (!family) {
            return res.status(404).json({ success: false, message: 'Family not found' });
        }
        return res.status(200).json({
            msg: "Family deleted successfully!",
            success: true,
        });
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }

}
const updateFamily = async (req: Request, res: Response) => {
    try {
        const { code } = req.params
        const updatedFamily = await Family.findOneAndUpdate(
            { code },
            { $set: req.body },
            { new: true }
        )
        if (!updatedFamily) {
            return res.status(404).json({ success: false, message: 'Family not found' });
        }
        return res.status(200).json({
            msg: "Family does update successfully!",
            success: true,
            data: { family: updatedFamily }
        });
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const getAllFamilies = async (req: Request, res: Response) => {
    try {
        const families = await Family.find({})
        return res.status(200).json({
            msg: "Families does got successfully!",
            success: true,
            data: { families }
        });
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const getFamilyByCode = async (req: Request, res: Response) => {
    try {
        const { code } = req.params
        const family = await Family.findOne({ code })
        if (!family) {
            return res.status(404).json({ success: false, message: 'Family not found' });
        }
        return res.status(200).json({
            msg: "Family does got successfully!",
            success: true,
            data: { family }
        });
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const getFamiliesByPagination = async (req: Request, res: Response) => {
    try {
        const { page, perPage } = req.body
        const skipCount = (page - 1) * perPage;
        const families = await Family.find({})
            .skip(skipCount)
            .limit(perPage)

        return res.status(200).json({
            msg: "Families does got successfully!",
            success: true,
            data: { families }
        });

    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}


const printingFamilies = async (req: Request, res: Response) => {
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

        const printing = await Family.find({ code: { $gte: fromCode, $lte: toCode }, ...filter })
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
            msg: "Families does got successfully!",
            success: true,
            data: { families: printing }
        });

    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const getFamiliesByProjection = async (req: Request, res: Response) => {
    try {
        const families = await Family.aggregate([
            {
                $group: {
                    _id: {
                        priceCalculationOn: "$priceCalculationOn",
                        minimumViablePriceOn: "$minimumViablePriceOn",
                        accountingAccount: "$accountingAccount",
                        accountTitle: "$accountTitle",
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    priceCalculationsOn: { $addToSet: "$_id.priceCalculationOn" },
                    minimumViablePricesOn: { $addToSet: "$_id.minimumViablePriceOn" },
                    accountingAccounts: { $addToSet: "$_id.accountingAccount" },
                    accountTitles: { $addToSet: "$_id.accountTitle" },
                }
            },
            {
                $project: {
                    _id: 0,
                    priceCalculationOn: "$priceCalculationsOn",
                    minimumViablePriceOn: "$minimumViablePricesOn",
                    accountingAccount: "$accountingAccounts",
                    accountTitle: "$accountTitles",
                }
            }
        ]);
        return res.status(200).json({
            msg: "Families does got successfully!",
            success: true,
            data: { families }
        });

    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}


export { createFamily, deleteFamily, updateFamily, getAllFamilies, getFamilyByCode, getFamiliesByPagination, printingFamilies, getFamiliesByProjection }
