import { beforeEach, afterAll, describe, expect, test } from '@jest/globals';
import users from '../../../src/repository/users.js';
import { User } from '../../../src/_generated/graphql.js'

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
            expect(typeof numberOfUsers).toBe("number")
        });
    });
    test("has get()", () => {
        expect(users).toHaveProperty("get");
    });
    test("get() returns a user", () => {
        users.get("testToken").then(user => {
            expect(user).toHaveProperty("name");
            expect(user.name).toBe("testName")
        });
    });
    test("has addOrUpdate()", () => {
        expect(users).toHaveProperty("addOrUpdate");
    });
    test("addOrUpdate() returns a user", () => {
        users.addOrUpdate({ user: { avatar: "testAvatar.jpg", githubLogin: "testGithubLogin", name: "testName" }, token: "testToken" }).then(user => {
            expect(user).toHaveProperty("name");
            expect(user.name).toBe("testName");
        });
    });
});