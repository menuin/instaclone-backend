import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils"
import { processHashtags } from "../photos.utils";

export default {
    Mutation: {
        uploadPhoto: protectedResolver(async (_, { file, caption }, { loggedInUser }) => {
            let hashtagObj = [];

            if (caption) {
                // parse caption
                hashtagObj = processHashtags(caption);
            }

            const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
            // get or create Hashtags
            // save the photo with the parsed hashtags
            return client.photo.create({
                data: {
                    file: fileUrl,
                    caption,
                    user: {
                        connect: {
                            id: loggedInUser.id,
                        }
                    },
                    ...(hashtagObj.length > 0 && {
                        hashtags: {
                            connectOrCreate: hashtagObj,
                        }
                    })
                }
            })

        })
    }
}