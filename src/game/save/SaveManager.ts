export interface SaveData
{
    version: number;
    faithXP: number;
    encountersCompleted: string[];
}

const STORAGE_KEY = 'light-to-nations-save';
const SAVE_VERSION = 1;

function defaultSave (): SaveData
{
    return { version: SAVE_VERSION, faithXP: 0, encountersCompleted: [] };
}

/** Versioned progress store. One instance, owned by GameStateManager. */
export class SaveManager
{
    private data: SaveData;

    constructor ()
    {
        this.data = this.load();
    }

    private load (): SaveData
    {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return defaultSave();

            const parsed = JSON.parse(raw) as SaveData;
            return parsed.version === SAVE_VERSION ? parsed : defaultSave();
        } catch {
            return defaultSave();
        }
    }

    private persist (): void
    {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        } catch {
            // storage unavailable (private mode, quota) -- progress stays in memory only
        }
    }

    markCompleted (encounterKey: string, faithXPReward = 0): void
    {
        if (this.data.encountersCompleted.includes(encounterKey)) return;

        this.data.encountersCompleted.push(encounterKey);
        this.data.faithXP += faithXPReward;
        this.persist();
    }

    isCompleted (encounterKey: string): boolean
    {
        return this.data.encountersCompleted.includes(encounterKey);
    }

    get faithXP (): number
    {
        return this.data.faithXP;
    }
}
