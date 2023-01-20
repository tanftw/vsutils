import { CommandArgs } from "./CommandArgs";

export class Color {
    static async hexToRGB(args: CommandArgs): Promise<string> {
        if (args.fallbackSelected.length < 3 || args.fallbackSelected.length > 7) {
            throw new Error('Invalid Hex');
        }

        let formatted = args.fallbackSelected.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(m, r, g, b) => '#' + r + r + g + g + b + b);

        if (formatted.length !== 4 && formatted.length !== 7) {
            throw new Error('Invalid Hex');
        }
        
        let rgb = formatted.substring(1).match(/.{2}/g);

        if (!rgb) {
            throw new Error('Invalid Hex');
        }

        return rgb.map((c) => parseInt(c, 16)).join(', ');
    }

    static async rgbToHex(args: CommandArgs): Promise<string> {
        const rgb = args.fallbackSelected.split(',').map((c) => parseInt(c.trim()));
        const hex = rgb.map((c) => c.toString(16).padStart(2, '0')).join('');
        return '#' + hex;
    }
}