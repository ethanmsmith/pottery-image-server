import { beforeEach, afterAll, describe, expect, test, jest } from '@jest/globals';
import tags from '../../../src/repository/tags.js';
import { Tag } from '_types/tags.js';

describe("Users smoke: ", () => {
    test("has all()", () => {
        expect(tags).toHaveProperty('all');
    });
    test("all() returns tags", () => {
        tags.all().then(tags => {
            expect(tags).toBeInstanceOf(Array<Tag>)
        });
    });
    test("has count()", () => {
        expect(tags).toHaveProperty("count");
    });
    test("count() returns a number", () => {
        tags.count().then(count => {
            expect(typeof count).toBe("number");
        });
    });
});