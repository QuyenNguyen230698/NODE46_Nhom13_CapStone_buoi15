export const responseSuccess = (data, message = "Success", code = 200) => {
    return {
        data,
        message,
        code
    };
};

export const responseError = (error, message = "Error", code = 500) => {
    return {
        error,
        message,
        code
    };
};

export const responseNotFound = (message = "Not Found", code = 404) => {
    return {
        error: "Not Found",
        message,
        code
    };
};

export const responseUnauthorized = (message = "Unauthorized", code = 401) => {
    return {
        error: "Unauthorized",
        message,
        code
    };
};

export const responseForbidden = (message = "Forbidden", code = 403) => {
    return {
        error: "Forbidden",
        message,
        code
    };
};

export const responseBadRequest = (message = "Bad Request", code = 400) => {
    return {
        error: "Bad Request",
        message,
        code
    };
};
