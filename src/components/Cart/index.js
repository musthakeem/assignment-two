import React from 'react';
import { MdAdd, MdDelete, MdRemove } from 'react-icons/md';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { decrementItem, incrementItem, removeItem } from 'reducers';

// const data = [
//     {"id":5,"title":"John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet","price":695,"description":"From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.","category":"jewelery","image":"https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg","rating":{"rate":4.6,"count":400}},
//     {"id":6,"title":"Solid Gold Petite Micropave ","price":168,"description":"Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.","category":"jewelery","image":"https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg","rating":{"rate":3.9,"count":70}},
//     {"id":7,"title":"White Gold Plated Princess","price":9.99,"description":"Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...","category":"jewelery","image":"https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg","rating":{"rate":3,"count":400}},
//     {"id":8,"title":"Pierced Owl Rose Gold Plated Stainless Steel Double","price":10.99,"description":"Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel","category":"jewelery","image":"https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg","rating":{"rate":1.9,"count":100}}]


function Cart({data, deleteItem, increaseItem, decreaseItem}) {

    const navigate = useNavigate();

    const removeItem =(item)=>{
        deleteItem(item)
    }

    const navigateTo = (id)=>{
        navigate(`/products/${id}`)

    }

    return (
        <div className='flex flex-row w-full p-2 shadow-sm my-4 bg-white'>
                        <img className='w-24 aspect-[4/3]' src={data.image} alt='' />
                        <div className='flex flex-col px-4 w-full'>
                            <p className='text-ellipsis border-b h-8 m-2 cursor-pointer' onClick={()=>navigateTo(data.id)}>
                                {data.title}
                            </p>
                            <div className='flex fles-col justify-between mt-2'>
                            <button onClick={()=>removeItem(data)} className='active:opacity-50 active:after:opacity-100'>
                                <MdDelete color='red' size={24}/>
                            </button>

                            <div className='inline-flex items-center '>
                                <span className='mr-10 font-semibold'>S$ {data.price}</span>
                                <MdRemove onClick={()=>decreaseItem(data)}
                                size={24} className='rounded-full border-black border-2 active:opacity-50 active:after:opacity-100'/>
                                <span className='mx-4 w-4'>{data.count}</span>
                                <MdAdd onClick={()=>increaseItem(data)}
                                 size={24} className='rounded-full border-black border-2 active:opacity-50 active:after:opacity-100'/>
                            </div>
                            </div>
                        </div>
                    </div>
    );
}


const mapStateToProps = state => ({
    cartInfo: state.cart
  })

  const mapDispatchToProps = (dispatch) =>{
    return{
      deleteItem: (item) => dispatch(removeItem(item)),
      increaseItem: (item) => dispatch(incrementItem(item)),
      decreaseItem: (item) => dispatch(decrementItem(item))
    }
  }

  
export default connect(mapStateToProps,mapDispatchToProps) (Cart);

