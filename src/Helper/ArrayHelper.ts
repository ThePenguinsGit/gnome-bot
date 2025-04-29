export default class ArrayHelper {
  static getRandomElement<Type>(array: Type[]): Type {
    return array[Math.floor(Math.random() * array.length)];
  }
}
