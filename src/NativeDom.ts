import { Application, Button, Page, StackLayout, Label, TextField, Switch, FlexboxLayout } from '@nativescript/core'
import { renderer as vdomRenderer } from '@dojo/framework/core/vdom';
import Map from '@dojo/framework/shim/Map';

class DomNode {
	private _tagname: string;
	private _childNodes = [];
	private _parentNode = undefined;
	private _instance = undefined;
	private _attributes = new Map<string, string>();
	constructor(tagname: string) {
		this._tagname = tagname;
		switch (tagname) {
			case 'body':
				this._instance = new Page();
			break;
			case "native-button":
				this._instance = new Button();
			break;
			case "native-switch":
				this._instance = new Switch();
			break;
			case "native-stack":
				this._instance = new StackLayout();
			break;
			case "native-label":
				this._instance = new Label();
			break;
			case "section":
				this._instance = new StackLayout();
			break;
			case "header":
				this._instance = new StackLayout();
				break;
				case "footer":
					this._instance = new StackLayout();
			break;
			case "input":
				this._instance = new TextField();
			break;
			case "label":
				this._instance = new StackLayout();
			break;
			case "button":
				this._instance = new StackLayout();
			break;
			case "section":
				this._instance = new StackLayout();
			break;
			case "header":
				this._instance = new StackLayout();
			break;
			case "h1":
				this._instance = new StackLayout();
			break;
			case "ul":
				this._instance = new StackLayout();
			break;
			case "span":
				this._instance = new Label();
			default:
				this._instance = new FlexboxLayout();
		}
	}
	get childNodes() {
		return this._childNodes;
	}
	get children() {
		return this._childNodes;
	}
	set children(children: any[]) {
		this._childNodes = children;
	}
	get parentNode() {
		return this._parentNode;
	}
	set parentNode(node: any) {
		this._parentNode = node;
	}
	get parentElement() {
		return this._parentNode;
	}
	get tagName() {
		return this._tagname;
	}
	get __instance__() {
		return this._instance;
	}
	insertBefore(newNode: any, refNode: any) {
		if (refNode) {
			const index = this.children.indexOf(refNode);
			this.children.splice(index, 0, newNode);
			newNode.parentNode = parent;
			this.__instance__.insertChild(newNode.__instance__, index);
		} else {
			this.appendChild(newNode);
		}
	}
	appendChild(child: any) {
		this.children.push(child);
		child.parentNode = this;
		if (this._instance instanceof Page) {
			this._instance.content = child.__instance__;
		} else {
			this._instance.addChild(child.__instance__);
		}
	}
	replaceChild(newChild: any, oldChild: any) {
		const index = this.children.indexOf(oldChild);
		oldChild.parentNode = undefined;
		this.children.splice(index, 1, newChild);
	}
	removeChild(child: any) {
		const index = this.children.indexOf(child);
		this.children.splice(index, 1);
		child.parentNode = undefined;
		if (this._instance instanceof Page) {
			this._instance.content = null
		} else {
			this._instance.removeChild(child.__instance__);
		}
	}
	getAttribute(key: string) {
		return this._attributes.get(key);
	}
	removeAttribute(key: string) {
		this._attributes.delete(key);
		this._instance[key] = null;
	}
	setAttribute(key: string, value: string) {
		this._attributes.set(key, value);
		if (this._instance) {
			this._instance[key] = value;
		}
	}
	addEventListener(type: string, callback: any) {
		this._instance.on(type, callback);
	}
	removeEventListener(type: string, callback: any) {
		this._instance.off(type, callback);
	}
	focus() {
	}
	blur() {
	}
	click() {
	}
}
class Document {
	private _body: DomNode
	constructor() {
		this._body = new DomNode('body');
	}
	createElement(tagname: string) {
		return new DomNode(tagname);
	}
	createTextNode(text: string) {
		const node = new DomNode('native-label');
		node.setAttribute('text', text);
		return node;
	}
	get body() {
		return this._body;
	}
}

export const renderer = (func: any) => {
	const r = vdomRenderer(func);
	const document = new Document();
	return {
		mount() {
			r.mount({ ownerDocument: document });
			Application.run({ create: () => document.body.__instance__ });
		}
	}
}
