// import { err } from "neverthrow";
import { Result } from "neverthrow";
import { experience_element_id, level_element_id, tryGetElementById, tryGetInputById } from "./dom";
import { onExperienceUpdate } from "./renderer";

function main() {
    const result = Result.combine([
        tryGetInputById(experience_element_id),
        tryGetElementById(level_element_id)
    ]);

    if (result.isErr()) {
        return console.error(result.error)
    }

    const [experience_input, level_element] = result.value

    experience_input.addEventListener("change", (ev) => onExperienceUpdate(ev, level_element))
}

main()
