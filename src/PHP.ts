// @ts-ignore @ts-nocheck
import { CommandArgs } from "./CommandArgs";
import fetch from 'node-fetch';

export class PHP {
    static async serialize(args: CommandArgs): Promise<string> {
        let output = '';

        let data = await fetch('https://api.github.com/users/sergeysova');

        let res = await data.text();
        return res;
    }

    static async unserialize(args: CommandArgs): Promise<string> {
        return args.fallbackSelected;
    }

    static async toJsArray(args: CommandArgs): Promise<string> {
        return args.fallbackSelected;
    }

    static async toPhpArray(args: CommandArgs): Promise<string> {
        return args.fallbackSelected;
    }
}