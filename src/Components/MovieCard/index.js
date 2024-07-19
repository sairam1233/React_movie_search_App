/* eslint-disable jsx-a11y/alt-text */
import {Component} from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import 'animate.css'
import "./index.css"

class MovieCard extends Component{

    //state 
    state= {
        img:"",
        isLoading:true,
    }


    //Mounting method
    componentDidMount(){
        this.getImg()
    }

    //Getting random Images
    getImg = async()=>{
        const url = "https://dog.ceo/api/breeds/image/random"
        const response = await fetch(url)
        const data1 = await response.json()
        if(response.ok){
            this.setState({img:data1.message, isLoading:false})
        }else{
            this.setState({isLoading:false, img:""})
        }
    }


    //render() method
    render(){
        const {img} = this.state
        const {data1, bt} = this.props
        const bT = bt ? "title1" : "title"
        return(
            <li className="hh animate__animated animate__fadeInRight">
            <img src={img || <Skeleton/>}  className="img"/>
            <h1 className={`${bT}`}>{data1.title || <Skeleton/>} </h1>
         </li>
        )
    }
}

export default MovieCard