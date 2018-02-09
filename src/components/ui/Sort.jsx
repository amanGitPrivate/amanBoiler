import React from 'react';

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [
      {accountname:'foo', negotiatedcontractvalue:'bar'},
      {accountname:'monkey', negotiatedcontractvalue:'spank'},
      {accountname:'chicken', negotiatedcontractvalue:'dance'},
    ] };
    this.onSort = this.onSort.bind(this)
  }

  onSort(event, sortKey){
    /*
    assuming your data is something like
    [
      {accountname:'foo', negotiatedcontractvalue:'bar'},
      {accountname:'monkey', negotiatedcontractvalue:'spank'},
      {accountname:'chicken', negotiatedcontractvalue:'dance'},
    ]
    */
    const data = this.state.data;
    data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
    this.setState({data})
  }

  render() {
    var newdata = this.state.data;

    return (
      <table className="m-table">
        <thead>
          <tr>
            <th onClick={e => this.onSort(e, 'accountname')}>AccountName</th>
            <th onClick={e => this.onSort(e, 'negotiatedcontractvalue')}>ContractValue</th>
          </tr>
        </thead>
        <tbody>
          {newdata.map(function(account, index) {
            return (
              <tr key={index} data-item={account}>
                <td data-title="Account">{account.accountname}</td>
                <td data-title="Value">{account.negotiatedcontractvalue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default ParentComponent;
