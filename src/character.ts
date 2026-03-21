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
