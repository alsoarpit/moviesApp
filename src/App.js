import React from "react";

import Filter from "./Filter";
import NavBar from "./NavBar";
import Search from "./Search";
import Table from "./Table";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Login from "./Login";
import Rental from "./Rental";
import Customers from "./Customers";
class App extends React.Component{
  state = {
    movies:[],
    genre:[],
    selectedFilter:"All Genre",
    search:"",
  }

  componentDidMount(){
    let f = async () =>{

      let responseGenre = await fetch("http://localhost:4000/genre");
      let responseMovies = await fetch("http://localhost:4000/movies");

      let moviesJson = await responseMovies.json();
      let genreJson= await responseGenre.json();

      this.setState({movies:moviesJson,genre:genreJson})
    };
    f();
  }

  searchHandle = (value)=>{
    this.setState({search:value})
  }

  toggleLiked=(id)=>{
    console.log(this.state.movies);
    let idx = this.state.movies.findIndex((el)=>{
          return  el._id === id;
    })
    let currMoviesApp = this.state.movies.map((el)=>el);
    if(currMoviesApp[idx].liked){
      currMoviesApp[idx].liked =false;
    }else{
      currMoviesApp[idx].liked = true;
    }
    
    this.setState({movies:currMoviesApp});
  }
  
  deleteMovies=(id)=>{
    let filterArrMoviesArr = this.state.movies.filter((el)=>{
      return el._id !== id;
    });

    this.setState( {movies:filterArrMoviesArr});

  }
  handleFilter=(filter)=>{
    this.setState({selectedFilter:filter});
  }
  render(){
    return (

      <Router>

            <div>

                  <NavBar/>

                  <Switch>

                    <Route path="/login"><Login/></Route>
                    <Route path="/Rentals"><Rental/></Route>
                    <Route path="/Customers"><Customers/></Route>


                    <Route  path="/">

                          <div className="row">
                            <Filter handleFilter={this.handleFilter}
                            selectedFilter={this.state.selectedFilter}
                            genreData = {this.state.genre}/>

                              <div class="col-9 p-4">
                                <Search    searchHandle = {this.searchHandle}
                                search = {this.state.search}/>
                                <Table 
                                search = {this.state.search}
                                deleteMovies= {this.deleteMovies}
                                toggleLiked = {this.toggleLiked}
                                selectedFilter={this.state.selectedFilter}
                                movieData = {this.state.movies}/>
                              </div>
                          </div>

                    </Route>


                  </Switch>

            </div>


      </Router>
      
    );
  }
}

export default App;
