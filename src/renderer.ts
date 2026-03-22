// import type { Result } from "neverthrow";

// export function render(result: Result<Character, Error>) {
//     if (result.isErr()) {
//         return;
//     }

//     const character = result.value;
//     const health = character.health;
//     const max_health = character.max_health;

//     if (health !== undefined && max_health !== undefined) {
//     }
// }

// export function setDefaults(): Result<void, Error> {
//     const result = Result.combine([
//         setExperience(0),
//         setLevel(1),
//         setClass(CharacterClass.Barbarian),
//         setMaxHealth(20),
//         setCurrentHealth(20),
//         setAbility(Ability.Strength, 10),
//         setAbility(Ability.Dexterity, 10),
//         setAbility(Ability.Constitution, 10),
//         setAbility(Ability.Intelligence, 10),
//         setAbility(Ability.Wisdom, 10),
//         setAbility(Ability.Charisma, 10),
//     ]);

//     if (result.isErr()) {
//         return err(result.error);
//     }

//     return ok();
// }
