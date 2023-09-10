import { ValidationArguments, ValidationOptions, buildMessage, registerDecorator } from "class-validator";
import { validate } from "multicoin-address-validator";

export function IsTrc20Wallet(
    validationOptions?: ValidationOptions,
  ) {

    return function(object: Object, propertyName: string) {
      registerDecorator({
        name: 'isTrc20Wallet',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [],
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            return validate(value, 'Tron');
          },
          // Specifiy your error message here.
          defaultMessage: buildMessage(
            eachPrefix =>
              `${eachPrefix}$property must be a valid TRC20 Wallet address`,
            validationOptions,
          ),
        },
      });
    };
  }