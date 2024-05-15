import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const config = {
    // Define your default values here
    GITHUB_TOKEN: process.env.GITHUB_TOKEN || "",
    REPOSITORY_ID: process.env.REPOSITORY_ID || "",
    CATEGORY_ID: process.env.CATEGORY_ID || "",
    REPO: process.env.REPO || "",
    OWNER: process.env.OWNER || "",
};

export type Discussion = {
    id: string;
    date: string;
    title: string;
    body: string;
}

export type BookClub = {
    title: string;
    author: string;
    description: string;
    startDate: string;
    label: string;
    issueUrl: string;
    categories: string[];
    discussions: Discussion[];
};

export type Book = {
    title: string;
    url: string;
    author: string;
    startDate: Date;
    categories: string;
    issueUrl: string;
}

export default config;