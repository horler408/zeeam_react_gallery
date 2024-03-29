import React, {
    useContext,
    useEffect,
    useState
  } from 'react';
  
//import Axios from 'axios';
import { FetchContext } from '../context/FetchContext';
import InventoryItemForm from './../components/InventoryForm';
import DangerButton from './../components/common/DangerButton';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
import Preloader from './../components/common/Preloader';
  
  
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
            <div className="">
              <DangerButton
                text="Delete"
                onClick={() => onDelete(item)}
              />
            </div>
          </div>
        </section>
      </div>
  );
};
  
const NewInventoryItem = ({ onSubmit }) => {
  return (
      <section className="inventory_form">
        <p className="form_header">New Inventory Item</p>
        <InventoryItemForm handleSubmit={onSubmit} />
      </section>
  );
};
  
const Inventory = () => {
  const fetchContext = useContext(FetchContext);
  const [inventory, setInventory] = useState([]);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  let [formDisplay, setFormDisplay] = useState("none");
  const[btnDisplay, setBtnDisplay] = useState("block");
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const getInventory = async () => {
      try {
        setLoading(true)
        const { data } = await fetchContext.authAxios.get(
          'product'
        );
          //console.log(data);
          setInventory(data.results);
          setLoading(false)
        } catch (err) {
          console.log('the err', err);
          setLoading(false);
        }
      };
  
    getInventory();
  }, [fetchContext]);
  
  const onSubmit = async (values, resetForm) => {
    // const { data } = await Axios.post('api/product', values)
    // resetForm();
    // console.log(data.message);
    try {
      const { data } = await fetchContext.authAxios.post(
          'product', values
        );
        console.log(data);
        setInventory([...inventory, data.inventoryItems]);
        resetForm();
        setSuccessMessage(data.message);
        setErrorMessage(null);
        setFormDisplay("none");
      } catch (err) {
        const { data } = err.response;
        setSuccessMessage(null);
        setErrorMessage(data.message);
    }
  };
  
  const onDelete = async item => {
    try {
        if (window.confirm('Are you sure you want to delete this item?')) {
          const { data } = await fetchContext.authAxios.delete(
            `product/${item._id}`
          );
          const filteredInventory = inventory.filter(item => {
            return item._id !== data.product._id
          })
          setInventory(filteredInventory);
          setSuccessMessage(data.message);
        }
    } catch (err) {
        const { data } = err.response;
        setErrorMessage(data.message);
    }
  };

  const handleFormDisplay = () => {
    setFormDisplay("block");
    setBtnDisplay("none");
  }
  
  return (
    <div className="inventory_container">
        {successMessage && (<FormSuccess text={successMessage} />)}
        {errorMessage && <FormError text={errorMessage} />}
        <div className="form_container" style={{display: formDisplay}}>
          <NewInventoryItem onSubmit={onSubmit} />
        </div>
        <button className="new-btn" onClick={() => handleFormDisplay()} style={{display: btnDisplay}}>
          New Inventory
        </button>
        <div className="items_container">
          {loading && <Preloader />}
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
  