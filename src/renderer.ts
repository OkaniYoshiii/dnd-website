import { ok, type Result } from "neverthrow";
import { computeLevelFromExperience, computeModifierFromAbilityStat } from "./character";
import { experience_element_id, tryGetElementById } from "./dom";
import { tryParseInt } from "./utils";

export function onExperienceUpdate(ev: Event, level_element: HTMLElement): void {
    const target = ev.target
    if (target instanceof HTMLInputElement && target.id === experience_element_id) {
        const result = tryParseInt(target.value)
        if (result.isErr()) {
            // TODO: show error message
            return console.error(result.error)
        }

        trySetExperience(result.value, level_element)
    }
}

export function onAbiltyChange(ev: Event): void {
    const target = ev.target
    if (target instanceof HTMLInputElement) {
        const id = target.id
        const result = tryParseInt(target.value).map(computeModifierFromAbilityStat)
        if (result.isErr()) {
            // TODO: show error message
            return console.error(result.error)
        }

        const ability_modifier = result.value
        const ability_modifier_element_id = `${id}_modifier`

        const ability_modifier_result = tryGetElementById(ability_modifier_element_id)
        if (ability_modifier_result.isErr()) {
            // TODO: show error message
            return console.error(ability_modifier_result.error)
        }

        const ability_modifier_element = ability_modifier_result.value
        setAbilityModifier(ability_modifier, ability_modifier_element)
    }
}

export function trySetExperience(experience: number, level_element: HTMLElement): Result<void, Error> {
    const level = computeLevelFromExperience(experience)
    return tryParseInt(level_element.textContent).map((current_level): void => {
        if (level === current_level) return

        setLevel(level, level_element)
    });
}

export function setLevel(value: number, element: HTMLElement): void {
    element.textContent = value.toString()
}

export function setAbilityModifier(value: number, element: HTMLElement): void {
    element.textContent = value.toString()
}
