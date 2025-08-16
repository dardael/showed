import Provider from 'showed/lib/page/pageProvider';
import type PageRepositoryInterface from 'showed/lib/page/pageRepository';
import type BlockRepositoryInterface from 'showed/lib/page/blockRepository';
import type ComponentRepositoryInterface from 'showed/lib/page/componentRepository';
import type FileProviderInterface from 'showed/lib/file/service/provider';
import { SortDirection } from 'showed/lib/page/models/sortDirection';

describe('Provider', () => {
    let pageRepository: PageRepositoryInterface;
    let blockRepository: BlockRepositoryInterface;
    let componentRepository: ComponentRepositoryInterface;
    let fileProvider: FileProviderInterface;
    let provider: Provider;

    beforeEach(() => {
        pageRepository = {} as PageRepositoryInterface;
        blockRepository = {} as BlockRepositoryInterface;
        fileProvider = {} as FileProviderInterface;
        componentRepository = {} as ComponentRepositoryInterface;
        provider = new Provider(
            pageRepository,
            blockRepository,
            componentRepository,
            fileProvider
        );
    });

    it('should move a page up in position', async () => {
        const pages = [
            { _id: '1', title: 'Page 1', position: 1, urlPart: 'page-1' },
            { _id: '2', title: 'Page 2', position: 2, urlPart: 'page-2' },
        ];
        // Removed unused 'direction' as it's not necessary
        pageRepository.getPages = jest.fn().mockResolvedValue(pages);
        pageRepository.updatePage = jest.fn();

        const result = await provider.movePage(pages[1], SortDirection.UP);

        expect(pageRepository.updatePage).toHaveBeenCalledWith('2', {
            position: 1,
        });
        expect(pageRepository.updatePage).toHaveBeenCalledWith('1', {
            position: 2,
        });
        expect(result).toEqual([
            { ...pages[1], position: 1 },
            { ...pages[0], position: 2 },
        ]);
    });

    it('should throw an error when moving a page up at the top', async () => {
        const pages = [
            { _id: '1', title: 'Page 1', position: 1, urlPart: 'page-1' },
        ];
        pageRepository.getPages = jest.fn().mockResolvedValue(pages);

        await expect(
            provider.movePage(pages[0], SortDirection.UP)
        ).rejects.toThrow('Cannot move page up');
    });

    it('should move a page down in position', async () => {
        const pages = [
            { _id: '1', title: 'Page 1', position: 1, urlPart: 'page-1' },
            { _id: '2', title: 'Page 2', position: 2, urlPart: 'page-2' },
        ];
        pageRepository.getPages = jest.fn().mockResolvedValue(pages);
        pageRepository.updatePage = jest.fn();

        const result = await provider.movePage(pages[0], SortDirection.DOWN);

        expect(pageRepository.updatePage).toHaveBeenCalledWith('1', {
            position: 2,
        });
        expect(pageRepository.updatePage).toHaveBeenCalledWith('2', {
            position: 1,
        });
        expect(result).toEqual([
            { ...pages[1], position: 1 },
            { ...pages[0], position: 2 },
        ]);
    });

    it('should throw an error when moving a page down at the bottom', async () => {
        const pages = [
            { _id: '1', title: 'Page 1', position: 1, urlPart: 'page-1' },
        ];
        pageRepository.getPages = jest.fn().mockResolvedValue(pages);

        await expect(
            provider.movePage(pages[0], SortDirection.DOWN)
        ).rejects.toThrow('Cannot move page down');
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
