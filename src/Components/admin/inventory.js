import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiAdress} from '../config.json'

const Inventory = () => {

    const [visibleList, setVisibleList] = useState([])
    const [allUtstyr, setAllUtstyr] = useState([])
    const [allUtlant, setAllUtlant] = useState([])
    const [notUtlant, setNotUtlant] = useState([])
    const [status, setStatus] = useState('allUtstyr')

    useEffect(()=>{
        getAllItems()
    },[])

    const getAllItems = () => {
        let req = {
            type:'get',
            getType:'allUtstyr'
        }

        axios.post(apiAdress, req)
        .then(res =>{
            console.log(res.data);
            setAllUtstyr(res.data)
            setVisibleList(res.data)
            //make the utlant list
            const utlant = res.data.filter(obj => obj.utlant.status === true)
            setAllUtlant(utlant)
            const notUtlant = res.data.filter(obj => obj.utlant.status === false)
            setNotUtlant(notUtlant)
        })
    }

    const moreInfo = (i) =>{
        //code to find how long item has been loaned out
        //Firstly we find the amount of senconds item has been loaned out
        let timeUtlant = (Date.now() - i.utlant.time)/1000
        //find amount of hours (amount of seconds divided by amount of senconds in an hour)
        timeUtlant = timeUtlant / 3600
        //find how many days
        let timeUtlantDays = timeUtlant / 24

        if (timeUtlantDays <= 1){
            timeUtlant = Math.floor(timeUtlant) //hours since loan

            timeUtlant = `${timeUtlant}T` //set variable to show
        }else{
            //round down
            console.log(timeUtlant);
            timeUtlant = Math.floor(timeUtlant) //hours since loan
            timeUtlantDays = Math.floor(timeUtlantDays) //days

            timeUtlant = timeUtlant-(timeUtlantDays*24) //find the rest amout of hours
            
            timeUtlant = `${timeUtlantDays}D ${timeUtlant}T ` //set variable to show
        }

        return(
            <div className="moreInfo">
                <p>{i.utlant.utlaner.epost}</p>
                <p>{i.utlant.utlaner.navn}</p>
                <p>{timeUtlant}</p>
            </div>
        )
    }

    const list = visibleList.map(i =>{
        const click = (e) =>{
            
            if(!e.target.children[5]){
                return
            }
            if(e.target.style.height !== "150px"){
            //runs if element is not extended
                //sets styles for elements to be shown
                e.target.style.height = "150px"
                e.target.children[5].style.display = "inherit"
                return
            }
                e.target.children[5].style.display = "none"
                e.target.style.height = ""
        }

        return(
            <div className="listItem" onClick={click} key={i._id} id={i.utlant.status ? "red" : "green"}>
                <p>{i.item}</p>
                <p>{i.info}</p>
                <p>{i.plassering}</p>
                <p> {i.barcode} </p>
                <p> {i.utlant.utlaner ? i.utlant.utlaner.navn : ""} </p>
                {i.utlant.utlaner ? moreInfo(i) : ""}
            </div>
        )
    })

    const selectAll = () =>{
        setStatus('allUtstyr')
        setVisibleList(allUtstyr)
    }

    const selectUtlant = () => {
        setStatus('allUtlant')
        setVisibleList(allUtlant)
    }

    const selectNotUtlant = () =>{
        setStatus('notUtlant')
        setVisibleList(notUtlant)
    }

    const handlePlace = (e) =>{
        const plass = e.target.value
        if(plass === 'All'){
            if(status === 'allUtstyr'){
                setVisibleList(allUtstyr)
            }
            if(status === 'allUtlant'){
                setVisibleList(allUtlant)
                
            }
            if(status === 'notUtlant'){
                setVisibleList(notUtlant)
            }
            return
        }

        if(status === 'allUtstyr'){
            const place = allUtstyr.filter(i => i.plassering === e.target.value)
            setVisibleList(place)
        }
        if(status === 'allUtlant'){
            const place = allUtlant.filter(i => i.plassering === e.target.value)
            setVisibleList(place)
        }
        if(status === 'notUtlant'){
            const place = notUtlant.filter(i => i.plassering === e.target.value)
            setVisibleList(place)
        }

    }

    const tilbake = () =>{
        window.history.back()
    }

    return (
        <div className="bigCard">
            <div className="topControl">
                <h2>Utstyr oversikt</h2>
                <div className="filters">
                    <div className="wrap">
                        <h3>Status:</h3>
                        <select>
                           <option onClick={selectAll} value="AltUtstyr">Ingen filter</option>
                           <option onClick={selectUtlant} value="Utlant">Utlånt</option>
                           <option onClick={selectNotUtlant} value="NotUtlant">Ikke utlånt</option>
                        </select>
                    </div>
                    <div className="wrap">
                        <h3>Plassering:</h3>
                        <select>
                            <option onClick={handlePlace} value="All">Ingen filter</option>
                            <option onClick={handlePlace} value="kameralager">Kameralager</option>
                            <option onClick={handlePlace} value="Utstyrlager">Utstyrlager</option>
                            <option onClick={handlePlace} value="IM lager">IM lager</option>
                        </select>
                    </div>
                    <div className="wrap">
                    <button className="shadow" onClick={tilbake} id="red-gradient">Tilbake</button>

                    </div>

                </div>

            </div>
            <div className="top">
                <p>Item</p>
                <p>Info</p>
                <p>Plassering</p>
                <p>Barocde</p>
                <p>Utlåner</p>
                </div>
            <div className="list">
                {list}
            </div>
        </div>
    )
}

export default Inventory
