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
        setMessage('Produkt został dodany do koszyka');
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
            { message
                &&
                <div id="popup-modal" tabIndex="-1"
                     className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="p-4 md:p-5 flex flex-col items-center justify-center text-center">
                                <svg height={ 45 } version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"
                                     enableBackground="new 0 0 12 12">
                                    <circle fill="#4CAF50" cx="6" cy="6" r="5.25"/>
                                    <polygon fill="#CCFF90"
                                             points="8.65,3.65 5.25,7.05 3.85,5.65 3.15,6.35 5.25,8.45 9.35,4.35"/>
                                </svg>
                                <h3 className="my-5 text-lg font-normal text-gray-500 dark:text-gray-400">{ message }</h3>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductCatalog
