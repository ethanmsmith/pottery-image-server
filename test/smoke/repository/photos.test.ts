import { beforeEach, afterAll, describe, expect, test, jest } from '@jest/globals';
import photos from '../../../src/repository/photos.js';
import { assert } from 'console';

describe("Photos smoke: ", () => {
    test("has all()", () => {
        expect(photos).toHaveProperty('all');
    });
    test("has count()", () => {
        expect(photos).toHaveProperty("count");
    });
    test("has add()", () => {
        expect(photos).toHaveProperty("add");
    });
});