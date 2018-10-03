import { Button } from "./app-config";
import { TextModel } from "./text-model";

export class ButtonModel {
    text: TextModel
    style: { 'background-color': string; "border-color": string }
    icon: string[]

    constructor(json: Button) {
        this.text = new TextModel(json.text)
        this.style = { 'background-color' : json.color || "", "border-color": json.color }
        this.icon = json.icon.split("-") || ["fa", "question"]
    }

    getText(){
        return this.text.getText()
    }

    getButtonText(){
        return this.text.getText()
    }

    getButtonTextStyle(){
        return this.text.getStyle()
    }

    getStyle(){
        return this.style
    }

    getIcon(){
        return this.icon
    }
}
