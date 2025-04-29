export default class StringHelper {
  static trimCharacter(str: string, chars: string): string {
    return str.split(chars).filter(Boolean).join(chars);
  }
}
