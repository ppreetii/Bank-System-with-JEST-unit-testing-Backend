class AppError extends Error {
    constructor(Error) {
      super(Error.message)
      
      this.error = {
        code : Error.errorCode,
        status : Error.statusCode,
        message : Error.message
      }
      
      if(Error.error){
        this.error.error = Error.error
      }
    }
}

module.exports = {
    AppError
}