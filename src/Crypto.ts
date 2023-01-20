import { CommandArgs } from "./CommandArgs";
import * as cr from 'crypto';

export class Crypto {
    static async md5(args: CommandArgs): Promise<string> {
        return Crypto.encrypt(args, 'md5');
    }

    static async sha1(args: CommandArgs): Promise<string> {
        return Crypto.encrypt(args, 'sha1');
    }

    static async sha256(args: CommandArgs): Promise<string> {
        return Crypto.encrypt(args, 'sha256');
    }

    static async sha512(args: CommandArgs): Promise<string> {
        return Crypto.encrypt(args, 'sha512');
    }

    static encrypt(args: CommandArgs, hashType: 'md5' | 'sha1' | 'sha256' | 'sha512'): Promise<string> {
        return Promise.resolve(cr.createHash(hashType).update(args.fallbackSelected).digest('hex'));
    }

    static async decode(args: CommandArgs): Promise<string> {
        return decodeURIComponent(args.fallbackSelected);
    }
}