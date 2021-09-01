let PageNation = (props) =>{

    let arr = [];
    for(let i=1;i<=props.requirePages;i++){
        arr.push(i)
    }

    return(
        <>
            <nav>
                <ul class="pagination mt-4">

                   {arr.map((el)=>{
                      return  <li class={`page-item  ${ props.currPage===el ?'active' : ""}`} onClick={()=>{
                          props.setcurrPage(el);
                      }}><a class="page-link" href="/#">{el}</a></li>
                    })}
                   
                </ul>
            </nav>
        </>
    );
}

export default PageNation;