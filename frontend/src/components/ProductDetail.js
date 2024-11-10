import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id);
                setProduct(response.data);
            } catch (err) {
                setError('Error fetching product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center text-danger mt-5">{error}</div>;

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card p-4 shadow" style={{ maxWidth: '500px' }}>
                <h2 className="text-center">{product.name}</h2>
                <img src={product.image} alt={product.name} className="img-fluid mb-3" style={{ maxWidth: '100%', height: 'auto' }} />
                <p>{product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <div className="d-flex justify-content-center mt-3">
                    <Link to="/productlist" className="btn btn-primary">
                        <i className="bi bi-arrow-left-circle"></i> Back
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;