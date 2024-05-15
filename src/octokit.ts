import { Octokit } from '@octokit/rest';
import config from './config';

export const octokit = new Octokit({
    auth: config.GITHUB_TOKEN
});