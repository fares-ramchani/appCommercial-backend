import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken"

const Authentification = (req: any, res: Response, next: NextFunction) => {
    try {
        // check ac token
        const token = req.header("token");
        if (!token) return res.status(401).json({ msg: "Authentification failed! No Token found.", success: false });

        // validate
        jwt.verify(token, process.env.SIGNIN_TOKEN as string, (err: any, user: any) => {
            if (err) return res.status(401).json({ msg: "Authentification failed! Invalid Token." });
            // success
            req.user = user;
            next();
        });
    } catch (err: any) {
        res.status(401).json({ msg: err.message, success: false });
    }
};

export {Authentification}