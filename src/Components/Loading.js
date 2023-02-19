import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';

const styles = {
    content: {
        fontSize: '35px',
        position: 'absolute',
        left: '40%',
        top: '30%',
        marginTop: '20px',
        textAlign: 'center'
    }
}

export default function Loading ({text = 'Loading', speed = 300}) {
    const [content, setContent] = useState(text)

    useEffect(() => {
         const timer = window.setInterval(() => {
            setContent((content) => {
                return content === `${text}...` ? text : `${content}.`
            })
        }, speed)

        return () => window.clearInterval(timer)
    }, [text, speed])

    return (
        <p style={styles.content}>{content}</p>
    )
}

Loading.propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number
}