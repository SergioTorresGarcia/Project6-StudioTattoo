import "./CCard.css"

export const CCard = ({ title, description, imageUrl }) => {
    return (
        <div className="card">
            <img src={imageUrl} alt={title} className="card-img" />
            <div className="card-content">
                <h4 className="card-title">{title}</h4>
                <h5 className="card-description">{description}</h5>
            </div>
        </div>
    )
}
