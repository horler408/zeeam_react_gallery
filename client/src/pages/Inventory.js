import React, {
    useContext,
    useEffect,
    useState
  } from 'react';
  
import { FetchContext } from '../context/FetchContext';
import InventoryItemForm from './../components/InventoryForm';
import DangerButton from './../components/common/DangerButton';
import Hyperlink from './../components/common/Hyperlink';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
  
// const InventoryItemContainer = ({ children }) => (
//   <div className="items_container">
//     {children}
//   </div>
// );
  
const InventoryItem = ({ item, onDelete }) => {
  return (
      <div className="inventory_item">
        <section className="card">
          <img
            src={item.imageUrl}
            alt="inventory"
          />
          <div className="item_wrapper">
              <p className="">
                {item.name}
              </p>
              <p className="">
                {item.description}
              </p>
              <p className="">
                {(item.price)}
              </p>
              <p className="">
                {(item.category)}
              </p>
          </div>
          <div className="">
            <DangerButton
              text="Delete"
              onClick={() => onDelete(item)}
            />
          </div>
        </section>
      </div>
  );
};
  
const NewInventoryItem = ({ onSubmit }) => {
  return (
      <section className="inventory_form">
        <p className="form_header">New Inventory Item</p>
        <InventoryItemForm onSubmit={onSubmit} />
      </section>
  );
};
  
const Inventory = () => {
  const fetchContext = useContext(FetchContext);
  const [inventory, setInventory] = useState([]);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  
  useEffect(() => {
    const getInventory = async () => {
      try {
        const { data } = await fetchContext.authAxios.get(
          'product'
        );
          console.log(data);
          setInventory(data);
        } catch (err) {
          console.log('the err', err);
        }
      };
  
    getInventory();
  }, [fetchContext]);
  
  const onSubmit = async (values, resetForm) => {
    try {
      const { data } = await fetchContext.authAxios.post(
          'product', values
        );
        setInventory([...inventory, data.inventoryItem]);
        resetForm();
        setSuccessMessage(data.message);
        setErrorMessage(null);
      } catch (err) {
        const { data } = err.response;
        setSuccessMessage(null);
        setErrorMessage(data.message);
    }
  };
  
  const onDelete = async item => {
    try {
        if (
          window.confirm(
            'Are you sure you want to delete this item?'
          )
        ) {
          const {
            data
          } = await fetchContext.authAxios.delete(
            `inventory/${item._id}`
          );
          setInventory(
            inventory.filter(
              item => item._id !== data.deletedItem._id
            )
          );
        }
    } catch (err) {
        const { data } = err.response;
        setErrorMessage(data.message);
    }
  };
  
  return (
    <div className="inventory_container">
        {successMessage && (<FormSuccess text={successMessage} />)}
        {errorMessage && <FormError text={errorMessage} />}
        <div className="form_container">
          <NewInventoryItem onSubmit={onSubmit} />
        </div>
        <div className="items_container">
          {inventory && inventory.length
            ? inventory.map(item => (
                  <InventoryItem
                    key={item._id}
                    item={item}
                    onDelete={onDelete}
                  />
              ))
            : 'No Inventory Items'}
        </div>
    </div>
  );
};
  
export default Inventory;
  