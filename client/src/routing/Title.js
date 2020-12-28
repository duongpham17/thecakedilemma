import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const Title = () => {
    const location = useLocation()

    useEffect(() => {
        const title = location.pathname.slice(1, 1000)
        const replaceStringWithLineBreak = (str) => str.replace(/\//g, "-")
        document.title = `The Cake Dilemma | ${location.pathname.length <= 1 ? "Home" : replaceStringWithLineBreak(title)}`
    }, [location])

    return <></>
}

export default Title

