import React from 'react'

const MovieCard = (props) => {

  const style = {
    width: '18rem',
    margin: '10px'
  }
  
  return (
    <div className="card" style={style} key={props.key}>
      <img src={props.src} className="card-img-top" alt="" style={{height: '400px'}}/>
        <div className="card-body overflow-auto p-2" style={{height: '200px'}}>
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
        </div>
    </div>
  )
}

export default MovieCard
