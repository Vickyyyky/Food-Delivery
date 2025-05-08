class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(); // this will call the constructor of parent class=> error
        this.message=message;
        this.statusCode=statusCode;
    }
}

module.exports=ErrorHandler;