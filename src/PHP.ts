import { CommandArgs } from "./CommandArgs";
import { serialize, unserialize } from "php-serialize";

export class PHP {
    static async unserialize(args: CommandArgs): Promise<string> {
        try {
            return JSON.stringify(unserialize(args.fallbackSelected));
        } catch (e) {
            return args.fallbackSelected;
        }
    }

    static async serialize(args: CommandArgs): Promise<string> {
        try {
            return serialize(JSON.parse(args.fallbackSelected));
        } catch (e) {
            return args.fallbackSelected;
        }
    }
}
