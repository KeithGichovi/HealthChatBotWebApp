import React from 'react';

const Test = ({key, name, age}) => {
    return (
        <div key={key}>
            <p>hi i am {name} and i am {age} years old</p>
        </div>
    )
}

export default Test;