import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

import { connect } from 'react-redux'
import * as actions from '../actions/TableQuery'


class TableQuery extends Component {

  constructor(props) {
    super(props)
    this.removeRow = this.removeRow.bind(this)
    this.query = this.query.bind(this)
  }

  removeRow() {
    let selectedKeyRow = this.node.selectionContext.selected
    this.props.removeQuery(selectedKeyRow)
    this.node.selectionContext.selected = []

  }

  selectRow = {
    mode: 'checkbox',
    clickToSelect: true
  };

  columns = [{
    dataField: 'number',
    hidden: true
  }, {
    dataField: 'patientName',
    text: 'Patient Name',
    sort: true,
    filter: textFilter()
  }, {
    dataField: 'patientId',
    text: 'Patient ID',
    sort: true,
    filter: textFilter()
  }, {
    dataField: 'accessionNumber',
    text: 'Accession Number',
    sort: true,
    filter: textFilter()
  }, {
    dataField: 'dateFrom',
    text: 'Date From',
    sort: true,
    filter: dateFilter()
  }, {
    dataField: 'dateTo',
    text: 'Date To',
    sort: true,
    filter: dateFilter()
  }, {
    dataField: 'studyDescription',
    text: 'Study Description',
    sort: true,
    filter: textFilter()
  }, {
    dataField: 'modalities',
    text: 'Modality',
    sort: true,
    filter: textFilter()
  }, {
    dataField: 'aet',
    text: 'AET',
    sort: true,
    filter: textFilter()
  }];



  render() {

    const { ExportCSVButton } = CSVExport
    return (
      <ToolkitProvider
        keyField="key"
        data={this.props.queries.queries}
        columns={this.columns}
        exportCSV={{ onlyExportSelection: true, exportAll: true }}
      >{
          props => (
            <React.Fragment>
              <div className="jumbotron" style={this.props.style}>
                <div>
                  <ExportCSVButton {...props.csvProps} className="btn btn-primary">Export CSV</ExportCSVButton>
                  <input type="button" className="btn btn-danger" value="Delete" onClick={this.removeRow} />
                  <BootstrapTable ref={n => this.node = n} {...props.baseProps} filter={filterFactory()} selectRow={this.selectRow} pagination={paginationFactory()} />
                </div>
                <div className="text-center">
                  <input type="button" className="btn btn-primary" value="Query" onClick={this.query} />
                </div>
              </div>

            </React.Fragment>
          )
        }
      </ToolkitProvider>
    )
  }

  async query() {
    console.log(this.node.props.data)
    let data = this.node.props.data

    let answerArray = []
    for (const query of data) {
      let answeredResults = await this.makeAjaxQuery(query)
      console.log(answeredResults)
      answerArray.push(...answeredResults)
    }

    //SK ICI AJOUTER A LA TABLE RESULTATS

  }

  async makeAjaxQuery(queryParams) {


    let queryPost = {
      patientName: queryParams.patientName,
      patientID: queryParams.patientId,
      accessionNumber: queryParams.accessionNumber,
      date: queryParams.dateFrom + '-' + queryParams.dateTo,
      studyDescription: queryParams.studyDescription,
      modality: queryParams.modalities,
      aet: queryParams.aet
    }

    let response = await fetch("/query",
      {
        method: "POST",
        body: queryPost
      })

    let queryAnswers = []
    if (response.ok) {
      queryAnswers = await response.json()
    }

    return queryAnswers


  }

}



const mapStateToProps = (state) => {
  return {
    queries: state.QueryList
  }
}

export default connect(mapStateToProps, actions)(TableQuery);