import React from 'react'
import Mycard from './Mycard';
import "./ImageCurosel.css"
const ImageCurosel = ({list}) => {
    let box = document.querySelector(".product-container");

    const btnPressPrev =()=>{
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft-width;
    }

    const btnPressNext=()=>{
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft+width;
    }

  return (
    <div className='product-curosel'>
        <h2 className="section-heading">Songs</h2>
        <button className='pre-btn' onClick={btnPressPrev}><p>&lt;</p></button>
        <button  className='next-btn' onClick={btnPressNext}><p>&gt;</p></button>

        <div className='product-container'>
            <Mycard list={list}/>
        </div>
    </div> 
  )
}

export default ImageCurosel