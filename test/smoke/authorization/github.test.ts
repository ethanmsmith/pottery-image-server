import { beforeEach, afterAll, describe, expect, test, jest } from '@jest/globals';
import { authorizeWithGithub } from '../../../src/authorization/github.js'

const OLD_ENV = process.env;

beforeEach(() => {
    // MOST IMPORTANT THING IS 👇
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
});

afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
});

describe('Authorization smoke test', () => {
    test('authorizeWithGithub', () => {
        authorizeWithGithub({ client_id: "", client_secret: "", code: "" }).then(resp => {
            expect(resp).toEqual({ "documentation_url": "https://docs.github.com/rest", "message": "Bad credentials" });
        }).catch(reason => {
            expect(reason).toEqual({
                "message": "Requires authentication",
                "documentation_url": "https://docs.github.com/rest/reference/users#get-the-authenticated-user"
            });
        });
    });
});

describe('Github authorization', () => {
    test('When invoking authorizeWithGithub, it should return a user and an access token', async () => {
        const client_id = process.env.CLIENT_ID;
        const client_secret = process.env.CLIENT_SECRET;
        const code = process.env.CODE

        const resp = await authorizeWithGithub({ client_id, client_secret, code });

        expect(resp.access_token).not.toBeUndefined;
    });
});