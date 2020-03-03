import {useState} from 'react'

export const useHover = (def)=>{
    const [hovered, setHovered] = useState(def)

    // const ref = useRef(null)    

    const hoveredOn = ()=>{
        setHovered(true)
    }

    const hoveredOff = ()=>{
        setHovered(false)
    }

    // useEffect(()=>{
    //     refEle.current.addEventListener('mouseenter', hoveredOn)
    //     refEle.current.addEventListener('mouseleave', hoveredOff)
    //     return ()=>{
    //         refEle.current.removeEventListener('mouseenter', hoveredOn)
    //         refEle.current.removeEventListener('mouseleave', hoveredOff)
    //     }
    // } ,[])   

    return [hovered, hoveredOn, hoveredOff]
}