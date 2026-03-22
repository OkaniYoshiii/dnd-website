import { err, ok, Result } from "neverthrow";

export function validateAbilityStat(value: number): Result<number, Error> {
    const min = 1;
    const max = 20;
    if (value >= min && value <= max) {
        return ok(value);
    }

    return err(
        new Error(`Ability stat ${value} is not between ${min} and ${max}`),
    );
}

export function validateAbilityModifier(value: number): Result<number, Error> {
    const min = -4;
    const max = 5;
    if (value >= min && value <= max) {
        return ok(value);
    }

    return err(
        new Error(`Ability modifier ${value} is not between ${min} and ${max}`),
    );
}

export function validateExperience(value: number): Result<number, Error> {
    const min = 0;
    const max = 355000;
    if (value < 0 || value > max) {
        return err(
            new Error(
                `Experience value must be greater than ${min} and less than ${max}`,
            ),
        );
    }

    return ok(value);
}

export function validateHealth(value: number): Result<number, Error> {
    const min = 0;
    if (value < 0) {
        return err(new Error(`Health value must be greater than ${min}`));
    }

    return ok(value);
}

export function validateMaxHealth(value: number): Result<number, Error> {
    const min = 0;
    if (value < 0) {
        return err(new Error(`Max health value must be greater than ${min}`));
    }

    return ok(value);
}

export function validatePositiveOrZero(value: number): Result<number, Error> {
    if (value < 0) {
        return err(new Error(`value must be positive`));
    }

    return ok(value);
}

export function validateLevel(value: number): Result<number, Error> {
    const min = 0;
    if (value < 0) {
        return err(new Error(`Level value must be greater than ${min}`));
    }

    return ok(value);
}
