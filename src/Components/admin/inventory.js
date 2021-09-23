import React, {useEffect, useState} from 'react'
import axios from 'axios'

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

        axios.post('http://172.31.100.69:6969/api', req)
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

    const list = visibleList.map(i =>{
        return(
            <div className="listItem" key={i._id} id={i.utlant.status ? "green" : ""}>
                <p>{i.item}</p>
                <p>{i.info}</p>
                <p>{i.plassering}</p>
                <p> {i.barcode} </p>
                <p> {i.utlant.utlaner} </p>
                
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