import { err } from "neverthrow";
import { getExperienceInput, setExperience } from "./character";

function handleError(error: Error) {
    console.error(error);
}

(function (): void {
    getExperienceInput().match((input) => {
        input.addEventListener("change", updateExperience);
    }, handleError);
})();

function updateExperience() {
    const result = getExperienceInput().andThen((input) => {
        const experience = parseInt(input.value);
        if (isNaN(experience)) {
            return err(new Error("Experience is NaN"));
        }
        return setExperience(experience);
    });

    if (result.isErr()) {
        return handleError(result.error);
    }
}
