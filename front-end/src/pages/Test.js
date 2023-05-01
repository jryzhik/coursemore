import React from 'react'
import axios from 'axios';

export default function Test() {
    fetch('/', {
        method: 'POST',
        body: JSON.stringify({
            name: 'john',
            email: 'james@gma'
        })
    })
    .then(response=>response.json())
    .then(data=>console.log(data))
    .catch(error=>console.error(error))

    // axios.get('http://localhost:5050/', {body: 'stringss'})
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  return (
    <div>Test</div>
  )
}
