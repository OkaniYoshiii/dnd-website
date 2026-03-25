import { err, ok, type Result } from "neverthrow";
import type { Ability } from "./character";

export const current_health_element_id = "character_current_health";
export const max_health_element_id = "character_max_health";
export const class_element_id = "character_class";
export const experience_element_id = "character_experience";
export const level_element_id = "character_level"

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

export function getAbilityElementId(ability: Ability): string {
    return `character_ability_${ability}`
}

export function getAbilityModifierElementId(ability: Ability): string {
    return `character_ability_${ability}_modifier`
}
