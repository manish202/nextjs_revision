const validateZodResult = (schema,input) => {
    const {success,error,data} = schema.safeParse(input);
    if(!success){
        const err = error.issues.reduce((prev,cur) => {
            prev[cur.path[0]] = cur.message;
            return prev;
        },{});
        return {success,error:err};
    }
    return {success,data};
}

export default validateZodResult;