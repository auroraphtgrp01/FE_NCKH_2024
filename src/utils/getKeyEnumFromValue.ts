export function getKeyByValue(value: string, TypeEnum: any) {
    for (const key in TypeEnum) {
        if (TypeEnum[key] === value) {
            return key as keyof typeof TypeEnum;
        }
    }
    return null;
}