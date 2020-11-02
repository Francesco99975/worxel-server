enum FlagType {
    NOT_AVAILABLE = 0,
    VACATION = 1,
    DAYS_OFF = 3
}

interface EmployeeForm {
    firstname: string,
    lastname: string,
    departments: [],
    color: string,
    priority: number,
    manager: boolean,
    email: string,
    password: string
}

class Shift {
    start: Date
    end: Date

    constructor(start: Date, end: Date) {
        this.start = start;
        this.end = end;
    }
}

class Flag {
    from: Date
    to: Date
    flagType: FlagType

    constructor(from: Date, to: Date, flagType: FlagType) {
        this.from = from;
        this.to = to;
        this.flagType = flagType;
    }
}

export { EmployeeForm, Shift, Flag };