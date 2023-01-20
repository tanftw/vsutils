import { CommandArgs } from "./CommandArgs";

export class UnixTimestamp {
    static async toDate(args: CommandArgs):  Promise<string> {
        const date = new Date(parseInt(args.fallbackSelected) * 1000);

        return date.getFullYear() + "-" +
            ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
            ("00" + date.getDate()).slice(-2) + " " +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2) + ":" +
            ("00" + date.getSeconds()).slice(-2);
    }

    static async toTimestamp(args: CommandArgs):  Promise<string> {
        return (new Date(args.fallbackSelected).getTime() / 1000).toString();
    }

    static async currentTimestamp(args: CommandArgs):  Promise<string> {
        return Math.floor(Date.now() / 1000).toString();
    }

    static async currentDate(args: CommandArgs):  Promise<string> {
        return await UnixTimestamp.toDate({ ...args, fallbackSelected: await UnixTimestamp.currentTimestamp(args) });
    }
}
