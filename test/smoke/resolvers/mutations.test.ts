import { beforeEach, afterAll, describe, expect, test, jest } from '@jest/globals';
import mutations from '../../../src/resolvers/mutations.js';

describe("Users smoke: ", () => {
    test("has all()", () => {
        expect(mutations).toHaveProperty('githubAuth');
    });
    test("has count()", () => {
        expect(mutations).toHaveProperty("postPhoto");
    });
});