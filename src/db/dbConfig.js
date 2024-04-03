import mongoose from "mongoose";

export async function connect(){
    try{
           mongoose.connect(process.env.MONGO_URI);
           const connection = mongoose.connection ;

           connection.on('connected' , ()=>{
               console.log("mongodb connected successfuly");
           })
           
           connection.on('error' , (err)=>{
                 console.log('Mongodb connection errror !' + err);
                 process.exit();
           })
           
    }catch(error){
        console.log("something have an error" + error.message);
    }
}