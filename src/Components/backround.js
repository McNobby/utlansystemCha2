import LB from '../img/LB.svg'
import lt1 from '../img/LT-1.svg'
import lt2 from '../img/LT-2.svg'

export default function Backround() {
    return(
        <>
            <img src={LB} alt="LB" height="300" className="LB"/>
            <img src={lt1} alt="LB" height="300" className="lt1"/>
            <img src={lt2} alt="LB" height="300" className="lt2"/>
            <img src={lt2} alt="RB" height="300" className="RB"/>
        </>
    )
}