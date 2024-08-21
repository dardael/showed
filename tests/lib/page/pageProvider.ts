import Provider from 'showed/lib/page/pageProvider';
import type Repository from 'showed/lib/page/repository';
import type ComponentRepository from 'showed/lib/page/componentRepository';

describe('Provider', () => {
    let repository: Repository;
    let componentRepository: ComponentRepository;
    let provider: Provider;

    beforeEach(() => {
        repository = {} as any;
        componentRepository = {} as any;
        provider = new Provider(repository, componentRepository);
    });

    it('should generate correct URI from page title', () => {
        const title = 'Test Page 1';
        const expectedUri = 'test-page-1';

        const result = (provider as any).getUriFromPage(title);

        expect(result).toEqual(expectedUri);
    });

    it('should remove special characters from page title', () => {
        const title = 'Test@Page#1';
        const expectedUri = 'test-page-1';

        const result = (provider as any).getUriFromPage(title);

        expect(result).toEqual(expectedUri);
    });

    it('should replace spaces with hyphens in page title', () => {
        const title = 'Test Page 1';
        const expectedUri = 'test-page-1';

        const result = (provider as any).getUriFromPage(title);

        expect(result).toEqual(expectedUri);
    });

    it('should convert page title to lowercase', () => {
        const title = 'TestPage';
        const expectedUri = 'testpage';

        const result = (provider as any).getUriFromPage(title);

        expect(result).toEqual(expectedUri);
    });
    it('should replace accended characters with their base characters', () => {
        const title = 'Áccéntéd';
        const expectedUri = 'accented';

        const result = (provider as any).getUriFromPage(title);

        expect(result).toEqual(expectedUri);
    });
    it('should replace apostrophes with hyphens in page title', () => {
        const title = "Test'Page";
        const expectedUri = 'test-page';

        const result = (provider as any).getUriFromPage(title);

        expect(result).toEqual(expectedUri);
    });
});
