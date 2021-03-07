import React from 'react'
import ReactDOM from 'react-dom'

const MoviePopup = ({data, isShowing, hide, isMovie}) => isShowing ? ReactDOM.createPortal(
    <React.Fragment >
        <div className="moviePopupBackdrop">
            <div className="moviePopup">
                <div className="moviePopupClose">
                    <button name="close" onClick={hide}>X</button>
                </div>

                <img
                    alt={`${isMovie ? data.title: data.name}_backdrop`}
                    src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`} width="500" />
                <h3>{isMovie ? data.title: data.name}</h3>
                <h4>{isMovie ? data.release_date : data.first_air_date}</h4>
                <div>{data.overview}</div>
            </div>
        </div>
    </React.Fragment>, document.body
) : null;


export default MoviePopup
