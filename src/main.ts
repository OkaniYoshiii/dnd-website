import { getClassSelect } from "./character";

function handleError(error: Error) {
    console.error(error);
}

(function (): void {
    const result = getClassSelect();
    if (result.isErr()) {
        return handleError(result.error);
    }

    const class_select = result.value;

    class_select.addEventListener("change", updateCharacterClass);
})();

function updateCharacterClass(): void {}
