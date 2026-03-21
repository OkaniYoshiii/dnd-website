import { ok, err, Result } from "neverthrow";
import { getElementById } from "./utils";

export enum CharacterClass {
    Barbarian = "barbarian",
    Druid = "druid",
    Clerk = "clerk",
    Bard = "bard",
    Sorcerer = "sorcerer",
    Paladin = "paladin",
}

export type Stats = {
    healthPoints: number;
    abilities: AbilitiesStats;
};

export const enum Ability {
    Strength,
    Dexterity,
    Constitution,
    Intelligence,
    Wisdom,
    Charsima,
}

export type AbilitiesStats = {
    [Ability.Strength]: number;
    [Ability.Dexterity]: number;
    [Ability.Constitution]: number;
    [Ability.Intelligence]: number;
    [Ability.Wisdom]: number;
    [Ability.Charsima]: number;
};

export function isCharacterClass(value: unknown): value is CharacterClass {
    return (
        typeof value === "string" &&
        Object.values<string>(CharacterClass).includes(value)
    );
}

function validateAbilityStat(value: number): Result<number, Error> {
    const min = 1;
    const max = 20;
    if (value >= min && value <= max) {
        return ok(value);
    }

    return err(
        new Error(`Ability stat ${value} is not between ${min} and ${max}`),
    );
}

function validateAbilityModifier(value: number): Result<number, Error> {
    const min = -4;
    const max = 5;
    if (value >= min && value <= max) {
        return ok(value);
    }

    return err(
        new Error(`Ability modifier ${value} is not between ${min} and ${max}`),
    );
}

function validateExperience(value: number): Result<number, Error> {
    const min = 0;
    const max = 355000;
    if (value < 0 || value > max) {
        return err(
            new Error(
                `Experience value must be greater than ${min} and less than ${max}`,
            ),
        );
    }

    return ok(value);
}

function validateHealth(value: number): Result<number, Error> {
    const min = 0;
    if (value < 0) {
        return err(new Error(`Health value must be greater than ${min}`));
    }

    return ok(value);
}

function validateMaxHealth(value: number): Result<number, Error> {
    const min = 0;
    if (value < 0) {
        return err(new Error(`Max health value must be greater than ${min}`));
    }

    return ok(value);
}

function validateLevel(value: number): Result<number, Error> {
    const min = 0;
    if (value < 0) {
        return err(new Error(`Level value must be greater than ${min}`));
    }

    return ok(value);
}

export function defaultAbilities(): AbilitiesStats {
    return {
        [Ability.Strength]: 10,
        [Ability.Dexterity]: 10,
        [Ability.Constitution]: 10,
        [Ability.Intelligence]: 10,
        [Ability.Wisdom]: 10,
        [Ability.Charsima]: 10,
    };
}

export function defaultStats(): Stats {
    const healthPoints = 10;
    const abilities: AbilitiesStats = defaultAbilities();

    return {
        healthPoints: healthPoints,
        abilities: abilities,
    };
}

export function getClassSelect(): Result<HTMLSelectElement, Error> {
    return getElementById("character_class").andThen((element) => {
        if (!(element instanceof HTMLSelectElement)) {
            return err(
                new Error(
                    `Element with id ${element.id} is not an instance of HTMLSelectElement`,
                ),
            );
        }

        return ok(element);
    });
}

export function getSelectedClass(): Result<CharacterClass, Error> {
    return getClassSelect().andThen((element) => {
        const value = element.value;
        if (!isCharacterClass(value)) {
            return err(
                new Error(
                    `class_select value is not a valid character class value. Expected values ${Object.values<string>(CharacterClass)}`,
                ),
            );
        }

        return ok(value);
    });
}

export function setClass(character_class: CharacterClass): Result<void, Error> {
    let stats: Stats = getClassStats(character_class);

    return setAbility(Ability.Strength, stats.abilities[Ability.Strength]);
}

export function setAbility(
    ability: Ability,
    ability_stat: number,
): Result<void, Error> {
    return validateAbilityStat(ability)
        .andThen(getAbilityInput)
        .andThen((input) => {
            input.value = ability_stat.toString();

            let modifier = Math.floor(ability_stat - 10 / 2);
            return setAbilityModifier(ability, modifier);
        });
}

export function getAbilityInput(
    ability: Ability,
): Result<HTMLInputElement, Error> {
    let id: string = "";
    switch (ability) {
        case Ability.Strength:
            id = "character_strength";
            break;
        case Ability.Dexterity:
            id = "character_dexterity";
            break;
        case Ability.Constitution:
            id = "character_constitution";
            break;
        case Ability.Intelligence:
            id = "character_intelligence";
            break;
        case Ability.Wisdom:
            id = "character_wisdom";
            break;
        case Ability.Charsima:
            id = "character_charisma";
            break;
        default:
            throw ability satisfies never;
    }

    const result = getElementById(id);
    return result.andThen((element) => {
        if (!(element instanceof HTMLInputElement)) {
            return err(
                new Error(
                    `Expected element with id ${id} to be an instance of ${HTMLInputElement.name}`,
                ),
            );
        }

        return ok(element);
    });
}

export function getClassStats(character_class: CharacterClass): Stats {
    switch (character_class) {
        case CharacterClass.Barbarian:
            return defaultStats();
        case CharacterClass.Bard:
            return defaultStats();
        case CharacterClass.Clerk:
            return defaultStats();
        case CharacterClass.Druid:
            return defaultStats();
        case CharacterClass.Paladin:
            return defaultStats();
        case CharacterClass.Sorcerer:
            return defaultStats();
        default:
            // checks that every enum case is covered
            throw character_class satisfies never;
    }
}

export function setAbilityModifier(
    ability: Ability,
    modifier: number,
): Result<void, Error> {
    const modifier_result = validateAbilityModifier(modifier);
    if (modifier_result.isErr()) {
        return err(modifier_result.error);
    }

    let id: string = "";
    switch (ability) {
        case Ability.Strength:
            id = "character_strength_modifier";
            break;
        case Ability.Dexterity:
            id = "character_dexterity_modifier";
            break;
        case Ability.Constitution:
            id = "character_constitution_modifier";
            break;
        case Ability.Intelligence:
            id = "character_intelligence_modifier";
            break;
        case Ability.Wisdom:
            id = "character_wisdom_modifier";
            break;
        case Ability.Charsima:
            id = "character_charisma_modifier";
            break;
        default:
            throw ability satisfies never;
    }

    return getElementById(id).map((element) => {
        element.textContent = modifier.toString();
    });
}

export function getExperienceInput(): Result<HTMLInputElement, Error> {
    const id = "character_experience";
    return getElementById(id).andThen((element) => {
        if (!(element instanceof HTMLInputElement)) {
            return err(
                new Error(
                    `Expected element with id ${id} to be an instance of ${HTMLInputElement.name}`,
                ),
            );
        }

        return ok(element);
    });
}

export function setExperience(experience: number): Result<void, Error> {
    return validateExperience(experience)
        .andThen(getExperienceInput)
        .andThen((input) => {
            input.value = experience.toString();

            let level = 1;
            if (experience < 300) {
                level = 1;
            } else if (experience >= 300) {
                level = 2;
            } else if (experience >= 900) {
                level = 3;
            } else if (experience >= 2700) {
                level = 4;
            } else if (experience >= 6500) {
                level = 5;
            } else if (experience >= 14000) {
                level = 6;
            } else if (experience >= 23000) {
                level = 7;
            } else if (experience >= 34000) {
                level = 8;
            } else if (experience >= 48000) {
                level = 9;
            } else if (experience >= 64000) {
                level = 10;
            } else if (experience >= 85000) {
                level = 11;
            } else if (experience >= 100000) {
                level = 12;
            } else if (experience >= 120000) {
                level = 13;
            } else if (experience >= 140000) {
                level = 14;
            } else if (experience >= 165000) {
                level = 15;
            } else if (experience >= 195000) {
                level = 16;
            } else if (experience >= 225000) {
                level = 17;
            } else if (experience >= 265000) {
                level = 18;
            } else if (experience >= 305000) {
                level = 19;
            } else if (experience >= 355000) {
                level = 20;
            }

            return setLevel(level);
        });
}

export function getLevelElement(): Result<HTMLElement, Error> {
    return getElementById("character_level");
}

export function setLevel(level: number): Result<void, Error> {
    return Result.combine([validateLevel(level), getLevelElement()]).map(
        ([_, element]) => {
            element.textContent = level.toString();
        },
    );
}

export function getCurrentHealthElement(): Result<HTMLElement, Error> {
    return getElementById("character_current_health");
}

export function getMaxHealthElement(): Result<HTMLElement, Error> {
    return getElementById("character_max_health");
}

export function getMaxHealth(): Result<number, Error> {
    return getMaxHealthElement().andThen((element) => {
        const max_health = parseInt(element.textContent, 10);
        if (isNaN(max_health)) {
            return err(new Error("Max health is not a valid number"));
        }

        return ok(max_health);
    });
}

export function setCurrentHealth(health: number): Result<void, Error> {
    return Result.combine([
        validateHealth(health),
        getCurrentHealthElement(),
        getMaxHealth(),
    ]).andThen(([_, element, max_health]) => {
        if (health > max_health) {
            return err(
                new Error(
                    `Health value (${health}) is greater than current max health (${max_health})`,
                ),
            );
        }

        element.textContent = health.toString();
        return ok();
    });
}

export function setMaxHealth(max_health: number): Result<void, Error> {
    return validateMaxHealth(max_health)
        .andThen(getMaxHealthElement)
        .map((element) => {
            element.textContent = max_health.toString();
        });
}
