import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
  const[searchtext,setsearchtext]=useState("")
  const [weatherinfo,setWeatherinfo]=useState("")
  const inputRef=useRef()
  const api_key="7b0febfb66016cb16c1712242418615a"
 useEffect(()=>{
       
  fetchdata("chennai")
  console.log(weatherinfo)
   },
[])
 
  const fetchdata=async(city )=>{
    try{  
      const api_key="7b0febfb66016cb16c1712242418615a";     
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
      const res= await axios.get(url)
      const data=await res.data
      const value=data.weather[0].main
      console.log(value)
      let image=""
      if(value==="Clouds")
        {
          image="./src/assets/cloud.png"
          
        }
      else if(value==="Rain")
          {
            image="./src/assets/rain.png"
          }
        else  if(value==="Drizzle")
            {
              image="./src/assets/drizzle.png"
            }
            let clear="./src/assets/clear.png"
      setWeatherinfo({...data,
                      name:data.name,
                      temperature:data.main.temp,
                      humidity:data.main.humidity,
                      wind:data.wind.speed,
                      img:image||clear
      })
      console.log(weatherinfo)
      setsearchtext("")
    }
    catch(error)
    {
      console.log(error.message)
      alert("data not found")
      setsearchtext("")
    }
      
  // let climate=await weatherinfo.weather[0].main
  // let climate="clouds"
  // console.log(climate)
  // switch(climate){
    
  //   case "clouds":{
  //     imagesrc="./src/assets/rain.png"
  //   }
  // }
  // 
  
}


  return (
    <div className=''>
    <form> 
         <div className=' bg-white p-1 rounded-xl flex items-center'>
              <input type='text' 
              placeholder='....type a city '
              ref={inputRef}
              onChange={(e)=>setsearchtext(e.target.value)}
              value={searchtext}
              
              className='placeholder:lowercase capitalize  w-full bg-white font-light text-2xl
            text-gray-500 focus:outline-none' />

          <div>
              <SearchIcon className='text-gray-600' type="submit"  onClick={()=>fetchdata(inputRef.current.value)}/> 
           </div>
           
    
       </div>
       </form>
        
   { weatherinfo&&<div className=' bg-gradient-to-r from-violet-500 to-fuchsia-500 
       rounded-lg  mb-6  mt-14 text-center text-white p-8  '>

          <h1 className='m-4 lg:text-5xl sm:text-xl '>{weatherinfo.name}</h1>
           
          <p className='m-8 lg:text-2xl sm:text-xs font-light'>{Math.floor(weatherinfo.temperature)} temp</p>

            <img src={weatherinfo.img} alt="" className='w-24 ml-auto mr-auto mb-6'/>
         <div className='flex flex-row  items-center justify-around sm:text-xs lg:text-xl'>
              <div className=''>
                  <p className='mb-3'>Humidity</p>
                  <img src="./src/assets/humidity.png" className='mb-3' alt=""/>
                  <p className='-ml-8'>{weatherinfo.humidity}</p>
              </div>

              <div>
                  <p className='mb-3'>wind</p>
                  <img className='mb-3' src="./src/assets/wind.png" alt=""/>
                  <p>{weatherinfo.wind}</p>
              </div>       
         </div>

      </div>
}
      
  </div>
  
  )
}

export default Home