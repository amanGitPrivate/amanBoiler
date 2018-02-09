import React from 'react';
import _ from 'lodash';
import ItemRow from '../../ui/Row.jsx';
import OverLayComponent from '../../ui/Layout.jsx';
import dataCart from '../../../json/Cart.json';
import {showLoadingOverlay} from '../../../actions/index';
import { connect } from 'react-redux'

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: dataCart.productsInCart,
      total: 0,
			promoCode:"NOT",
			shippingCharges: 5,
			promoDiscount:7,
			editItem: null
    };
  }

  removeItem=(value)=>{
    let newData = _.without(this.state.data,value);
    this.setState({
      data: newData
    });
  }

  formatNumber=(number)=>{
    if(number)
     return number>9 ? number.toFixed(2): "0"+number.toFixed(2);
  }

  editItem_Fn=(value)=>{
  document.querySelector("body").classList.add("overFlowHidden");
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  this.setState({
    editItem:value
  });
  }

  updateRow=(rowObj, qty, colour, size)=>{
      let itemsArray = this.state.data,
          index = itemsArray.indexOf(rowObj);
      itemsArray[index].p_quantity = parseInt(qty);
      if (colour) {
          itemsArray[index].p_selected_size = size;
          itemsArray[index].p_selected_color = colour;
          document.querySelector("body").classList.remove("overFlowHidden");
      }
      this.setState({
          editItem:null,
          data: itemsArray
      });
  }

  getTotal=()=>{
		let total = this.formatNumber(_.reduce(_.map(this.state.data,function(value){ return value.p_price * value.p_quantity }), function(memo, num){ return memo + num; }, 0));
		this.state.total = total;
		return total;
  }

  capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getGrandTotal=()=>{
    		let gTotal  = parseInt( this.state.total);
    		if(this.state.total<50){
    			gTotal = gTotal + this.state.shippingCharges;
    		}
    		if(this.state.promoCode !== "NOT"){
    			gTotal = gTotal - this.state.promoDiscount;
    		}
    		return gTotal;
  }
  closePopup=()=>{
    document.querySelector("body").classList.remove("overFlowHidden");
    this.setState({
      editItem:null
    });
  }
  loadAllData=()=>{
    this.setState({
        data: dataCart.productsInCart
    });
  }

  componentDidMount(){
    this.props.showLoadingOverlay();
  }
  render(){
    console.log('this.state.data', this.state.data);
    return (
      <div className="shopingBagContainer">
        <h1 className="pageHeader">YOUR SHOPPING BAG</h1>
        <div className="mobileView noOfItemsContainer">
          <span className="headerText noOfItems">{this.state.data.length}</span>
          <span className="headerText"> ITEMS</span>
        </div>
        {this.state.data.length > 0 ?
          <div>
            <section className="itemsContainer">
              <div className="items_th">
                <div className="displaywidth6">
                  <span className="headerText noOfItems">{this.state.data.length}</span>
                  <span className="headerText"> ITEMS</span>
                </div>
                <div className="displaywidth1"><span className="headerText">SIZE</span></div>
                <div className="displaywidth1"><span className="headerText">QTY</span></div>
                <div className="displaywidth1"><span className="headerText">PRICE</span></div>
              </div>
              <ItemRow data={this.state.data} capitalizeFirstLetter={this.capitalizeFirstLetter} formatNumber={this.formatNumber} editItem_Fn={this.editItem_Fn} removeItem={this.removeItem} updateRow={this.updateRow}/>
  					</section>
  					<section className="totalContainer wbkitFlex">
  						<div className="helpContainer displaywidth1">
  							<div><span className="headerText helpTitle">Need help or have questions?</span></div>
  							<div><span className="headerText">Call Customer Service at <div>1-800-5555-5555</div></span></div>
  							<div><span className="headerText underlinedLink">Chat with one of out stylists</span></div>
  							<div><span className="headerText underlinedLink">See return &amp; exchange policy</span></div>
  						</div>
  						<div className="amountContainer displaywidth4">
  							<div className="promoCodeParent wbkitFlex">
  								<div className="displaywidth2">
  									<span className="headerText">ENTER PROMOTION CODE OR GIFT CARD</span>
  								</div>
  								<div className="displaywidth1 promocodeInputContainer">
  									<input className="qtyInput" type="text" ref="promoCode" maxLength="5" />
  									<input className="applyButton" type="button" value="Apply" onClick={this.applyPromoCode}/>
  								</div>
  							</div>
  							<div className="calculationContainer">
  								<div className="wbkitFlex">
  									<div className="displaywidth2">
  										<span className="headerText">SUBTOTAL</span>
  									</div>
  									<div className="displaywidth1 value">
  										<span className="headerText price"><sup>$</sup>{this.getTotal()}</span>
  									</div>
  								</div>
  								<div className="wbkitFlex">
  									<div className="displaywidth2">
  										<span className="headerText">PROMOTION CODE {this.state.promoCode} APPLIED</span>
  									</div>
  									<div className="displaywidth1 value">
  										{this.state.promoCode === "NOT" ?
  											<span className="headerText price"><sup>$</sup>-0.00</span> :
  											<span className="headerText price"><sup>$</sup>-{this.formatNumber(this.state.promoDiscount)}</span>
  										}
  									</div>
  								</div>
  								<div className="wbkitFlex">
  									<div className="displaywidth2">
  										<span className="headerText">ESTIMATED SHIPPING*</span>
  										{this.getTotal() > 50 ?
  											<div className="helpText">You qualify for free shipping because your order is over $50*</div> :
  											<div className="helpText">You do not qualify for free shipping because your order not is over $50*</div>
  										}
  										<span className="helpText"></span>
  									</div>
  									<div className="displaywidth1 value">
  										{this.getTotal() > 50 ?
  											<span className="headerText price">FREE</span> :
  											<span className="headerText price"><sup>$</sup>{this.formatNumber(this.state.shippingCharges)}</span>
  										}
  									</div>
  								</div>
  								<div className="wbkitFlex">
  									<div className="displaywidth2">
  										<span className="headerText">ESTIMATED TOTAL</span>
  										<div className="helpText">Tax will be applied during checkout</div>
  									</div>
  									<div className="displaywidth1 value">
  										<span className="headerText price"><sup>$</sup>{this.formatNumber(this.getGrandTotal())}</span>
  									</div>
  								</div>
  							</div>
  							<div className="checkoutContainer wbkitFlex">
  								<div className="displaywidth2"></div>
  								<div className="displaywidth1 checkoutInputContainer">
  									<span className="headerText underlinedLink">CONTINUE SHOPING</span>
  									<input className="checkOutButton" type="button" value="CHECKOUT"/>
  								</div>
  							</div>
  							<footer>
  								<img src={"./assets/lock.jpg"}></img>
  								<span className="headerText">Secure checkout. Shoping is always safe and secure</span>
  							</footer>
  						</div>
  					</section>
  				</div>
  			:
  				<div className="emptyBag">
                        <div> There are no items in the Bag. </div>
                        <input className="checkOutButton" type="button" value="CONTINUE SHOPING" onClick={this.loadAllData}/>
                        <div className="helpContainer displaywidth1">
                            <div><span className="headerText helpTitle">Need help or have questions?</span></div>
                            <div><span className="headerText">Call Customer Service at <div>1-800-5555-5555</div></span></div>
                            <div><span className="headerText underlinedLink">Chat with one of out stylists</span></div>
                            <div><span className="headerText underlinedLink">See return &amp; exchange policy</span></div>
                        </div>
                    </div>

  			}
  			{
  			!this.state.editItem === false?
  			    <OverLayComponent item={this.state.editItem} closePopup={this.closePopup} formatNumber={this.formatNumber} updateRow={this.updateRow}/>
  			:
  			    null
  			}
      			</div>
    );
  }

}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  showLoadingOverlay
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
