import { CommandArgs } from "./CommandArgs";

export class Jwt {
    static async parse(args: CommandArgs): Promise<string> {
        try {
            return Buffer.from(args.fallbackSelected.split('.')[1], 'base64').toString();
        } catch (e) {
            throw new Error('Invalid JWT');
        }
    }
}