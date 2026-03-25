import { err, ok, type Result } from "neverthrow";

export function tryParseInt(value: string): Result<number, Error> {
    const number_val = parseInt(value)
    if (isNaN(number_val)) {
        return err(new Error('value cannot be converted to integer'))
    }

    return ok(number_val)
}
