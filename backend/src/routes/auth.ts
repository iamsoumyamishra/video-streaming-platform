import express from "express";
import { VerifyUserSignUp, VerifyUserSignIn } from "../lib/verification.ts";
import type { UserSignUpType, UserSignInType } from "../types/zod.ts";
import User from "../models/User.ts";
import jwt from "jsonwebtoken"
import { jwt_secret_key } from "../index.ts";
import bcrypt from "bcrypt"

const auth = express.Router();

auth.route('/user')

    .post(async (req, res) => {

        // Parse the payload
        let { action } = req.body;

        if (action === "registration") {
            let payload: UserSignUpType = req.body

            try {
                payload = VerifyUserSignUp.parse(payload)

            } catch (error) {
                return res.status(400).json({ success: false, msg: error })
            }

            try {

                // Check if the user already exists
                let user = await User.findOne({
                    email: payload.email
                })

                if (user) {
                    return res.status(400).json({
                        success: false,
                        msg: "user already exists"
                    })
                }

                const hashedPassword = await bcrypt.hash(payload.password, 10);

                // Create User
                user = await User.create({ ...payload, password: hashedPassword });


                // JWT token
                let token = jwt.sign({
                    id: user._id,
                    name: user.name,
                    email: user.email
                }, jwt_secret_key);

                return res.json({
                    success: true,
                    msg: "user created!",
                    authToken: token
                })
            } catch (error) {

                console.log(error)
                // Return error if occured
                return res.json({
                    success: false,
                    msg: "Internal Server Error"
                }).status(500)
            }
        } else {

            let payload: UserSignInType = req.body

            try {
                payload = VerifyUserSignIn.parse(payload);
            } catch (error) {
                return res.status(400).json({ success: false, msg: error })
            }

            try {
                let user = await User.findOne({
                    email: payload.email
                });

                if (!user) {
                    return res.status(400).json({
                        success: false, msg: "user does not exists"
                    })
                }

                const comparePassword = await bcrypt.compare(payload.password, user.password);

                if (!comparePassword) {
                    return res.status(400).json({
                        success: false,
                        msg: "incorrect password"
                    })
                }

                const token = jwt.sign({
                    id: user._id,
                    name: user.name,
                    email: user.email
                }, jwt_secret_key);


                return res.json({
                    success: true,
                    msg: "logged in!",
                    authToken: token
                })

            } catch (error) {
                console.log(error);
                return res.json({
                    success: false,
                    msg: "Internal Server Error"
                }).status(500)
            }
        }

    })

    .get(async (req, res) => {
        
        const authToken = req.headers["auth-token"];

        if (!authToken || !(typeof authToken === "string")) {
            return res.status(401).json({
                success: false,
                msg: "unauthorized"
            })
        }

        try {

            const data = jwt.verify(authToken, jwt_secret_key);
            
            return res.json({
                success: true,
                msg: "user fetched",
                data: data
            })
            
        } catch {
            return res.status(401).json({
                success: false,
                msg: "invalid token"
            })
        }
    })


export default auth;