import { beforeEach, afterAll, describe, expect, test, jest } from '@jest/globals';
import tags from '../../../src/repository/tags.js';

describe("Users smoke: ", () => {
    test("has all()", () => {
        expect(tags).toHaveProperty('all');
    });
    test("has count()", () => {
        expect(tags).toHaveProperty("count");
    });
});