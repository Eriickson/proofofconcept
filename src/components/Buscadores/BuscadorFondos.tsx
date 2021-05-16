import React,{ useEffect,useState} from 'react';
import './buscadoresStyle.css'
import CardCompanyComponents from "./CardCompanyComponents";
import {Row} from "antd";
import {EncabezadoBrandFav} from "./EncabezadoBrandFav";
import {GrupoTypesBrands} from "./GrupoTypesBrands";


const BuscadorFondos = () => {

    return (
        <div>
            <div  className={"divInicial"}>
                <label className={"title"}>Buscador de fondos</label>

                <hr style={{marginTop:15,opacity:0.2}}/>

                <label className={"titleCads"}>GESTORAS DESTACADAS</label>
                <br/>
                <EncabezadoBrandFav>

                </EncabezadoBrandFav>
            </div>

            <GrupoTypesBrands/>
        </div>

    )
}

export default BuscadorFondos;