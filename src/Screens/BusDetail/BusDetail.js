import React, { Component } from 'react';
import './BusDetail.css';
import { connect } from "react-redux";

import { callStripe } from '../../HOC/StripeApi';
import Checkout from '../Checkout/Checkout';
import bookedSeat from '../../assets/grey-seat.svg';
import blankSeat from '../../assets/white-seat.svg';
import selectedSeat from '../../assets/green-seat.svg'
import user from '../../assets/Anonymous-Avatar.png';

const publicKey = `pk_test_EkIBvnp1PdCW9B6WWgPJePMF`;
const secretKey = `sk_test_VGHOeXpBmLss7oNI0d73H5iK`;

const StripeCheckout = callStripe(Checkout, publicKey, secretKey);

class BusDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            openModal: false
        }
    }

    bookSeatHandler = (i) => {
        
    }


    render() {
        const busInfo = this.props.busInfo;
        let extraInfo = this.state.expanded ? (
            <div>
                <div className="extra-block">
                    <div className="bus-map">
                        <p className="booking-introduction">Please select an available seat</p>
                        <ul>
                            {this.props.busSeat.map((seat, i) =>
                                <a key={i} className={seat === 1 ? 'disabled' : ''} onClick={ () => this.bookSeatHandler(i) }>                                    
                                    <img src={ seat === 2 ? selectedSeat : (seat === 1 ? bookedSeat : blankSeat)} alt="seat" className="seat" />
                                </a>
                            )}
                        </ul>
                    </div>
                    <div className="review">
                        {busInfo[0].data.map((review, i) => {
                            return(
                            <div key={i} className="rev">
                                <div className="review-header">
                                    <img src={user} alt="avatar" />
                                    <p>{review.user_name}</p>
                                </div>
                                <p className="review-content">{review.text}</p>
                            </div>)
                        })}

                    </div>
                </div>
                <button className="button-book" onClick={() => this.setState({openModal: !this.state.openModal})}>Book now</button>
            </div>
        )
            :
            null
        return (
            <div className="bus-container">
                <div className="bus">
                    <div id="price">$ {this.props.price}</div>
                    <div className="bus-info">
                        <img src={this.props.src} alt={this.props.name} />

                        <div className="info-left">
                            <p>Transport company: <span className="detail">{this.props.name}</span></p>
                            <p>Time: <span className="detail">{this.props.time}</span></p>
                            <p>Price: <span className="detail">{this.props.price}</span></p>
                            <p>Rating: <span className="detail">
                                <i class="fas fa-star" style={{ fontSize: 30, color: '#FFD600' }}></i>
                                <i class="fas fa-star" style={{ fontSize: 30, color: '#FFD600' }}></i>
                                <i class="fas fa-star" style={{ fontSize: 30, color: '#FFD600' }}></i>
                                <i class="fas fa-star" style={{ fontSize: 30, color: '#FFD600' }}></i>
                                <i class="fas fa-star-half-alt" style={{ fontSize: 30, color: '#FFD600' }}></i>
                            </span></p>
                        </div>
                        <div className="info-right">
                            <div>
                                <i class="fas fa-map-marker-alt" style={{ fontSize: 50, color: '#DD2C00' }}></i>
                                <p>{this.props.arvTime}</p>
                                <p>{this.props.arv}</p>
                            </div>
                            <hr />
                            <div>
                                <i class="fas fa-map-marker-alt" style={{ fontSize: 50, color: '#DD2C00' }}></i>
                                <p>{this.props.destTime}</p>
                                <p>{this.props.dest}</p>
                            </div>
                        </div>
                    </div>
                    {extraInfo}
                </div>
                {this.state.openModal ? <StripeCheckout lastestCharge={this.props.price}/> : null}
                <i className="fas fa-plus-circle"
                    style={{ fontSize: 50 }}
                    onClick={() => this.setState({ expanded: !this.state.expanded })}>
                </i>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        busInfo: state.search.busInfo
    }
}

export default connect(mapStateToProps)(BusDetail);