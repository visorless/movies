import React, {useState, useEffect} from 'react'


const Paginator = ({pageData, ...props}) => {
    const [totalPages, setTotalPages] = useState([])
    useEffect( () => {
        if (pageData.total_pages){
            // assume you're at the start of the pages
            let end = pageData.total_pages > 11 ? 11 : pageData.total_pages
            let start = 1
            if (pageData.total_pages > 11 && pageData.page > pageData.total_pages - 5){
                // check if we're at the end first
                end = pageData.total_pages
                start = pageData.total_pages - 10
            } else if (pageData.total_pages > 11 && pageData.page > 6){
                // otherwise, somewhere in the middle
                end = pageData.page + 5
                start = pageData.page - 5
            }
            setTotalPages(new Array(end-start+1).fill().map((el, ind) => ind + start))
        }


    }, [pageData])
    const handleClick = (e) => {
        console.log('hi')
        if (e.target.getAttribute('name') === 'first'){
            // go to the first page
            props.handlePage(1)
        } else if (e.target.getAttribute('name') === 'last'){
            props.handlePage(pageData.total_pages)
        }
    }

    return (
        <div className="paginator">
            {pageData.total_pages ?
                <React.Fragment >
                    <span name="first" onClick={handleClick} className="pageButton">&lt;&lt;</span>
                    {totalPages.map( (v, i) => (
                        <span key={i}
                            className={v === pageData.page ? "pageButtonDead": "pageButton" }
                            onClick={() => props.handlePage(v)}>
                            {v}
                        </span>
                    ))}
                    <span name="last" onClick={handleClick} className="pageButton">&gt;&gt;</span>
                </React.Fragment>
                : ''
            }
        </div>
    )
}

export default Paginator
