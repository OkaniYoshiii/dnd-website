import { ok, err } from "neverthrow";
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

function validateAbilityStat(value: number) {
    const min = 1;
    const max = 20;
    if (value >= min && value <= max) {
        return ok(value);
    }

    return err(
        new Error(`Ability stat ${value} is not between ${min} and ${max}`),
    );
}

function validateAbilityModifier(value: number) {
    const min = -4;
    const max = 5;
    if (value >= min && value <= max) {
        return ok(value);
    }

    return err(
        new Error(`Ability modifier ${value} is not between ${min} and ${max}`),
    );
}

function validateExperience(value: number) {
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

function validateLevel(value: number) {
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

export function getClassSelect() {
    const result = getElementById("character_class");
    if (result.isErr()) {
        return result;
    }

    const class_select = result.value;
    if (!(class_select instanceof HTMLSelectElement)) {
        return err(
            new Error(
                `Element with id ${result.value.id} is not an instance of HTMLSelectElement`,
            ),
        );
    }

    return ok(class_select);
}

export function getSelectedClass() {
    const result = getClassSelect();
    if (result.isErr()) {
        return result;
    }

    const class_select = result.value;
    const selected_class = class_select.value;

    if (!isCharacterClass(selected_class)) {
        return err(
            new Error(
                `class_select value is not a valid character class value. Expected values ${Object.values<string>(CharacterClass)}`,
            ),
        );
    }

    return ok(selected_class);
}

export function isCharacterClass(value: unknown): value is CharacterClass {
    return (
        typeof value === "string" &&
        Object.values<string>(CharacterClass).includes(value)
    );
}

export function setClass(character_class: CharacterClass) {
    let stats: Stats = characterStats(character_class);

    setAbility(Ability.Strength, stats.abilities[Ability.Strength]);
}

export function setAbility(ability: Ability, ability_stat: number) {
    const ability_stat_result = validateAbilityStat(ability_stat);
    if (ability_stat_result.isErr()) {
        return ability_stat_result;
    }

    const result = getAbilityInput(ability);
    if (result.isErr()) {
        return result;
    }
    const input = result.value;
    input.value = ability_stat.toString();

    let modifier = Math.floor(ability_stat - 10 / 2);
    return setAbilityModifier(ability, modifier);
}

export function getAbilityInput(ability: Ability) {
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
    if (result.isErr()) {
        return result;
    }

    const input = result.value;
    if (!(input instanceof HTMLInputElement)) {
        return err(
            new Error(
                `Expected element with id ${id} to be an instance of ${HTMLInputElement.name}`,
            ),
        );
    }

    return ok(input);
}

export function characterStats(character_class: CharacterClass): Stats {
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

export function setAbilityModifier(ability: Ability, modifier: number) {
    const modifier_result = validateAbilityModifier(modifier);
    if (modifier_result.isErr()) {
        return modifier_result;
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

    const result = getElementById(id);
    if (result.isErr()) {
        return result;
    }

    const element = result.value;
    element.textContent = modifier.toString();

    return ok();
}

export function getExperienceInput() {
    const id = "character_experience";
    const element_result = getElementById(id);
    if (element_result.isErr()) {
        return element_result;
    }

    const experience_input = element_result.value;
    if (!(experience_input instanceof HTMLInputElement)) {
        return err(
            new Error(
                `Expected element with id ${id} to be an instance of ${HTMLInputElement.name}`,
            ),
        );
    }

    return ok(experience_input);
}

export function setExperience(experience: number) {
    const validation_result = validateExperience(experience);
    if (validation_result.isErr()) {
        return validation_result;
    }

    const experience_input_result = getExperienceInput();
    if (experience_input_result.isErr()) {
        return experience_input_result;
    }

    const experience_input = experience_input_result.value;
    experience_input.value = experience.toString();

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
}

export function getLevelElement() {
    const id = "character_level";
    const element_result = getElementById(id);
    if (element_result.isErr()) {
        return element_result;
    }

    return ok(element_result.value);
}

export function setLevel(level: number) {
    const validation_result = validateLevel(level);
    if (validation_result.isErr()) {
        return validation_result;
    }

    const level_element_result = getLevelElement();
    if (level_element_result.isErr()) {
        return level_element_result;
    }

    const level_element = level_element_result.value;
    level_element.textContent = level.toString();

    return ok();
}
