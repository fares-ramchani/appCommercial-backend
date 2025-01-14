import { Request, Response } from "express";

import Client from "../../Model/clientModel/Client";

const createClient = async (req: Request, res: Response) => {
    try {
        const client = new Client(req.body)
        await client.save()
        return res.status(201).json({
            msg: "Client created successfully!",
            success: true,
            data: { client }
        });

    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const deleteClient = async (req: Request, res: Response) => {
    try {
        const { code } = req.params
        const client = await Client.findOneAndDelete({ code })
        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }
        return res.status(200).json({
            msg: "Client deleted successfully!",
            success: true,
        });
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }

}

const getAllClients = async (req: Request, res: Response) => {
    try {
        const clients = await Client.find({})
        return res.status(200).json({
            msg: "Clients does got successfully!",
            success: true,
            data: { clients }
        });
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const getClientByCode = async (req: Request, res: Response) => {
    try {
        const { code } = req.params
        const client = await Client.findOne({ code })
        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }
        return res.status(200).json({
            msg: "Client does got successfully!",
            success: true,
            data: { client }
        });
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const getClientsByPagination = async (req: Request, res: Response) => {
    try {
        const { page, perPage } = req.body
        const skipCount = (page - 1) * perPage;
        const clients = await Client.find({})
            .skip(skipCount)
            .limit(perPage)

        return res.status(200).json({
            msg: "Clients does got successfully!",
            success: true,
            data: { clients }
        });

    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const printingClients = async (req: Request, res: Response) => {
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

        const printing = await Client.find({ code: { $gte: fromCode, $lte: toCode }, ...filter })
            .sort(sortQuery);

        // const doc = new PDFDocument();

        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'attachment; filename="clients.pdf"');

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
            msg: "Clients does got successfully!",
            success: true,
            data: { clients: printing }
        });

    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const getClientsByProjection = async (req: Request, res: Response) => {
    try {
        const clients = await Client.aggregate([
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
            msg: "Clients does got successfully!",
            success: true,
            data: { clients }
        });

    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

const updateClient = async (req: Request, res: Response) => {
    try {
        const { code } = req.params
        const updatedClient = await Client.findOneAndUpdate(
            { code },
            { $set: req.body },
            { new: true }
        )
        if (!updatedClient) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }
        return res.status(200).json({
            msg: "Client does update successfully!",
            success: true,
            data: { client: updatedClient }
        });
    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}
export { createClient, deleteClient, getAllClients, getClientByCode, getClientsByPagination, printingClients, getClientsByProjection, updateClient }