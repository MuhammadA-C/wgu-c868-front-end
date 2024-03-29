import Item from "./Item";

class MenuItem extends Item {
  _menuItemID?: number;
  _description: string;
  _picture: string;

  constructor(
    name: string,
    description: string,
    picture: string,
    price: number
  ) {
    super(name, price);
    this._description = description;
    this._picture = picture;
  }

  get menuItemID(): number {
    if (this._menuItemID != undefined) {
      return this._menuItemID;
    }
    return -1; // -1 will be used to let the user know that the id was never set
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get picture(): string {
    return this._picture;
  }

  get price(): number {
    return this._price;
  }

  set menuItemID(menuItemID: number) {
    this._menuItemID = menuItemID;
  }

  set name(name: string) {
    this._name = name;
  }

  set description(description: string) {
    this._description = description;
  }

  set picture(picture: string) {
    this._picture = picture;
  }

  set price(price: number) {
    this._price = price;
  }
}

export default MenuItem;
