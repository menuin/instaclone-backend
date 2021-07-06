import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protectedResolver } from "../users.utils";

export default {
    Mutation : {
        editProfile : protectedResolver (async (_,{firstName, lastName, username, email, password:newPassword},
            {loggedInUser, protectResolver}) => {
           
            let uglyPassword = null;
            if (newPassword){
                uglyPassword = await bcrypt.hash(newPassword, 10);
            }
            protectResolver(loggedInUser);
            const updatedUser = await client.user.update({
            where:{
                id:loggedInUser.id,
            }, 
            data:{
                firstName, 
                lastName, 
                username, 
                email, 
                ...(uglyPassword && {password:uglyPassword}),
            }});

            if (updatedUser.id) {
                return {
                    ok :true
                } 
            } else {
                return {
                    ok :false,
                    error : "Could not update profile"
                }
            }
        }
        )
    }
}