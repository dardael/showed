import Provider from 'showed/lib/page/pageProvider';
import type PageRepositoryInterface from 'showed/lib/page/pageRepository';
import type BlockRepositoryInterface from 'showed/lib/page/blockRepository';
import type FileProviderInterface from 'showed/lib/file/service/provider';

describe('Provider', () => {
    let pageRepository: PageRepositoryInterface;
    let blockRepository: BlockRepositoryInterface;
    let fileProvider: FileProviderInterface;
    let provider: Provider;

    beforeEach(() => {
        pageRepository = {} as PageRepositoryInterface;
        blockRepository = {} as BlockRepositoryInterface;
        fileProvider = {} as FileProviderInterface;
        provider = new Provider(pageRepository, blockRepository, fileProvider);
    });

    it('should generate correct URI from page title', () => {
        const title = 'Test Page 1';
        const expectedUri = 'test-page-1';

        const result = provider['getUriFromPage'](title);

        expect(result).toEqual(expectedUri);
    });

    it('should remove special characters from page title', () => {
        const title = 'Test@Page#1';
        const expectedUri = 'test-page-1';

        const result = provider['getUriFromPage'](title);

        expect(result).toEqual(expectedUri);
    });

    it('should replace spaces with hyphens in page title', () => {
        const title = 'Test Page 1';
        const expectedUri = 'test-page-1';

        const result = provider['getUriFromPage'](title);

        expect(result).toEqual(expectedUri);
    });

    it('should convert page title to lowercase', () => {
        const title = 'TestPage';
        const expectedUri = 'testpage';

        const result = provider['getUriFromPage'](title);

        expect(result).toEqual(expectedUri);
    });
    it('should replace accended characters with their base characters', () => {
        const title = 'Áccéntéd';
        const expectedUri = 'accented';

        const result = provider['getUriFromPage'](title);

        expect(result).toEqual(expectedUri);
    });
    it('should replace apostrophes with hyphens in page title', () => {
        const title = "Test'Page";
        const expectedUri = 'test-page';

        const result = provider['getUriFromPage'](title);

        expect(result).toEqual(expectedUri);
    });
});
