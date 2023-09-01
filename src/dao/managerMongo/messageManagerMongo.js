import messageModel from "../models/messages.model.js";

export default class MessageManager{

    getMessages = async () => {
        try{
            const messages = await messageModel.find().lean().exec()
            return messages
        }catch(error){
            return error
        }
    }

    createMessage = async (message) =>{
        try{
            await messageModel.create(message)
            return message
        }catch(error){
            return error
        }
    }
}