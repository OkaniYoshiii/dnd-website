import { err, ok, type Result } from "neverthrow";
import { type Ability } from "./character";

export const current_health_element_id = "character_current_health";
export const max_health_element_id = "character_max_health";
export const class_element_id = "character_class";
export const experience_element_id = "character_experience";

export function tryGetElementById(id: string): Result<HTMLElement, Error> {
    const element = document.getElementById(id);
    if (element === null) {
        return err(new Error(`Element with id "${id}" does not exists.`));
    }

    return ok(element);
}

export function tryGetSelectById(id: string): Result<HTMLSelectElement, Error> {
    return tryGetElementById(id).andThen((element) => {
        if (!(element instanceof HTMLSelectElement)) {
            return err(new Error("not an HTMLSelectElement"));
        }

        return ok(element);
    });
}

export function tryGetInputById(id: string): Result<HTMLInputElement, Error> {
    return tryGetElementById(id).andThen((element) => {
        if (!(element instanceof HTMLInputElement)) {
            return err(new Error("not an HTMLSelectElement"));
        }

        return ok(element);
    });
}

export function tryGetValueAsNumber(
    element: HTMLInputElement,
): Result<number, Error> {
    const input_value = element.value;
    const value = parseInt(input_value);
    if (isNaN(value)) {
        return err(
            new Error(
                `value of element (${input_value}) cannot be converted to int`,
            ),
        );
    }

    return ok(value);
}

export function tryGetTextContentAsNumber(
    element: HTMLElement,
): Result<number, Error> {
    const text_content = element.textContent;
    const value = parseInt(text_content);
    if (isNaN(value)) {
        return err(
            new Error(
                `value of element (${text_content}) cannot be converted to int`,
            ),
        );
    }

    return ok(value);
}

export function tryGetCurrentHealth(): Result<number, Error> {
    return tryGetElementById(current_health_element_id).andThen(
        tryGetTextContentAsNumber,
    );
}

export function tryGetMaxHealth(): Result<number, Error> {
    return tryGetElementById(max_health_element_id).andThen(
        tryGetTextContentAsNumber,
    );
}

export function tryGetAbilityValue(ability: Ability): Result<number, Error> {
    return tryGetElementById(`character_ability_${ability}`).andThen(
        tryGetTextContentAsNumber,
    );
}

export function tryGetAbilityModifier(ability: Ability): Result<number, Error> {
    return tryGetElementById(`character_ability_${ability}_modifier`).andThen(
        tryGetTextContentAsNumber,
    );
}

export function tryGetSelectedClass(): Result<string, Error> {
    return tryGetSelectById(class_element_id).map((select) => select.value);
}

export function tryGetExperience(): Result<number, Error> {
    return tryGetInputById(experience_element_id).andThen(tryGetValueAsNumber);
}
