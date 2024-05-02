import { useEffect, useState } from 'react';
import { db } from "../../configs/firebase";
import { doc, getDoc } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

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
                    
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
}

export default ProductDetails;
