import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

interface IsNotEmptyStringOptions {
  nullable?: boolean;
}

export function IsNotEmptyString(options?: IsNotEmptyStringOptions, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsNotEmptyString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (options?.nullable && value === null) {
            return true;
          }
          return typeof value === 'string' && value.trim() !== '';
        },
        defaultMessage(args: ValidationArguments) {
          if (options?.nullable) {
            return `${args.property}는 빈 문자열일 수 없습니다 (null은 허용)`;
          }
          return `${args.property}는 빈 문자열일 수 없습니다`;
        },
      },
    });
  };
}
