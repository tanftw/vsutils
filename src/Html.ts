import { CommandArgs } from "./CommandArgs";
import {encode, decode} from 'html-entities';

export class Html {
    static async encode(args: CommandArgs): Promise<string> {
        let buf = [];
        for (let i=args.fallbackSelected.length-1;i>=0;i--) {
            buf.unshift(['&#', args.fallbackSelected[i].charCodeAt(0), ';'].join(''));
        }
        return buf.join('');
    }

    static async decode(args: CommandArgs): Promise<string> {
        return args.fallbackSelected.replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec);
        });
    }

    static async entities(args: CommandArgs): Promise<string> {
        return encode(args.fallbackSelected);
    }

    static async entitiesDecode(args: CommandArgs): Promise<string> {
        return decode(args.fallbackSelected);
    }
}