import { useEffect, useState } from 'react';
import { db } from "../../configs/firebase";
import { doc, getDoc } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PF6II08fB3svemS23bJNsoFfqys8gBus2wHDqpUgM2is6AAZrY8Ft5jrQTDQd9OgTlJoMWN3Mu5fYUC2bJ0nXuT006xVUxgLy'); // Replace with your publishable key

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    // Handle the click event when the user clicks the "Checkout" button
  const handleClick = async (product_name, product_price) => {
    const stripe = await stripePromise;

    // Send a request to the backend to create a checkout session
    const response = await fetch('http://34.126.140.108/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_name, product_price }), // Send product name and price to the backend
    });

    if (response.ok) {
      // If the request is successful, retrieve the session ID from the response
      const session = await response.json();

      // Redirect the user to the Stripe Checkout page using the session ID
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        // If there is an error during the redirect, display the error message
        setError(result.error.message);
      }
    } else {
      // If there is an error creating the checkout session, display an error message
      setError('Error creating checkout session');
    }
  };
    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const productDocRef = doc(db, "products", id);
                const productDocSnapshot = await getDoc(productDocRef);
                if (productDocSnapshot.exists()) {
                    setProduct({ id: productDocSnapshot.id, ...productDocSnapshot.data() });
                } else {
                    console.log("No such product exists!");
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        getProductDetails();
    }, [id]);

    


    return (
        <div className='item'>
            <Link to='/'><button className='button'>Back</button></Link>
            {product ? (
                <div>
                    <img src={product.product_image} style={{ width: 180 }} alt={product.product_name} />
                    <h1>Item Name: {product.product_name}</h1>
                    <h2>Description: {product.product_description}</h2>
                    <h2>Price: {product.product_price}</h2>
                    <button onClick={()=>handleClick(product.product_name, product.product_price*100)}>Checkout</button>
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
}

export default ProductDetails;
