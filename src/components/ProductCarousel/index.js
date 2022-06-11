import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {MdShoppingCart} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { addItem } from 'reducers';
import { connect } from 'react-redux';
import { getCategoryProducts } from 'services';

const responsive = {
    xl: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    lg: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    md: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    sm: {
      breakpoint: { max: 600, min: 0 },
      items: 1
    }
  };


function ProductCarousel({category="General", query='jewllery',addToCart}) {
  const [data, setData] = useState()
  const navigate = useNavigate();

  useEffect(()=>{
    async function fetchData() {
      // You can await here
      const response = await getCategoryProducts(query);
      setData(response)    
    }
    fetchData();

  },[query])
    
  const navigateToProduct = (event, id)=>{
    event.preventDefault();
    navigate(`/products/${id}`)
  }
    
  return (
        <>
        { data && data.length>0 &&
            <div className="px-3 py-2 sm:py-4 sm:mx-4 lg:mx-6">
            <h3 className='py-2'>{category}</h3>
            <Carousel responsive={responsive}>
               { data.map((item,index)=>(
                   <div key={index} className=' rounded-md shadow m-2' >
                   <img  onClick={(event, id)=>navigateToProduct(event,item.id)}
                   className='w-full aspect-[4/2] object-contain cursor-pointer' src={item.image} alt={item.title}/>
                   <p className="truncate p-3">{item.title}</p>
                   <div className='flex items-center px-3 pb-3 justify-between'>
                       <span className='whitespace-nowrap	'>S$ {item.price}</span>
                      {/* <Link to={`/products/${item.id}`}> */}
                       <button onClick={()=>addToCart(item)}
                       className='rounded-md bg-blue-500 hover:bg-blue-700 active:opacity-50 active:after:opacity-100 inline-flex items-center p-1' type='button'>
                           {<MdShoppingCart size='1rem' color='white'/>} 
                           <span className='md:ml-1 text-white sm:text-sm' >
                               Add To Cart
                           </span>
                       </button>
                      {/* </Link> */}
                   </div>
               </div>
               ))
               }
                
            </Carousel>
        </div>}
        </>
    );
}

const mapDispatchToProps = (dispatch) =>{
  return{
    addToCart: (item) => dispatch(addItem(item))
  }
}
export default connect(null, mapDispatchToProps)(ProductCarousel);