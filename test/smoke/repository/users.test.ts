import { beforeEach, afterAll, describe, expect, test, jest, it } from '@jest/globals';
import users from '../../../src/repository/users.js';
import { User } from '../../../src/_generated/graphql.js'
import { assert } from 'console';

describe("Users smoke: ", () => {
    test('should have a working all() method', () => {
        expect(users).toHaveProperty('all');
    });
    test("all() returns an array of users", () => {
        users.all().then(userArray => {
            expect(userArray).toBeInstanceOf(Array<User>);
        });
    });
    test("has count()", () => {
        expect(users).toHaveProperty("count");
    });
    test("count() returns a number", () => {
        users.count().then(numberOfUsers => {
            expect(numberOfUsers).toBeInstanceOf(Number);
        });
    });
    test("has get()", () => {
        expect(users).toHaveProperty("get");
    });
    test("get() returns a user", () => {
        users.get("").then(user => {
            expect(user).toBeInstanceOf(User);
        });
    });
    test("has addOrUpdate()", () => {
        expect(users).toHaveProperty("addOrUpdate");
    });
    test("addOrUpdate() returns a user", () => {
        users.addOrUpdate({}).then(user => {
            expect(user).toBeInstanceOf(User);
        });
    });
});