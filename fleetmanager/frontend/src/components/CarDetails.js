import React, { Component } from "react";
import {Button, Container, Table, Grid, Header, Divider, Input} from 'semantic-ui-react'
import Dygraph from 'dygraphs';


class CarDetails extends Component {
    state = {
        data: [],
        loaded: false,
        date: '',
        odometer: '',
        car_id: '',
        placeholder: "Loading..."
    }

    componentDidMount() {
        this.setState({
            car_id: this.props.match.params.id
        });
        fetch("/api/cars/"+this.props.match.params.id)
            .then(response => {
                if (response.status !== 200) {
                    return this.setState({ placeholder: "Something went wrong" });
                }
                return response.json();
            })
            .then(data => {
                this.setState({ data: data, loaded: true });
                this.drawGraph();
            });
    }

    handleChange = (e, { name, value }) => {
        const digit = /^-?[0-9]\d*\.?\d*$/;

        if (value == '' || digit.test(value)) {
            this.setState({ [name]: value });
        }
    }

    handleDateChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            errorMessage: '',
            loaderActive: true
        });

        const { car_id, odometer, date } = this.state;

        const mileage = { car:car_id, odometer, date };

        const conf = {
                method: "post",
                body: JSON.stringify(mileage),
                headers: new Headers({"Content-Type": "application/json"})
            };
        const endpoint = "/api/mileages/";
        fetch(endpoint, conf)
            .then(response =>
                // console.log(response)
                window.location.reload(true)
            );
    }

    drawGraph = () => {
        const data = Array.from(this.state.data.mileages, (ev => ([new Date(ev.date), Math.trunc(ev.odometer)])));
        new Dygraph(this.refs.chart, data, {
            labels: [ "Date", "miles" ]
        });
    }



    render() {
        const { loaded, placeholder, data, odometer, date }  = this.state;


        if (!loaded) {
            return <p>{placeholder}</p>;
        }

        if (!data) {
            return <p>Nothing to show</p>;
        }

        return <div>
            <Container>
                <Header dividing style={{marginTop: '15px'}} size='large'> Mileage history for car {data.license_plate} in fleet {data.fleet} </Header>
                <Container>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                                <Table.HeaderCell>Odometer reading</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {data.mileages.map(mileage => (
                                <Table.Row key={mileage.id}>
                                    {Object.entries(mileage).filter(attribute => attribute[0] !== 'car').map((attribute, idx) => <Table.Cell key={idx}>{attribute[1]}</Table.Cell>)}
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Container>
                <Divider/>

                <Grid>
                    <Grid.Column width={4}>
                        <Input label="Date" type="date" name="date" placeholder="dd.mm.yyyy" size="large"  onChange={this.handleDateChange} />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Input label="Mileage" type="text" name="odometer" size="large" value={odometer}  onChange={this.handleChange} />
                    </Grid.Column>
                    <Grid.Column width={4}>
                         <Button positive onClick={this.handleSubmit} icon="add square" content='Add odometer reading'/>
                    </Grid.Column>
                </Grid>

                <Divider style={{paddingBottom: '20px'}}/>

                <div ref="chart" style={{width: "100%"}}/>

                <Divider style={{paddingBottom: '20px', paddingTop: '20px'}}/>
                <Button onClick={() => window.location = "/"}>Go back to list of cars</Button>

            </Container>
        </div>
    }

}

export default CarDetails;