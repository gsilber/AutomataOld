export interface MyInputDecorator {
    (bindingPropertyName?: string): any;
    new (bindingPropertyName?: string): any;
}

export interface MyInput {
    bindingPropertyName?: string;
}
export declare const MyInput: MyInputDecorator;
