import React from 'react';
import T1 from '../../assets/T1.jpg';

export default class Row extends React.Component {

  updateRow=(obj, event)=>{
    let value = isNaN(parseInt(event.target.value)) ? 1 : parseInt(event.target.value);
    value = value < 1 ? 1 : value;
    this.props.updateRow(obj, value);
    console.log(value, " was inserted");
  }

  render(){
    let self = this;

      return(
          this.props.data.map(function(value,index){
            let url = "`../../assets/T"+(value.p_id) +".jpg`";
            return (
              <div className="items_tr">
      					<div className="displaywidth6 wbkitFlex">
      						<div className="displaywidth1 imgContainer">
      							<img src={url}></img>
      						</div>
      						<div className="displaywidth3">
      							<div className="itemDetailsContainer">
      								<div>
      									<span className="headerText itemTitle">{value.p_variation.toString().toUpperCase() + " "+value.p_name.toString().toUpperCase()}</span>
      								</div>
      								<div>
      									<span className="headerText">Style #: </span>
      									<span className="headerText">{value.p_style.toString().toUpperCase()}</span>
      								</div>
      								<div>
      									<span className="headerText">Colour: </span>
      									<span className="headerText colourText">{self.props.capitalizeFirstLetter(value.p_selected_color.name)}</span>
      								</div>
      								<div className="mobileView">
      									<span className="headerText">Size: </span>
      									<span className="headerText colourText">{value.p_selected_size.code.toString().toUpperCase()}</span>
      								</div>
      								<div className="mobileView quantity">
      									<span className="headerText">QTY: </span>
      									<input className="qtyInput" type="number"  min="1" max="10" value={value.p_quantity} onChange={self.updateRow.bind(null,value)}/>
      								</div>
      								<div className="mobileView priceContainer">
      									{(value.p_price === value.p_originalprice) ?
      											<span className="headerText price"><sup>{value.c_currency}</sup>{self.props.formatNumber(parseInt(value.p_quantity) * value.p_price)}</span>
      									:
      										<span>
      											<span className="headerText originalPrice"><sup>{value.c_currency}</sup>{self.props.formatNumber(parseInt(value.p_quantity) * parseInt(value.p_originalprice))}</span>
      											<span className="headerText price"><sup>{value.c_currency}</sup>{self.props.formatNumber(parseInt(value.p_quantity) * parseInt(value.p_price))}</span>
      										</span>
      									}
      								</div>
      							</div>
      							<ul className="actions">
      								<li className="headerText" onClick={self.props.editItem_Fn.bind(null,value)}>EDIT</li>
      								<li className="headerText" onClick={self.props.removeItem.bind(null,value)}>X REMOVE</li>
      								<li className="headerText" >SAVE FOR LATER</li>
      							</ul>
      						</div>
      					</div>
      					<div className="displaywidth1"><span className="headerText">{value.p_selected_size.code.toString().toUpperCase()}</span></div>
      					<div className="displaywidth1"><input className="qtyInput" type="number"  min="1" max="10" value={value.p_quantity} onChange={self.updateRow.bind(null,value)}/></div>
      					{(value.p_price === value.p_originalprice) ?
      						<div className="displaywidth1">
      							<span className="headerText price"><sup>{value.c_currency}</sup>{self.props.formatNumber(parseInt(value.p_quantity) * parseInt(value.p_price))}</span>
      						</div> :
      						<div className="displaywidth1">
      							<span className="headerText originalPrice"><sup>{value.c_currency}</sup>{self.props.formatNumber(parseInt(value.p_quantity) * parseInt(value.p_originalprice))}</span>
      							<span className="headerText price"><sup>{value.c_currency}</sup>{self.props.formatNumber(parseInt(value.p_quantity) * value.p_price)}</span>
      						</div>
      					}
      				</div>
            )
          })

      	);
        }
      }
