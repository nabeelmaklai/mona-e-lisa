// import User from "./User"
import { GetArt } from "../services/Get"

import { useEffect, useState } from 'react'

const Home = ({user}) => {

    const [art,  setArt] = useState([])
const showArt = async ()=>{
const response = await GetArt()
console.log(response)
setArt(response)


}
  return user?(

    <div>
{art.map(()=>(

 <h1>{user.userName}</h1>
))}
     

    </div>
  ):(<></>)

  }
export default Home
