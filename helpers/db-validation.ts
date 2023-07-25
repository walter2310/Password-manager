import User from "../models/userModel";

export const verifyEmail = async( email = '' ) => {
    const checkEmail = await User.findOne({ email });
    if ( checkEmail ) {
        throw new Error(`The email: ${ email }, is already in use`);
    };
};

export const checkUserId = async( id = '') => {
    const checkUserId = await User.findById(id);
    
    if ( !checkUserId ) {
        throw new Error(`The id: ${ id } do not exist`);
    };
};

