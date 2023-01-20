import { CommandArgs } from "./CommandArgs";

export class Url {
    static async encode(args: CommandArgs): Promise<string> {
        return encodeURIComponent(args.fallbackSelected);
    }

    static async decode(args: CommandArgs): Promise<string> {
        return decodeURIComponent(args.fallbackSelected);
    }
}