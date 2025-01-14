import { Request, Response } from "express";
import User from "../../Model/userModel/User";
import bycrypt from "bcrypt"
import createToken from "../../Helpers/createToken";
const signin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        //Check if the username exists in the database
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                msg: "This username doesn't exist.",
                success: false,
            });
        }
        // check password
        const passwordCheck = await bycrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res
                .status(401)
                .json({ msg: "Incorrect password", success: false });
        }

        const signinToken = createToken.signinToken({ id: user._id })

        return res.status(200).json({
            msg: "Signed in successfully!",
            success: true,
            data: { user, token: signinToken },
        });

    } catch (err: any) {
        res.status(500).json({
            msg: err.message,
            success: false
        })
    }
}

export { signin }