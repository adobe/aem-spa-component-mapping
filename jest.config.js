'use strict';

module.exports = {
    preset: "ts-jest",
    setupFilesAfterEnv: [],
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    testMatch: ['<rootDir>/**/*.test.ts'],
    testPathIgnorePatterns: ['node_modules','lib', 'dist', 'node'],
    collectCoverageFrom: [
        '**/*.ts'
    ],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/lib/",
        "/dist/",
        "/node/",
        "src/types.ts",
        "src/aem-spa-component-mapping.ts"
    ],
    moduleFileExtensions: [
        "ts",
        "js",
        "json",
        "node"
    ]
};
