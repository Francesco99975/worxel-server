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

interface ResetCredentials {
    password: string,
    password2: string,
    passwordToken: string,
    id: string,
    accountType: number
}

export {AccountType, AccountCredentials, LoginAccountCredentials, ResetCredentials};