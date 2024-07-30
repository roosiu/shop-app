import { useEffect, useState } from 'react'
function ProductCatalog({addToCart}) {
    const [products, setProducts] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch('https://api.jsonbin.io/v3/b/6697d477e41b4d34e41334b5', {
            headers: {
                'x-access-key': import.meta.env.VITE_X_ACCESS_KEY,
            }
        })
            .then(response => response.json())
            .then(data => setProducts(data.record.products))
            .catch(error => console.error('Error fetching products:', error));
    }, [])

    const handleAddToCart = (product) => {
        addToCart(product);
        setMessage('Twój produkt jest w koszyku');
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    return (
        <div>
            <h2 className='text-2xl font-bold mb-4'>Nasze bestsellery</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    products.map(product => (
                        <div key={ product.id } className='border rounded-lg p-4 shadow-md'>
                            <img src={ product.image } alt={ product.name } className='w-full h-48 object-cover mb-4'/>
                            <h3 className='font-bold text-lg'>{ product.name }</h3>
                            <p className='text-gray-600'>{ product.category }</p>
                            <p className='text-green-600 font-bold'>{ product.price }</p>
                            <button
                                onClick={ () => handleAddToCart(product) }
                                className='mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
                                Dodaj do koszyka
                            </button>
                        </div>
                    )) }
            </div>
            { message && <div className='message'>{ message }</div> }
        </div>
    )
}

export default ProductCatalog
