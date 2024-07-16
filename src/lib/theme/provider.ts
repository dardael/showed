import ProviderInterface from 'showed/lib/theme/service/provider';
import type Repository from 'showed/lib/theme/repository';
import type { Theme } from 'showed/lib/theme/models/theme';
import { Color } from './models/color';

export default class Provider implements ProviderInterface {
    constructor(private repository: Repository) {
        this.repository = repository;
    }

    public async createTheme(themeData: { color: Color }): Promise<Theme> {
        return this.repository.createTheme(themeData);
    }

    public async updateTheme(
        id: string,
        update: { color: Color }
    ): Promise<Theme> {
        return this.repository.updateTheme(id, update);
    }
    public async getTheme(): Promise<Theme> {
        const themes = await this.repository.getTheme();
        return themes;
    }
}
