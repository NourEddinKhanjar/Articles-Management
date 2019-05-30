export class EnumUtil {

  static getEnumKeyStringValue(enumName, enumKey): string {
    return enumName[enumName[enumKey]];
  }

}
