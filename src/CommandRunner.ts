import { Base64 } from "./Base64";
import { UnixTimestamp } from "./UnixTimestamp";
import { CommandArgs } from "./CommandArgs";
import { Jwt } from "./Jwt";
import { Color } from "./Color";
import { Url } from "./Url";
import { Html } from "./Html";
import { Uuid } from "./Uuid";
import { Crypto } from "./Crypto";
import { PHP } from "./PHP";

type Command = {
    label: string;
    description: string;
    caller: (args: CommandArgs) => Promise<string>;
    outputLanguage?: string;
};

export const commands: Command[] = [
    { label: '$(file-code) Base64 Encode', description: 'Base64 encode', caller: Base64.encode },
    { label: '$(file) Base64 Decode', description: 'Base64 decode', caller: Base64.decode },
    { label: '$(calendar) Current Timestamp', description: 'Current timestamp', caller: UnixTimestamp.currentTimestamp },
    { label: '$(calendar) Current Date', description: 'Current date', caller: UnixTimestamp.currentDate },
    { label: '$(calendar) Timestamp to Date', description: 'Timestamp to date', caller: UnixTimestamp.toDate },
    { label: '$(calendar) Timestamp from Date', description: 'Date to Timestamp', caller: UnixTimestamp.toTimestamp },
    { label: '$(symbol-namespace) JWT Parser', description: 'Parse JWT', caller: Jwt.parse, outputLanguage: 'json' },
    { label: '$(symbol-color) Hex to RGB', description: 'Color: Hex to RGB', caller: Color.hexToRGB },
    { label: '$(symbol-color) RGB to HEX', description: 'Color: RGB to Hex', caller: Color.rgbToHex },
    { label: '$(symbol-array) Unserialize', description: 'Unserialize', caller: PHP.unserialize },
    { label: '$(link) URL Encode', description: 'URL Encode', caller: Url.encode },
    { label: '$(link) URL Decode', description: 'URL Decode', caller: Url.decode },
    { label: '$(globe) Html Encode', description: 'Html Encode (Hex)', caller: Html.encode },
    { label: '$(globe) Html Decode', description: 'Html Decode (Hex)', caller: Html.decode },
    { label: '$(globe) Html Entities Encode', description: 'Html Entities Encode', caller: Html.entities },
    { label: '$(globe) Html Entities Decode', description: 'Html Entities Decode', caller: Html.entitiesDecode },
    { label: '$(key) Random UUID', description: 'Generate Random UUID v4', caller: Uuid.generate },
    { label: '$(file-binary) Encrypt as MD5', description: 'Encrypt as MD5', caller: Crypto.md5 },
    { label: '$(file-binary) Encrypt as SHA1', description: 'Encrypt as SHA1', caller: Crypto.sha1 },
    { label: '$(file-binary) Encrypt as SHA256', description: 'Encrypt as SHA256', caller: Crypto.sha256 },
    { label: '$(file-binary) Encrypt as SHA512', description: 'Encrypt as SHA512', caller: Crypto.sha512 },
];

export class CommandRunner {
    static async run(args: CommandArgs): Promise<string> {
        const selectedCommand = commands.find(c => c.label === args.command)?.caller;
        return new Function('selectedCommand', 'args', `return selectedCommand(args);`)(selectedCommand, args);
    }
}