import { CommandArgs } from "./CommandArgs";

export class Str {
    static async reverse(args: CommandArgs): Promise<string> {
        return args.fallbackSelected.split('').reverse().join('');
    }
}
