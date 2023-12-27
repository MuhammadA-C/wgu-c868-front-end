import { useEffect, useState } from "react";
import MenuItem from "../../../model/MenuItem";
import Table from "../../../components/table-2/Table";
import styles from "./Menu.module.css";

interface IMenuItemJSON {
  status: string;
  results: number;
  data: Array<IMenuItem>;
}

interface IMenuItem {
  menu_item_id: number;
  name: string;
  description: string;
  picture: string;
  price: number;
}

function MenuPage() {
  const arrayOfMenuItems: MenuItem[] = []; // Will be passed into the setMenuItems
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [updateTable, setUpdateTable] = useState("");

  useEffect(() => {
    // API call to get the menu items
    fetch("http://localhost:3001/api/v1/menu-items")
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else if (response.status == 204) {
          /* 
            Returning back an empty object when the API returns back a 204 for no data in database.
            This is needed so that the UI updates to display an empty table.
          */
          let data: IMenuItemJSON = {
            status: String(response.status),
            results: 0,
            data: [],
          };

          return data;
        }
        throw new Error("Status Code: " + response.status);
      })
      .then((data: IMenuItemJSON) => {
        for (let i = 0; i < data.data.length; i++) {
          // Destructering the object to get the properties
          const { menu_item_id, name, description, picture, price } =
            data.data[i];

          const menuItemObj = new MenuItem(name, description, picture, price);
          menuItemObj._menuItemID = menu_item_id;

          arrayOfMenuItems.push(menuItemObj);
        }
        setMenuItems(arrayOfMenuItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateTable]);

  return (
    <div className={styles.container}>
      <div className={styles["table-nav"]}>
        <h2>Menu Items</h2>
      </div>
      <Table tableItems={menuItems}></Table>
    </div>
  );
}

export { MenuPage };
