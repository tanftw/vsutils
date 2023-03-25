import { CommandArgs } from "./CommandArgs";
import { unserialize } from "php-serialize";

export class PHP {
    static async unserialize(args: CommandArgs): Promise<string> {
        try {
            return JSON.stringify(unserialize(args.fallbackSelected));
        } catch (e) {
            return args.fallbackSelected;
        }
    }
}