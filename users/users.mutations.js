import bcrypt from "bcrypt";
import client from "../client";
import jwt from "jsonwebtoken";

export default {
    Mutation : {
        createAccount : async (_, { firstName,lastName,username,email,password}) => {
            try{
                // STEP 1 : check if username or email are already on db
                const existingUser = await client.user.findFirst({
                    where : {
                            OR : [
                                {
                                    username : username,
                                },
                                {
                                    email,
                                },
                            ],
                    },
                });
                if (existingUser){
                    throw new Error("This username/email is already taken.");
                }


                // STEP 2 : hash password
                const uglyPassword = await bcrypt.hash(password, 10);

                // STEP 3 : save and return the user
                return client.user.create({ data : {
                    username,
                    email, 
                    firstName, 
                    lastName, 
                    password : uglyPassword,
                }})
        } catch (e) {
            return e;
        }
        },

        login : async (_, {username, password} ) => {
            // find user with args.username
            const user = await client.user.findFirst({where:{username}});
            if (!user){
                return {
                    ok: false,
                    error : "User not found", 
                }
            }

            // check password with args.password
            const passwordOk = await bcrypt.compare(password, user.password)
            if (!passwordOk) {
                return  {
                    ok : false,
                    error : "Incorrect password",
                }
            }
            // issue a token and send it to user
            const token = await jwt.sign({id:user.id}, process.env.SECRET_KEY);
            return {
                ok:true,
                token : token,
            }
        }
    }
}