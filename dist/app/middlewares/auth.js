"use strict";
const TUserRole = {
    ADMIN: 'admin',
    USER: 'user'
};
const auth = (...requiredFields) => {
    console.log(requiredFields);
};
auth();
