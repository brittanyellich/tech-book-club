import { Octokit } from '@octokit/rest';
import { octokit } from '../src/octokit';

describe('octokit', () => {
    it('should be initialized', () => {
        expect(octokit).toBeDefined();
        expect(octokit).toBeInstanceOf(Octokit);
    })
});
