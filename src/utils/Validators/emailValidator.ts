const emailValidator = (email: string) => { 
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}


export default emailValidator;