import React from "react";

function useHover (){
    const [hovering, setIsHovering] = React.useState(false)

    const handleMouseOver = () => setIsHovering(true)
    const handleMouseOut = () => setIsHovering(false)

    const attrs = {
        onMouseOver: handleMouseOver,
        onMouseOut: handleMouseOut
    }

    return [hovering, attrs]
}

export default useHover
