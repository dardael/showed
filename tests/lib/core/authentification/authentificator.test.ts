import Authentificator from 'showed/lib/core/authentification/authentificator';
import RepositoryInterface from 'showed/lib/core/authentification/repository';

class MockRepository implements RepositoryInterface {
    private data: Record<string, { createdAt: Date }> = {};

    public updateData(token: string, createdAt: Date) {
        if (this.data[token]) {
            this.data[token].createdAt = createdAt;
        }
    }

    public getData(token: string) {
        return this.data[token];
    }

    async getAuthentified(
        token: string
    ): Promise<{ token: string; createdAt: Date } | null> {
        return this.data[token] ? { token, ...this.data[token] } : null;
    }

    async createAuthentified(token: string) {
        this.data[token] = { createdAt: new Date() };
    }

    async deleteAuthentified(token: string) {
        delete this.data[token];
    }
}

describe('Authentificator', () => {
    let authentificator: Authentificator;
    let repository: MockRepository;

    beforeEach(() => {
        repository = new MockRepository();
        authentificator = new Authentificator(repository);
    });

    test('should create authentication if none exists', async () => {
        await authentificator.saveAuthentification('token1');
        const authentified = await repository.getAuthentified('token1');
        expect(authentified).not.toBeNull();
    });

    test('should delete and recreate authentication if older than one week', async () => {
        let oldDate = new Date();
        oldDate.setDate(oldDate.getDate() - 8);
        oldDate = new Date(oldDate.getTime());
        repository.createAuthentified('token2');
        repository.updateData('token2', oldDate);

        await authentificator.saveAuthentification('token2');
        const authentified = await repository.getAuthentified('token2');
        expect(authentified).not.toBeNull();
        expect(authentified?.createdAt.getTime()).toBeGreaterThan(
            oldDate.getTime()
        );
    });

    test('should not recreate authentication if less than one week old', async () => {
        const recentDate = new Date();
        recentDate.setDate(recentDate.getDate() - 5);
        repository.createAuthentified('token3');
        repository.updateData('token3', recentDate);

        await authentificator.saveAuthentification('token3');
        const authentified = await repository.getAuthentified('token3');
        expect(authentified).not.toBeNull();
        expect(authentified?.createdAt).toEqual(recentDate);
    });
});
