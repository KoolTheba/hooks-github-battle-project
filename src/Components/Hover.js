import React, {useState} from 'react'

const Hover = (props) => {
    const [hovering, setIsHovering] = useState(false)

    const handleMouseOver = () => setIsHovering(true)
    const handleMouseOut = () => setIsHovering(false)

    return (
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            {props.render(hovering)}
        </div>
    )
}

export default Hover
