// import { err } from "neverthrow";
import { experience_element_id, tryGetInputById } from "./dom";

(function (): void {
    const result = tryGetInputById(experience_element_id);
    if (result.isErr()) {
        return console.log(result.error);
    }

    result.value.addEventListener("change", updateExperience);
})();

function updateExperience() {
    // const result = getExperienceInput().andThen((input) => {
    //     const experience = parseInt(input.value);
    //     if (isNaN(experience)) {
    //         return err(new Error("Experience is NaN"));
    //     }
    //     return setExperience(experience);
    // });
    // if (result.isErr()) {
    //     return handleError(result.error);
    // }
}
