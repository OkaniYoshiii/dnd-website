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

export const enum StrengthSkill {
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
