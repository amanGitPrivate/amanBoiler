import React from 'react';

export default class Layout extends React.Component {

  constructor(props){
    super(props);
    this.state={
      item: this.props.item,
      color: this.props.item.p_selected_color,
      qty: this.props.item.p_quantity,
      size: this.props.item.p_selected_size
    }
  }
		handleSizeChange=(event)=>{
		    var value = event.target.value;
		    console.log(value, " was selected");
		    this.setState({
		    	size: JSON.parse(event.target.value)
		    });
		}
		selectColor=(colorObj)=>{
			this.setState({
				color: colorObj
			});
		}
		changeQty=(event)=>{
		    var value = isNaN(parseInt(event.target.value)) ? 1 : parseInt(event.target.value);
		    value = value < 1 ? 1 : value;
		    console.log(value, " was inserted");
		    this.setState({
		    	qty: value
		    });
		}

  render(){
    let self = this;
    let {item} = this.props;
    let colorBlockGenerator = item.p_available_options.colors.map(function(value,index){
      let classString = value.name === self.state.color.name ? "colorBlock selected" : "colorBlock";
      return(
        <div className={classString} title={value.name} style={{backgroundColor:value.hexcode}} onClick={self.selectColor.bind(null,value)}></div>
      )
    });
    let sizeListGenerator = function(value){
        return <option key={value.name} value={JSON.stringify(value)}>
            {value.code}
              </option>;
    };
      return(
        <div className="overLay">
					<div className="popup">
						<div className="popUpCloseIcon" onClick={this.props.closePopup}>
							<img src={"./assets/close.png"}></img>
						</div>
						<div className="wbkitFlex">
							<div className="displaywidth1">
								<div className="itemDetailsContainer">
									<div>
										<span className="headerText itemTitle">{item.p_variation.toString().toUpperCase() + " "+item.p_name.toString().toUpperCase()}</span>
									</div>
									<div className="priceContainer">
										{(item.p_price === item.p_originalprice) ?
												<span className="headerText price"><sup>{item.c_currency}</sup>{this.props.formatNumber(item.p_price)}</span>
										:
											<span>
												<span className="headerText originalPrice"><sup>{item.c_currency}</sup>{item.p_originalprice.toFixed(2)}</span>
												<span className="headerText price"><sup>{item.c_currency}</sup>{this.props.formatNumber(item.p_price)}</span>
											</span>
										}
									</div>
									<div>
										<span className="headerText">{self.state.color.name.toUpperCase()}</span>
									</div>
									<div className="colorContainer">
										{colorBlockGenerator}
									</div>
									<div className="sizeOverlay">
										<span className="headerText">Size: </span>
										<select value={JSON.stringify(this.state.size)} onChange={this.handleSizeChange}>
											{item.p_available_options.sizes.map(sizeListGenerator)}
										</select>
									</div>
									<div className="quantity quantityOverlay">
										<span className="headerText">QTY: </span>
										<input className="qtyInput" type="number"  min="1" max="10" value={this.state.qty} onChange={this.changeQty}/>
									</div>
									<div className="checkoutContainer wbkitFlex">
										<div className="displaywidth1 checkoutInputContainer">
											<input className="checkOutButton" type="button" value="SAVE" onClick={this.props.updateRow.bind(null, this.state.item, this.state.qty, this.state.color, this.state.size)}/>
										</div>
									</div>
									<div className="headerText underShoppingBagLink">See product details</div>
								</div>
							</div>
							<div className="displaywidth1 imgContainer">
								<img src={"./assets/T"+(item.p_id) +".jpg"}></img>
							</div>
						</div>
					</div>
				</div>
      	);
        }
      }
