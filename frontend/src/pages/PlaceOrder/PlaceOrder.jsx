import React, { useContext, useState, useEffect } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, setCartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const [showForm, setShowForm] = useState(true); // State to control form visibility

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      userId: token,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 18,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;

        // Clear the cart items after placing the order
        setCartItems({}); // Assuming cartItems is an object with item IDs as keys

        setShowForm(false); // Hide the form after successful submission
        window.location.replace(session_url); // Redirect to payment session
      } else {
        alert("Error in placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`) // Replace with your actual API key
          .then(response => response.json())
          .then(data => {
            if (data.status === "OK") {
              const addressComponents = data.results[0].address_components;
              const street = addressComponents.find(component => component.types.includes("route"))?.long_name || '';
              const city = addressComponents.find(component => component.types.includes("locality"))?.long_name || '';
              const state = addressComponents.find(component => component.types.includes("administrative_area_level_1"))?.long_name || '';
              const zipcode = addressComponents.find(component => component.types.includes("postal_code"))?.long_name || '';
              const country = addressComponents.find(component => component.types.includes("country"))?.long_name || '';

              setData(prevData => ({
                ...prevData,
                street,
                city,
                state,
                zipcode,
                country,
              }));
            } else {
              alert("Could not retrieve address. Please fill it in manually.");
            }
          })
          .catch(error => {
            console.error("Error fetching the address:", error);
            alert("Could not retrieve address. Please fill it in manually.");
          });
      }, (error) => {
        console.error("Error getting location:", error);
        alert("Could not retrieve location. Please allow location access.");
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  if (!showForm) {
    return <p>Redirecting to payment...</p>; // You can customize this message
  }

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' />
          <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
        <button type="button" onClick={getLocation}>Detect Location</button> {/* Button to get location */}
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 18}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 18}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
