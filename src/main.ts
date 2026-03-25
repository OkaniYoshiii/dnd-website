// import { err } from "neverthrow";
import { Result } from "neverthrow";
import { abilities_element_id, experience_element_id, level_element_id, tryGetElementById, tryGetInputById, tryGetSelectById } from "./dom";
import { onAbiltyChange, onExperienceUpdate } from "./renderer";

function main() {
    const result = Result.combine([
        tryGetInputById(experience_element_id),
        tryGetElementById(abilities_element_id),
        tryGetElementById(level_element_id)
    ]);

    if (result.isErr()) {
        return console.error(result.error)
    }

    const [experience_input, abilities_wrapper, level_element] = result.value

    experience_input.addEventListener("change", (ev) => onExperienceUpdate(ev, level_element))
    abilities_wrapper.addEventListener("change", (ev) => onAbiltyChange(ev))
}

main()
