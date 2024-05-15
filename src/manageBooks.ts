import config, { Book, BookClub } from './config';
import { octokit } from './octokit';

export const convertBookClubToBook = (bookClub: BookClub): Book => {
    return {
        title: bookClub.title,
        url: `https://github.com/${config.OWNER}/${config.REPO}/discussions?discussions_q=label%3A${bookClub.label}`,
        author: bookClub.author,
        startDate: new Date(bookClub.startDate),
        categories: bookClub.categories.join(', '),
        issueUrl: bookClub.issueUrl
    };
}

export async function addNewBookToRepo(book: Book): Promise<void> {
    try {
        // Get books.md file from repo
        const bookFile = await octokit.repos.getContent({
            owner: config.OWNER,
            repo: config.REPO,
            path: "books.md"
        });

        // Append the new book to the file
        const bookContent = Buffer.from((bookFile.data as any).content, 'base64').toString();
        const newBook = `\n| [${book.title}](${book.url}) | ${book.author} | ${book.startDate} | ${book.categories} |`;
        const newContent = bookContent + newBook;

        // Update the file in the repo
        await octokit.repos.createOrUpdateFileContents({
            owner: config.OWNER,
            repo: config.REPO, // Provide a default value for the REPO environment variable
            path: "books.md",
            message: `Add ${book.title} to the repository`,
            content: Buffer.from(newContent).toString('base64'),
        });
    } catch (error) {
        console.error(`Error adding book to repo: ${error}`);
    }
}

export async function finishBook(book: Book): Promise<void> {
    try {
        // Close issue by issue url using octokit
        const issueUrl = book.issueUrl;
        const issueNumber = issueUrl.split('/').pop();
        await octokit.issues.update({
            owner: config.OWNER,
            repo: config.REPO,
            issue_number: parseInt(issueNumber as string),
            state: 'closed'
        });
    } catch (error) {
        console.error(`Error finishing book: ${error}`);
    }
}
