import React from 'react'
import ReactDOM from 'react-dom'

const MoviePopup = ({data, isShowing, hide}) => isShowing ? ReactDOM.createPortal(
    <React.Fragment >
        <div className="moviePopupBackdrop">
            <div className="moviePopup">
                <div className="moviePopupClose">
                    <button name="close" onClick={hide}>X</button>
                </div>

                <img src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`} width="500" />
                <h3>{data.title}</h3>
                <h4>{data.release_date}</h4>
                <div>{data.overview}</div>
            </div>
        </div>
    </React.Fragment>, document.body
) : null;


export default MoviePopup
