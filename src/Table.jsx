import React from "react";
import PageNation from "./PageNation";

class table extends React.Component{

    state={
        currPage:1,
    }

    setcurrPage = (value)=>{
        this.setState({currPage:value})
    }

    render = ()=>{
        let  allMovies= this.props.movieData;
        let currFilter = this.props.selectedFilter;
        let filterMoviesArr = allMovies.filter((el)=>{
            if(currFilter=="All Genre"){
                return el;
            }else if(el.genre.name==currFilter){
                return el;
            }
        })
         filterMoviesArr = filterMoviesArr.filter((el)=>{

            let titleMovie = el.title;
            titleMovie = titleMovie.toLowerCase();
            let newSearch = this.props.search.toLowerCase();
          return titleMovie.includes(newSearch);
        })

        let requirePages = Math.ceil(filterMoviesArr.length / 4);
        let firstIdx = (this.state.currPage - 1)*4;
       let endIdx = (filterMoviesArr.length,this.state.currPage*4)
    let arrIsUsedToBeTable = filterMoviesArr.slice(firstIdx,endIdx);

            return <>
            <div class="row">
                <div class="col-10">
                <table class="table mt-4">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Rate</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                    <tbody>
                            {
                                arrIsUsedToBeTable.map((el)=>{
                                    return (
                                    <tr key={el._id}>
                                        <td>{el.title}</td>
                                        <td>{el.genre.name}</td>
                                        <td>{el.numberInStock}</td>
                                        <td>{el.dailyRentalRate}</td>
                                        <td onClick={()=>{
                                            this.props.toggleLiked(el._id);
                                        }}>

                                        {
                                            el.liked ? <span class="material-icons-outlined">
                                            favorite
                                            </span> : <span class="material-icons-outlined">
                                            favorite_border
                                            </span>
                                            
                                        }
                                            </td>
                                        <td><button onClick={()=>{
                                            this.props.deleteMovies(el._id);
                                        }}>Delete</button></td> 
                                    </tr>
                                    )
                                })
                            
                            }
                    </tbody>
                </table>
                </div>
        </div>

            <PageNation
            requirePages = {requirePages}
            currPage = {this.state.currPage}
            setcurrPage={this.setcurrPage}/>
        </>
    }

}

export default table;