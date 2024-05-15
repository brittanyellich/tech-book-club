import { readFileSync } from 'fs';
import { addNewBookToRepo, convertBookClubToBook, finishBook } from './manageBooks';
import { postDiscussion } from './manageDiscussions';
import { isToday, isTodayOrBefore } from './time';
import { readdirSync } from 'fs';
import { join } from 'path';
import { BookClub, Discussion } from './config';

// Function to iterate through discussions in a JSON file

export async function processDiscussionsFile(file: string): Promise<void> {
    try {
        const data: string = readFileSync(file, 'utf8');
        const jsonData: BookClub = JSON.parse(data);
        console.log({ jsonData });
        const startDate: Date = new Date(jsonData.startDate);
        console.log({ startDate });
        if (!isTodayOrBefore(startDate)) {
            console.log("Hasn't started yet!");
            return;
        }
        const discussions: Discussion[] = jsonData.discussions;

        for (const discussion of discussions) {
            const discussionDate: Date = new Date(discussion.date);
            console.log("Discussion date: ", discussionDate);
            if (isToday(discussionDate)) {
                console.log("Today!");
                await postDiscussion(discussion);
            }

            // Check if this is the first discussion, if so add book to the repo
            if (discussion.id === discussions[0].id) {
                await addNewBookToRepo(convertBookClubToBook(jsonData));
            }

            if (discussion.id === discussions[discussions.length - 1].id) {
                console.log("Last discussion!");
                await finishBook(convertBookClubToBook(jsonData));
            }
        }
    } catch (error) {
        console.error(`Error processing file ${file}: ${error}`);
    }
}

// Function to iterate through all files in the ./config directory
export async function processConfigDirectory(): Promise<void> {
    const configDir: string = join(__dirname, '../config');

    try {
        const files: string[] = readdirSync(configDir);

        for (const file of files) {
            const filePath: string = join(configDir, file);
            await processDiscussionsFile(filePath);
        }
    } catch (error) {
        console.error(`Error reading config directory: ${error}`);
    }
}
