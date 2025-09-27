export function isValidHexColor(color: string): boolean {
    return color === '' || /^#[0-9A-F]{6}$/i.test(color);
}
