import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator'

@ValidatorConstraint({ name: 'string-or string-array', async: false })
export class IsStringOrStringArray implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        if (typeof value === 'string') {
            return true
        } else if (value instanceof Array) {
            for (const v of value) {
                if (typeof v !== 'string') {
                    return false
                }
            }
            return true
        } else {
            return false
        }
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} must be a string or a string array`
    }
}
