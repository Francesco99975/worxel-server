enum AccountType {
    BUSINESS = 1,
    MANAGER = 2,
    EMPLOYEE = 3
}

interface AccountCredentials {
    email: string,
    password: string,
    name: string
}

interface LoginAccountCredentials {
    type: AccountType,
    email: string,
    password: string
}

export {AccountType, AccountCredentials, LoginAccountCredentials};