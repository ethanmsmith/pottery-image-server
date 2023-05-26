import { beforeEach, afterAll, describe, expect, test, jest } from '@jest/globals';
import queries from '../../../src/resolvers/queries.js';

describe("Users smoke: ", () => {
    test("has allPhotos()", () => {
        expect(queries).toHaveProperty('allPhotos');
    });
    test("has allUsers()", () => {
        expect(queries).toHaveProperty("allUsers");
    });
    test("has totalUsers()", () => {
        expect(queries).toHaveProperty("totalUsers");
    });
    test("has totalPhotos()", () => {
        expect(queries).toHaveProperty("totalPhotos");
    });
    test("has me()", () => {
        expect(queries).toHaveProperty("me");
    });
});