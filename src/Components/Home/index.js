import {Component} from "react"
import MovieCard from "../MovieCard"
import DotLoader from "react-spinners/DotLoader";
import { FaDatabase } from "react-icons/fa6";
import 'animate.css'
import "./index.css"

class Home extends Component{

    //state managment
    state={
        movieList:[],
        isLoading:true,
        searchQ:'movie',
        isDark:false,
        isFail:false,
    }
    

    //Mounting Phase
    componentDidMount(){
        this.getData()
    }

    //Api get method
    getData = async()=>{
        this.setState({isLoading:true})
        const {searchQ} = this.state
        const Url = `https://openlibrary.org/search.json?title=${searchQ}`
        const response = await fetch(Url)
        console.log(response)
        const data = await response.json()
        console.log(data)
        if(response.ok){
            this.setState({movieList:data.docs, isLoading:false, searchQ:"", isFail:false})
        }else{
            this.setState({movieList:[], isLoading:false, searchQ:"", isFail:true})
        }
    }


    //Store Input data in state
    onChangeInput = (event)=>{
        this.setState({searchQ:event.target.value})
    }


    //Onsearch Input Button
    onSearch = ()=>{
        const {searchQ} = this.state
        if(searchQ !== ""){
            this.getData()
        }
    }

    //DarkMode function
    isDark1 =()=>{
        const {isDark} = this.state
        this.setState({isDark:!isDark})
    }

    //render() methos
    render(){
        const {movieList, isLoading, searchQ, isDark, isFail} = this.state
        console.log(isFail)
        const Element = (
            <>
             {movieList.map(l=>(
                    <MovieCard data1={l} key={l.id_goodreads} bt={isDark}/>
            ))}
            </>
        )
        const bG =  isDark === true ? "bgContainer1" : "bgContainer"
        const inp =  isDark === true ? "inputContainer1" : "inputContainer"
        const mvContainer =  isDark === true ? "movieContainer1" : "movieContainer"
        const input1 =  isDark ? "inp1" : "inp"
        return(
            <div className={`${bG}`} >
                <div className="dv">
                <div className={`${inp} animate__animated animate__slideInDown`}>
                <input type="search" value={searchQ} placeholder="Enter the movie name" className={`${input1} animate__animated animate__fadeIn`} onChange={this.onChangeInput} required/>
                <button type="button" className="searchBtn animate__animated animate__fadeIn" onClick={this.onSearch}>Search</button>
              </div>
              <label class="switch">
                 <input type="checkbox" onClick={this.isDark1}/>
               <span class="slider"></span>
              </label>
            </div> 
            <>          
            {isFail ?
             (<div className={`${mvContainer}`}><button type="button" onClick={this.retry} className="searchBtn">Retry</button></div>)
              :
               ( <ul className={`${mvContainer} animate__animated animate__zoomIn`}>
                {isLoading ?
                //Loader
                  (<DotLoader color="#EBAC00" size="28px"/>)
                :
                //List of Data
                 (<>
                
                     {movieList.length === 0 ? (
                    //No data found
                    <div className="dt animate__animated animate__fadeIn">
                        <FaDatabase className="ic"/>
                        <h1 className="h2">No Data Found</h1>
                    </div>) : Element}
                </>)
                }
              </ul>)
               }
               </>
             </div>
        )
    }
}

export default Home