import config, { Book, BookClub } from '../src/config';
import { convertBookClubToBook, addNewBookToRepo, finishBook } from '../src/manageBooks';
import { octokit } from '../src/octokit';

jest.mock('../src/octokit');

describe('manageBooks', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('convertBookClubToBook', () => {
        it('should convert a BookClub object to a Book object', () => {
            const bookClub: BookClub = {
                title: 'Book Club Title',
                author: 'Book Club Author',
                description: 'Book Club Description',
                startDate: '2022-01-01',
                label: 'book-club',
                issueUrl: 'test-url',
                categories: ['Fiction', 'Science Fiction'],
                discussions: [
                    {
                        id: '1',
                        date: '2022-01-01',
                        title: 'Discussion Title',
                        body: 'Discussion Body'
                    }
                ],
            };

            const expectedBook: Book = {
                title: 'Book Club Title',
                author: 'Book Club Author',
                url: 'https://github.com/test/repo/discussions?discussions_q=label%3Abook-club',
                startDate: new Date('2022-01-01'),
                categories: 'Fiction, Science Fiction',
                issueUrl: 'test-url',
            };

            const convertedBook = convertBookClubToBook(bookClub);

            expect(convertedBook).toEqual(expectedBook);
        });
    });

    describe('addNewBookToRepo', () => {
        describe('addNewBookToRepo', () => {
            it('should add a new book to the repository', async () => {
                const book: Book = {
                    title: 'New Book Title',
                    author: 'New Book Author',
                    url: 'Test URL',
                    startDate: new Date('2022-01-01'),
                    categories: 'Fiction, Science Fiction',
                    issueUrl: 'test-url',
                };

                // Mock the return value of octokit.repos.getContent
                jest.spyOn(octokit.repos, 'getContent').mockResolvedValue({
                    data: {
                        type: 'file',
                        encoding: 'base64',
                        size: 0,
                        name: 'existing-file',
                        path: 'existing-path',
                        content: Buffer.from('existing content').toString('base64'),
                        sha: 'existing-sha',
                        url: '',
                        git_url: null,
                        html_url: null,
                        download_url: null,
                        _links: {
                            git: null,
                            html: null,
                            self: ''
                        },
                    },
                    headers: {},
                    status: 200,
                    url: ''
                });

                await addNewBookToRepo(book);

                expect(octokit.repos.createOrUpdateFileContents).toHaveBeenCalledTimes(1);
                expect(octokit.repos.createOrUpdateFileContents).toHaveBeenCalledWith({
                    owner: config.OWNER,
                    repo: config.REPO,
                    path: "books.md",
                    message: 'Add New Book Title to the repository',
                    content: 'ZXhpc3RpbmcgY29udGVudAp8IFtOZXcgQm9vayBUaXRsZV0oVGVzdCBVUkwpIHwgTmV3IEJvb2sgQXV0aG9yIHwgRnJpIERlYyAzMSAyMDIxIDE2OjAwOjAwIEdNVC0wODAwIChQYWNpZmljIFN0YW5kYXJkIFRpbWUpIHwgRmljdGlvbiwgU2NpZW5jZSBGaWN0aW9uIHw=',
                });
            });
        });
    });

    describe('finishBook', () => {
        it('should mark a book as finished in the repository', async () => {
            const book: Book = {
                title: 'Finished Book Title',
                author: 'Finished Book Author',
                url: 'Test URL',
                startDate: new Date('2022-01-01'),
                categories: 'Fiction, Science Fiction',
                issueUrl: 'test-url/4',
            };

            await finishBook(book);

            expect(octokit.issues.update).toHaveBeenCalledTimes(1);
            expect(octokit.issues.update).toHaveBeenCalledWith({
                owner: config.OWNER,
                repo: config.REPO,
                issue_number: 4,
                state: 'closed'
            });
        });
    });
});
