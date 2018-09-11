import React, { Component } from 'react';
import './BusDetail.css';

import bookedSeat from '../../assets/grey-seat.svg';
import blankSeat from '../../assets/white-seat.svg';
import user from '../../assets/Anonymous-Avatar.png';

class BusDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            busSeat: [
                {
                    id: 1,
                    scr: bookedSeat,
                },
                {
                    id: 2,
                    scr: blankSeat,
                },
                {
                    id: 3,
                    scr: bookedSeat,
                },
                {
                    id: 4,
                    scr: blankSeat,
                },
                {
                    id: 5,
                    scr: blankSeat,
                },
                {
                    id: 6,
                    scr: blankSeat,
                },
                {
                    id: 7,
                    scr: blankSeat,
                }
            ],
        }
    }

    bookSeatHandler = (i) => {
        let newBusSeat = this.state.busSeat;
        let newBusSeatStatus = !this.state.busSeat[i].booked;
        newBusSeat[i].booked = newBusSeatStatus;
        this.setState({
            busSeat: newBusSeat
        });
    }

    render() {
        console.log(this.state.busSeat[0].booked);
        let extraInfo = this.state.expanded ? (
            <div>
                <div className="extra-block">
                    <div className="bus-map">
                        <ul>
                            {this.state.busSeat.map((m, i) =>
                                // <i key={m.id}
                                //     className={m.booked ? "fas fa-map" : "far fa-map"}
                                //     style={{ fontSize: 50 }}
                                //     onClick={() => this.bookSeatHandler(i)}
                                // >
                                // </i>
                                <img src={m.scr} alt="seat" className="seat" />
                            )}
                        </ul>
                    </div>
                    <div className="review">

                        <div className="review-header">
                            <img src={user} alt="avatar" />
                            <p>Name</p>
                        </div>
                        <p className="review-content">It's so good, nice service. 5 star for this</p>
                    </div>
                </div>
                <button className="button-book">Book now</button>
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
                                <p>23:00</p>
                                <p>{this.props.dest}</p>
                            </div>
                            <hr />
                            <div>
                                <i class="fas fa-map-marker-alt" style={{ fontSize: 50, color: '#DD2C00' }}></i>
                                <p>5:00</p>
                                <p>{this.props.arv}</p>
                            </div>
                        </div>
                    </div>
                    {extraInfo}
                </div>
                <i className="fas fa-plus-circle"
                    style={{ fontSize: 50 }}
                    onClick={() => this.setState({ expanded: !this.state.expanded })}>
                </i>
            </div>
        )
    }
}
export default BusDetail;