import { ConfigComponent } from "../components/config/config.component";

declare module ConfigComponent {

    export interface Welcome {
        enable: string;
        msg: string;
        background: string;
        next: string;
    }

    export interface Register {
        enable: string;
        msg: string;
        background: string;
        next: string;
    }

    export interface Quiz {
        enable: string;
        msg: string;
        background: string;
        next: string;
    }

    export interface Jackpot {
        enable: string;
        msg: string;
        background: string;
        objects: string[];
        next: string;
    }

    export interface Photo {
        enable: string;
        msg: string;
        background: string;
        options: string[];
        next: string;
    }

    export interface Greatings {
        enable: string;
        msg: string;
        background: string;
        next: string;
    }

    export interface Details {
        welcome: Welcome;
        register: Register;
        quiz: Quiz;
        jackpot: Jackpot;
        photo: Photo;
        greatings: Greatings;
    }

    export interface Config {
        pages: string[];
        details: Details;
    }

}