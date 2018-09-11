import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import db from "../../Firebase";
import "react-datepicker/dist/react-datepicker.css";
import Loader from 'react-loader';

import './Search.css';
import BusDetail from "../BusDetail/BusDetail";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(new Date(`2018-09-10 00:00:00`)),
      from: '8wQyaKlM488Y9msL6PhF',
      to: '7HtcZQMyfvzWdxfe32MG',
      loading: false
    };
    this.handlePickDate = this.handlePickDate.bind(this);
    this.handleSelectFrom = this.handleSelectFrom.bind(this);
    this.handleSelectTo = this.handleSelectTo.bind(this);
    this.searchBus = this.searchBus.bind(this);
    this.CreateData = this.CreateData.bind(this);
  }

  componentDidMount() {
    db.collection("places")
      .get()
      .then((querySnapshot) => {
        let places = [];
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            places.push({ id: doc.id, name: doc.data().name })
          }
        });
        this.props.dispatch({ type: "GET_PLACES", data: places })
      });
  }

  async searchBus() {
    this.setState({ loading: true });
    const datePicker = moment(this.state.startDate).format("YYYY-MM-DD");
    const startDate = new Date(`${datePicker} 00:00:00`).getTime();
    const endDate = new Date(`${datePicker} 23:59:59`).getTime();
    const routes = await db.collection("routes")
      .where("date", ">=", startDate)
      .where("date", "<=", endDate)
      .where("from", "==", this.state.from)
      .where("to", "==", this.state.to)
      .get().catch(function (error) {
        console.log("Error getting document:", error);
      });
    const busesData = [];
    //const promisesBus = [];
    routes.forEach(route => {
        busesData.push(route.data());
    });
    console.log(busesData);

    this.props.dispatch({ type: "GET_BUSES", data: busesData });
    //await this.setState({ loading: false });
  }

  handleSelectFrom(e) {
    this.setState({
      from: e.target.value
    })
  }

  handleSelectTo(e) {
    this.setState({
      to: e.target.value
    })
  }

  handlePickDate(date) {
    this.setState({
      startDate: date
    });
  }

  CreateData() {
    let routes = db.collection("Bus_routes");
    routes.doc().set({
      BusID: '5a4ieY8WEbQWfwWYAdxz',
      Date: new Date('2018-09-10 21:30'),
      From: "8wQyaKlM488Y9msL6PhF",
      To: "7HtcZQMyfvzWdxfe32MG",
      Price: 500000
    });
  }

  number_format(number, decimals, dec_point, thousands_sep) {
    let n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
    let d = dec_point == undefined ? "," : dec_point;
    let t = thousands_sep == undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
    let i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  }

  sortNameHandler = () => {
    const buses = this.props.buses;
    let newBuses = buses.sort((a, b) => a.routeData.Price - b.routeData.Price);
    console.log(newBuses);
    this.props.dispatch({ type: "SORT_PRICE_BUSES", data: newBuses });
  }

  sortPriceHandler = () => {

  }

  render() {
    return (
      <div className="Body">
        <div className="Search-box">
          <h3>Book Bus Tickets Online</h3>
          <div className="booking-option">
            <div>
              <span>From :</span>
              <select onChange={this.handleSelectFrom} value={this.state.from} className="custom-select">
                <option value="">Select from</option>
                {this.props.places.map((place, index) =>
                  <option key={index.toString()} value={place.name}>{place.name}</option>)}
              </select>
            </div>
            <div>
              <span>To :</span>
              <select onChange={this.handleSelectTo} value={this.state.to} className="custom-select">
                <option value="">Select to</option>
                {this.props.places.map((place, index) =>
                  <option key={index.toString()} value={place.name}>{place.name}</option>)}
              </select>
            </div>
            <div className="date">
              <span>Depart :</span>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handlePickDate}
              />
            </div>
          </div>
          <button onClick={this.searchBus} className="btn-book">
            Find Bus
        </button>
        </div>
        <div className="filter">
          <input type="checkbox" onChange={this.sortNameHandler} />
          <label>By name (A-Z)</label>
          <input type="checkbox" onChange={this.sortPriceHandler} />
          <label>By price</label>
        </div>
        {/* <Loader loaded={this.state.loading}> */}
          {this.props.buses &&
            this.props.buses.map((bus, index) =>
              <BusDetail
                key={index.toString()}
                src={bus.busData.image}
                name={bus.busData.name}
                time='12h'
                //time={moment.unix(bus.routeData.Date.seconds).format("hh:mm")}
                price={this.number_format(bus.price, 0, ",", ".")}
                dest={bus.from}
                arv={bus.to}
              />
            )}
        {/* </Loader> */}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    places: state.search.places,
    buses: state.search.buses,
  }
}
export default connect(mapStateToProps)(Search);