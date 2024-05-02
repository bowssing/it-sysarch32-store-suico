import { useEffect, useState } from 'react';
import { db } from "../../configs/firebase";
import { getDocs, collection, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Products() {
  
    const [productList, setProductList] = useState([]);

    const productsCollectionRef = collection(db, "products")

    useEffect(() => {
        const getProductList = async () => {

            try {
            const data = await getDocs(productsCollectionRef);
            const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id,}));
            setProductList(filteredData);
            } catch (err) {
                console.error(err);
            }
        };

        getProductList();
    }, []);

    return (
      
      <div>
          {productList.map((product) => (
            
              <div key={product.id} className='items'>
                
                  <div >
                  <img className='image' src={product.product_image} alt={product.product_name} />
                  <h1>{product.product_name}</h1>
                  <p className='price'>{product.product_price}</p>
                  <Link to={`/product/${product.id}`}>
                      <button>View Product</button>
                  </Link>
                  </div>
                  </div>
                    
          ))}
      </div>
      
  );
}

export default Products
