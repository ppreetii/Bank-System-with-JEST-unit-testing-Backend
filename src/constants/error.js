module.exports = {
    BAD_REQUEST :{
        errorCode: 1001,
        statusCode: 400, 
        message: 'Bad Request'
    },
    INTERNAL_SERVER_ERROR :{
        errorCode: 1002,
        statusCode: 500, 
        message: 'Internal Server Error'
    },
    USER_EXIST_ERROR :{
        errorCode: 1003,
        statusCode: 400,
        message: "Email already in use"
    },
    ACCOUNT_CREATION_ERROR :{
        errorCode: 1004,
        statusCode: 500,
        message: "Failed to create bank acount for user."
    },
    USER_CREATION_ERROR :{
        errorCode: 1004,
        statusCode: 500,
        message: "Failed to create user."
    },
    VALIDATION_ERROR :{
        errorCode: 1005,
        statusCode: 400, 
        message: 'Validation Error'
    },
    USER_NOT_FOUND_ERROR :{
        errorCode: 1006,
        statusCode: 404, 
        message: 'User Not Found'
    },
    ACCOUNT_DETAILS_FIND_ERROR :{
        errorCode: 1007,
        statusCode: 500, 
        message: 'Failed to FIND account details of user'
    },
    ACCOUNT_DETAILS_UPDATE_ERROR :{
        errorCode: 1008,
        statusCode: 500, 
        message: 'Failed to UPDATE account details of user'
    },
    LOW_BALANCE_ERROR :{
        errorCode: 1009,
        statusCode: 400, 
        message: 'Insufficient balance'
    },
    TRANSACTION_CREATION_ERROR :{
        errorCode: 1010,
        statusCode: 500, 
        message: 'Failed to create transaction'
    }
}