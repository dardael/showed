import { ThemeModel } from 'showed/lib/theme/models/theme';
import type { Theme } from 'showed/lib/theme/models/theme';
import RepositoryInterface from 'showed/lib/theme/repository';
import type Database from 'showed/lib/core/database/service/database';
import { Color } from '../../models/color';

export default class Repository implements RepositoryInterface {
    constructor(private database: Database) {
        this.database = database;
    }

    public async getTheme(): Promise<Theme> {
        const themes = await this.database.find<Theme>(ThemeModel, {
            limit: 1,
        });
        return themes.pop() as Theme;
    }

    public async createTheme(themeData: {
        color: Color;
        title?: string;
        description?: string;
    }): Promise<Theme> {
        return this.database.create<Theme>(ThemeModel, themeData);
    }

    public async updateTheme(
        id: string,
        themeData: {
            color: Color;
            title?: string;
            description?: string;
        }
    ): Promise<Theme> {
        return this.database.findByIdAndUpdate<Theme>(
            ThemeModel,
            id,
            themeData
        );
    }
}
