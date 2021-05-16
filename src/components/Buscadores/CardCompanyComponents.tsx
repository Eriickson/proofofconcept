import React,{ useEffect,useState} from 'react';
import './buscadoresStyle.css'


const CardCompanyComponents = (props: any) => {
     const {nameBranch, imagen} = props

    return (
            <div className={"containerImgCard"} >
               <img width={152} height={88} style={{borderRadius: "15px"}} src="https://lh3.googleusercontent.com/proxy/eq45pd8rBHTzsVnwT_HFA7-KsLqPvFtH-KlSgEiuoiCguNkRSar-YH-GzYbyXm-fA7xv7zENA9frNWONNC2w7PmANvDpUGbUM1IDaxzB6PEUjRlAvUYi3efhUPXAsd7RPPIKiTgThjYjeGCKje-BxNo648pDzrFxQP4"/>
               <div className="centeredTextCard">Nombre empresa</div>
            </div>
    )
}

export default CardCompanyComponents;