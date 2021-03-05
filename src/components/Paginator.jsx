import React, {useState, useEffect} from 'react'

const Paginator = ({pageData, ...props}) => {

    return (
        <div className="paginator">
            {Array.from({length: pageData.total_pages}, (v, i) => (
                <span className="pageButton" onClick={() => props.handlePage(i+ 1)}>{i + 1}</span>
            ))}
        </div>
    )
}

export default Paginator
