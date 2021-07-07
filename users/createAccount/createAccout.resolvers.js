import bcrypt from "bcrypt";
import client from "../../client";

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
            return {
                ok:false,
                error:"Can't create account"
            }
        }
        },

    }
}