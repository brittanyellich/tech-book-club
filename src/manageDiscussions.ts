import { octokit } from './octokit';
import config, { Discussion } from './config';

// Function to post a GitHub discussion
async function postDiscussion(discussion: Discussion): Promise<void> {
    try {
        // const response = await octokit.graphql(`
        //     mutation CreateDiscussion($input: CreateDiscussionInput!) {
        //         createDiscussion(input: $input) {
        //             discussion {
        //                 id
        //                 url
        //             }
        //         }
        //     }
        // `, {
        //     input: {
        //         repositoryId: config.REPOSITORY_ID,
        //         categoryId: config.CATEGORY_ID,
        //         title: discussion.title,
        //         body: discussion.body
        //     }
        // });
        console.log("Posting discussion", discussion);

        // console.log(`Discussion created: ${(response as any).createDiscussion.discussion.url}`);
    } catch (error) {
        console.error(`Error creating discussion: ${error}`);
    }
}

export { postDiscussion };
