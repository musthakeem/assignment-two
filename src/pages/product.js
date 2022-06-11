import { getProductDetails } from "services";
import { Layout } from "components";
import { useEffect, useState } from "react";
import { MdStar } from "react-icons/md";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { addItem } from "reducers";

// const data = {"id":1,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing","image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","rating":{"rate":3.9,"count":120}}


function Product({addToCart}) {
    const { id } = useParams();
    const [data, setData] = useState()

    useEffect(()=>{
        async function fetchData() {
          const response = await getProductDetails(id);
          setData(response);
        }
        fetchData();
    
      },[id]);
    
    return (
        <Layout>
            {
data &&
        <div className='py-16 sm:py-18 sm:px-4 md:px-6 h-screen'>
            <div className="md:mt-24 ">
                <div className="float-left w-full sm:w-1/2 p-4">
                    <div className="flex flex-col justify-center self-center">
                    <img className="items-center w-96 mt-4 aspect-square object-contain" src={data.image} alt={data.title} />
                    <a className="inline-block w-20 h-20 cursor-pointer" href="/">
                    <img className="w-20 h-20 mt-4 aspect-square object-cover" src={data.image} alt={data.title} />
                    </a>
                    </div>                    
                </div>
                
                <div className="float-left w-full sm:w-1/2 p-4">
                    <h1>
                        {data.title}
                    </h1>
                    <h6 className="inline-flex justify-center items-center text-zinc-500">
                         <MdStar color="gold"/> {`${data.rating.rate}(${data.rating.count}) | ${data.category}`}
                    </h6>

                    <h2 className='mt-6'>
                        S$ {data.price}
                    </h2>
                    <p className='mt-6'>
                        {data.description}
                    </p>

                    <button onClick={()=>addToCart(data)}
                    className=' rounded mt-6 text-white bg-blue-500 hover:bg-blue-700 active:opacity-50 active:after:opacity-100 inline-flex items-center p-2 shadow-xl' type='button'>
                        Add To Cart
                    </button>
                </div>

            </div>            
        </div>
            }
    </Layout>
    );
}

const mapDispatchToProps = (dispatch) =>{
    return{
      addToCart: (item) => dispatch(addItem(item))
    }
  }

export default connect(null, mapDispatchToProps) (Product);