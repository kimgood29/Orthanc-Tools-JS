import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

import { connect } from 'react-redux'
import * as actions from '../actions/TableResult'


class TableResult extends Component {

    constructor(props) {
        super(props)
        this.removeRow = this.removeRow.bind(this)
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
        dataField: 'answerId',
        hidden: true
    }, {
        dataField: 'answerNumber',
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
        dataField: 'acquisitionDate',
        text: 'Acquistion Date',
        sort: true,
        filter: dateFilter()
    }, {
        dataField: 'studyDescription',
        text: 'Study Description',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'modalitiesInStudy',
        text: 'Modalities',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'sourceAet',
        text: 'AET',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'studyInstanceUid',
        hidden: true
    }, {
        dataField: 'retrive',
        text: 'Retrieve'
    }, {
        dataField: 'jobId',
        hidden: true
    }, {
        dataField: 'export',
        text: 'Export'
    }];



    render() {

        const { ExportCSVButton } = CSVExport;
        return (
            <ToolkitProvider
                keyField="key"
                data={this.props.results.results}
                columns={this.columns}
                exportCSV={{ onlyExportSelection: true, exportAll: true }}
            >{
                    props => (
                        <React.Fragment>
                            
                            <div className="jumbotron" style={this.props.style}>
                            <h1>Results : </h1>
                                <div>
                                    <ExportCSVButton {...props.csvProps} className="btn btn-primary">Export CSV</ExportCSVButton>
                                    <input type="button" className="btn btn-danger" value="Delete" onClick={this.removeRow} />
                                    <BootstrapTable ref={n => this.node = n} {...props.baseProps} filter={filterFactory()} selectRow={this.selectRow} pagination={paginationFactory()} />
                                </div>
                            </div>

                        </React.Fragment>
                    )
                }
            </ToolkitProvider>
        )
    }

}



const mapStateToProps = (state) => {
    return {
        results: state.ResultList
    }
}

export default connect(mapStateToProps, actions)(TableResult);