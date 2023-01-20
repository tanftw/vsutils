import { CommandArgs } from "./CommandArgs";
import { randomUUID } from "crypto";

export class Uuid {
    static async generate(args: CommandArgs): Promise<string> {
        return randomUUID();
    }
}