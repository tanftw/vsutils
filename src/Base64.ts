import { CommandArgs } from "./CommandArgs";

export class Base64 {
    static async encode(args: CommandArgs): Promise<string> {
        return Buffer.from(args.fallbackSelected).toString('base64');
    }

    static async decode(args: CommandArgs): Promise<string> {
        return Buffer.from(args.fallbackSelected, 'base64').toString('utf8');
    }
}