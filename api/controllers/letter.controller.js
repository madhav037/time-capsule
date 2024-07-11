import { supabase } from "../index.js"
import { emailModel } from "../Models/email.model.js"

export const addLetter = async (req,res,next) => {
    const  {body, dateWritten, dateToRecieve, visibility, email, userID} = req.body
    const emailData = {...emailModel, body:body, dateWritten:dateWritten, dateToRecieve:dateToRecieve, visibility:visibility, email:email, userID:userID===undefined ? null : userID}
    try {
        const {error : addLetterError} = await supabase
        .from('email')
        .insert(emailData)
        
        if (addLetterError) throw  addLetterError
        res.send(emailData)
    }catch(err) {
        if (err.code == 23505){
            res.send("ERROR-addLetter : email alreay exists")
        }
    }
}

export const viewPublicLetters = async (req,res) => {
    try {
        const {data, error} = await supabase
        .from('email')
        .select()
        .eq('visibility','false')
        
        if(error) throw error
        res.send(data)
    }catch (err) {
        console.log("ERROR-viewPublicLetters",err)
    }
}