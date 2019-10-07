import React, { Component } from "react";
import PropTypes from "prop-types";
import {Button, Container, Table, Confirm, Header, Divider, Grid, Input, Menu} from 'semantic-ui-react'

import CarEditForm from "./CarEditForm";


class CarsTable extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired
    };

    state = {
        openConfirm: false,
        confirmContent: '',
        carToRemove: '',
        data: [],
        loaded: false,
        formOpen: false,
        editCar: {},
        search: '',
        placeholder: "Loading..."
    }

    fetchData = (qStr = null) => {
        let url = this.props.endpoint;
        if (qStr) {
            url += "?license_plate="+qStr;
        }
        fetch(url)
            .then(response => {
                if (response.status !== 200) {
                    return this.setState({ placeholder: "Something went wrong" });
                }
                return response.json();
            })
            .then(data => this.setState({ data: data, loaded: true }));
    }

    componentDidMount() {
        this.fetchData();
    }

    handleCancelDelete = () => this.setState({ openConfirm: false, confirmContent:'', deviceToRemove: '' })

    handleRemoveCar = (e, { carid }) => {
        e.preventDefault();
        this.setState({
            openConfirm: true,
            confirmContent: "Are you sure that you want to remove car "+carid+"?",
            carToRemove: carid
        })
    }

    handleConfirmDelete = () => {
        if (this.state.carToRemove) {
            const conf = {
                method: "delete"
            };
            const endpoint = this.props.endpoint + this.state.carToRemove + "/";

            fetch(endpoint, conf)
                .then(response =>
                    // console.log(response)
                    window.location.reload(true)
                );
        }
    }

    openEditModal = (car) => {
        this.setState({
            formOpen: true,
            editCar: car
        });
    }

    closeEditModal = () => {
        this.setState({
            formOpen: false,
        });
    }

    handleSearchChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSearchReset = (e) => {
        e.preventDefault();
        this.setState({
            search: ''
        });

        this.fetchData();
    }

    handleSearchSubmit = (e) => {
        e.preventDefault();
        this.fetchData(this.state.search);
    }

    handleSearchKeyPress = (ev) => {
        if(ev.key === 'Enter') {
            this.handleSearchSubmit(ev);
        }
    }

    render() {
        const { openConfirm, confirmContent, loaded, placeholder, data, formOpen, editCar, search }  = this.state;

        if (!loaded) {
            return <p>{placeholder}</p>;
        }

        if (!data || !data.length) {
            return <p>Nothing to show</p>;
        }

        return <div>
            <Container>
              <Header dividing style={{marginTop: '15px'}} size='large'> Very simple fleet manager </Header>
              <Container>
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Fleet</Table.HeaderCell>
                            <Table.HeaderCell>Owner</Table.HeaderCell>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Model</Table.HeaderCell>
                            <Table.HeaderCell>License plate</Table.HeaderCell>
                            <Table.HeaderCell>Max passengers</Table.HeaderCell>
                            <Table.HeaderCell>Max payload</Table.HeaderCell>
                            <Table.HeaderCell>&nbsp;</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.map(car => (
                            <Table.Row key={car.id}>
                                {Object.entries(car).map((attribute, idx) => <Table.Cell onClick={() => window.location ="/details/"+car.id}
                                    key={idx}>{attribute[1]}</Table.Cell>)}
                                <Table.Cell>
                                    <Button carid={car.id} color="red" onClick={this.handleRemoveCar} size="tiny"
                                            icon="remove" style={{"marginLeft": "5px"}}/>
                                    &nbsp;
                                    <Button color="green"size="tiny" icon="edit" style={{"marginLeft": "5px"}}
                                            onClick={() => this.openEditModal(car)}/>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <Confirm
                    open={openConfirm}
                    content={confirmContent}
                    onCancel={this.handleCancelDelete}
                    onConfirm={this.handleConfirmDelete}
                />
            </Container>
            <Menu borderless>
                <Menu.Item>
                    <Input icon='car' iconPosition='left' type="text" name="search" value={search} placeholder="NY 1234" size="large" onChange={this.handleSearchChange} onKeyPress={this.handleSearchKeyPress} />
                </Menu.Item>
                <Menu.Item>
                    <Button primary onClick={this.handleSearchSubmit} icon="search" content='Search for license plates'/>
                </Menu.Item>
                <Menu.Item>
                    <Button primary onClick={this.handleSearchReset} icon="redo" content='Reset'/>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Button primary onClick={() => this.openEditModal({})}>Add new car</Button>
                </Menu.Item>
            </Menu>
            <CarEditForm endpoint="api/cars/"
                     key={""+editCar.id+formOpen}
                     car={editCar}
                     modalOpen={formOpen} closeModal={this.closeEditModal}
            />

            </Container>
        </div>
    }
}

export default CarsTable;