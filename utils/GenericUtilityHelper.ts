export class GenericUtilityHelper {
    private static readonly characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    public static generateRandomString(length: number): string {
        if (!Number.isInteger(length) || length <= 0) {
            throw new RangeError('Length must be a positive integer.');
        }

        let result = '';

        for (let index = 0; index < length; index++) {
            const randomIndex = Math.floor(Math.random() * this.characters.length);
            result += this.characters[randomIndex];
        }

        return result;
    }
}
