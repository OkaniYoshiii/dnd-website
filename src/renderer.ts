import { type Result } from "neverthrow";
import { computeLevelFromExperience } from "./character";
import { experience_element_id } from "./dom";
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

export function trySetExperience(experience: number, level_element: HTMLElement): Result<void, Error> {
    const level = computeLevelFromExperience(experience)
    return tryParseInt(level_element.textContent).map((current_level): void => {
        if (level === current_level) return

        setLevel(level, level_element)
    });
}

export function setLevel(level: number, level_element: HTMLElement): void {
    level_element.textContent = level.toString()
}
