import React, { Component } from 'react'
import CreditCardInput from 'react-credit-card-input';
import { InputGroup, Input, InputGroupAddon, Button } from 'reactstrap'

import './Checkout.css';

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          lastestCharge: 'none',
          number: '',
          exp: '',
          cvc: '',
          money: ''
        }
        this.createCharge = this.createCharge.bind(this);
        this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
        this.handleCardExpiryChange = this.handleCardExpiryChange.bind(this);
        this.handleCardCVCChange = this.handleCardCVCChange.bind(this);
      }
    
      async createCharge() {
        const time = this.state.exp.split("/");
        let month = time[0].replace(/ /g, '');
        let year = time[1].replace(/ /g, '');
        let money = this.state.money;
        console.log(money);
    
        const creditCardInfo = {
          'card[number]': this.state.number,
          'card[exp_month': month,
          'card[exp_year]': year
        }
    
        const chargeInfo = {
          'amount': money,
          'currency': 'usd',
          'description': 'test_charge_codewalkthrough',
          'source': null
        }
    
        this.setState({
          lastestCharge: 'Creating token...'
        });
    
        const tokenData = await this.props.postPublic('tokens', creditCardInfo);
    
        this.setState({
          lastestCharge: 'Creating charge...'
        });
    
        chargeInfo['source'] = tokenData.id
        const chargeData = await this.props.postSecret('charges', chargeInfo);
    
        this.setState({
          lastestCharge: chargeData.id
        });
        alert('Thanks for booking');
      }
    
      handleCardExpiryChange(e) {
        let exp = e.target.value;
        this.setState({
          exp: exp
        })
      }
    
      handleCardNumberChange(e) {
        let number = e.target.value;
        this.setState({
          number: number
        })
      }
    
      handleCardCVCChange(e) {
        let cvc = e.target.value;
        this.setState({
          cvc: cvc
        })
      }

    render() {
    return (
        <div className="checkout">
          <h1>Checkout</h1>
          <h3>Lastest charge is {this.props.lastestCharge} $</h3>
          <CreditCardInput className="card"
            cardNumberInputProps={{ value: this.state.number, onChange: this.handleCardNumberChange }}
            cardExpiryInputProps={{ value: this.state.exp, onChange: this.handleCardExpiryChange }}
            cardCVCInputProps={{ value: this.state.cvc, onChange: this.handleCardCVCChange }}
            fieldClassName="input"
          />
          <br />
          <Button color="primary" onClick={this.createCharge}>Pay</Button>{' '}
      </div>
    )
  }
}
