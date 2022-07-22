import { mongoose } from "mongoose";
import {MONGODB_URI} from './config';

export const dbConnection = () => {
    try { 
        mongoose.connect(MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } )
        console.log('Base de datos conectada');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos')   
    }
}
