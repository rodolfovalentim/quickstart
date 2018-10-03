import { Text } from "./app-config";

// interface IStyle {
//     'color': string
//     'font-family': string
// }

export class TextModel {
    text: string
    style: {
        'color': string
        'font-family': string
    }

    constructor(json: Text) {
        this.text = json.text || ""
        this.style = { "color" : json.color || "" , "font-family" : json.fontName || "" }
    }

    getText() {
        return this.text
    }

    getStyle() {
        return this.style
    }
}
