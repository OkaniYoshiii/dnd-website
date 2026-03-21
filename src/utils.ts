import { err, ok, Result } from "neverthrow";

export function getElementById(id: string): Result<HTMLElement, Error> {
    const element = document.getElementById(id);
    if (element === null) {
        return err(new Error(`Element with id "${id}" does not exists.`));
    }
    return ok(element);
}
