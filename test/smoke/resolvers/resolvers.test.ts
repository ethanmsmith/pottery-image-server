import { beforeEach, afterAll, describe, expect, test, jest } from '@jest/globals';
import resolvers from '../../../src/resolvers';

describe("Users smoke: ", () => {
    test("has Query", () => {
        expect(resolvers).toHaveProperty('Query');
    });
    test("has Mutation", () => {
        expect(resolvers).toHaveProperty("Mutation");
    });
    test("has Photo", () => {
        expect(resolvers).toHaveProperty("Photo");
    });
    test("has User", () => {
        expect(resolvers).toHaveProperty("User");
    });
    test("has DateTime", () => {
        expect(resolvers).toHaveProperty("DateTime");
    });
});