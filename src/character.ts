import { err, ok, Result } from "neverthrow";

export type Abilities = {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
}

export type CharacterStats = {
    level: number,
    experience: number,
    class: CharacterClass,
    abilities: Abilities
}

export class Character implements CharacterStats {
    public level: number;
    public experience: number;
    public class: CharacterClass;
    public abilities: Abilities

    constructor(stats: CharacterStats) {
        this.level = stats.level
        this.experience = stats.experience
        this.class = stats.class
        this.abilities = {
            strength: stats.abilities.strength,
            dexterity: stats.abilities.dexterity,
            constitution: stats.abilities.constitution,
            intelligence: stats.abilities.intelligence,
            wisdom: stats.abilities.wisdom,
            charisma: stats.abilities.charisma,
        }
    }
}

export function tryNewDefaultCharacter(): Result<Character, Error> {
    const stats: CharacterStats = {
        level: 1,
        experience: 0,
        class: CharacterClass.Barbarian,
        abilities: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
        }
    };

    const character = new Character(stats)

    validateCharacter(character)

    return ok(character)
}

export function validateCharacter(character: Character): Result<Character, Error> {
    const level = character.level
    if (level < 1) {
        return err(new Error(''))
    }

    const experience = character.experience
    if (experience < 0) {
        return err(new Error(''))
    }

    if (experience > 355000) {
        return err(new Error(''))
    }

    const expected_level = computeLevelFromExperience(experience)
    if (expected_level !== level) {
        return err(new Error(''))
    }

    let name: keyof Abilities
    for (name in character.abilities) {
        const ability_stat = character.abilities[name]
        const modifier = computeModifierFromAbilityStat(ability_stat)
        if (ability_stat < 0 || ability_stat > 20) {
            return err(new Error(''))
        }

        if (modifier < -4 || modifier > 5) {
            return err(new Error(''))
        }
    }

    return ok(character)
}

export function computeModifierFromAbilityStat(ability_stat: number) {
    return Math.floor((ability_stat - 10) / 2)
}

export function computeLevelFromExperience(experience: number) {
    switch (true) {
        case experience < 300:
            return 1;
        case experience < 900:
            return 2;
        case experience < 2700:
            return 3;
        case experience < 6500:
            return 4;
        case experience < 14000:
            return 5;
        case experience < 23000:
            return 6;
        case experience < 34000:
            return 7;
        case experience < 48000:
            return 8;
        case experience < 64000:
            return 9;
        case experience < 85000:
            return 10;
        case experience < 100000:
            return 11;
        case experience < 120000:
            return 12;
        case experience < 140000:
            return 13;
        case experience < 165000:
            return 14;
        case experience < 195000:
            return 15;
        case experience < 225000:
            return 16;
        case experience < 265000:
            return 17;
        case experience < 305000:
            return 18;
        case experience < 355000:
            return 19;
        default:
            return 20;
    }
}

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
    Charisma,
}

export enum StrengthSkill {
    Athletism = 0,
}

export const enum DexteritySkill {
    Acrobatics = 1,
    SleightOfHand = 2,
    Stealth = 3,
}

export const enum IntelligenceSkill {
    Arcana = 4,
    History = 5,
    Investigation = 6,
    Nature = 7,
    Religion = 8,
}

export const enum WisdomSkill {
    AnimalHandling = 9,
    Insight = 10,
    Medicine = 11,
    Perception = 12,
    Survival = 13,
}

export const enum CharsimaSkill {
    Deception = 14,
    Intimidation = 15,
    Performance = 16,
    Persuasion = 17,
}

export type Skill =
    | StrengthSkill
    | DexteritySkill
    | IntelligenceSkill
    | WisdomSkill
    | CharsimaSkill;

export type AbilitiesStats = {
    [Ability.Strength]: number;
    [Ability.Dexterity]: number;
    [Ability.Constitution]: number;
    [Ability.Intelligence]: number;
    [Ability.Wisdom]: number;
    [Ability.Charisma]: number;
};

export function isCharacterClass(value: unknown): value is CharacterClass {
    return (
        typeof value === "string" &&
        Object.values<string>(CharacterClass).includes(value)
    );
}

export const strength_skills = [StrengthSkill.Athletism];
export const dexterity_skills = [
    DexteritySkill.Acrobatics,
    DexteritySkill.SleightOfHand,
    DexteritySkill.Stealth,
];
export const intelligence_skills = [
    IntelligenceSkill.Arcana,
    IntelligenceSkill.Nature,
    IntelligenceSkill.Religion,
    IntelligenceSkill.History,
    IntelligenceSkill.Investigation,
];
export const wisdom_skills = [
    WisdomSkill.AnimalHandling,
    WisdomSkill.Insight,
    WisdomSkill.Medicine,
    WisdomSkill.Perception,
    WisdomSkill.Survival,
];
export const charisma_skills = [
    CharsimaSkill.Deception,
    CharsimaSkill.Intimidation,
    CharsimaSkill.Performance,
    CharsimaSkill.Persuasion,
];

export function defaultAbilities(): AbilitiesStats {
    return {
        [Ability.Strength]: 10,
        [Ability.Dexterity]: 10,
        [Ability.Constitution]: 10,
        [Ability.Intelligence]: 10,
        [Ability.Wisdom]: 10,
        [Ability.Charisma]: 10,
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
