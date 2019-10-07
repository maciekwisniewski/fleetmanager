import React, { Component } from "react";
import PropTypes from "prop-types";
import {Form, Header, Modal, Button, Label} from "semantic-ui-react";

class CarEditForm extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired,
        modalOpen: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
        car: PropTypes.object
    };

    state = {
        modalOpen: this.props.modalOpen,
        car_id: this.props.car.id,
        fleet: this.props.car.fleet,
        owner: this.props.car.owner,
        car_type: this.props.car.car_type,
        model: this.props.car.model,
        license_plate: this.props.car.license_plate,
        max_passengers: this.props.car.max_passengers,
        max_payload: this.props.car.max_payload,
        errorMessage: '',
        loaderActive: false
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => {this.setState({ modalOpen: false }); this.props.closeModal()}

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleNumChange = (e, { name, value }) => {
        const digit = /^-?[0-9]\d*\.?\d*$/;

        if (value == '' || digit.test(value)) {
            this.setState({ [name]: value });
        }
    }


    handleChangeSelect = (e) => this.setState({ "car_type": e.target.value })

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            errorMessage: '',
            loaderActive: true
        });

        const { car_id, fleet, owner, car_type, model, license_plate, max_passengers, max_payload } = this.state;

        const car = { fleet, owner, car_type, model, license_plate, max_passengers, max_payload };

        let conf, endpoint;
        if (car_id !== null && car_id !== undefined) {
            conf = {
                method: "patch",
                body: JSON.stringify(car),
                headers: new Headers({"Content-Type": "application/json"})
            };
            endpoint = this.props.endpoint + car_id + "/";
        } else {
            conf = {
                method: "post",
                body: JSON.stringify(car),
                headers: new Headers({"Content-Type": "application/json"})
            };
            endpoint = this.props.endpoint;
        }
        fetch(endpoint, conf)
            .then(response =>
                // console.log(response)
                window.location.reload(true)
            );
    }


    render() {
        const { car_id, fleet, owner, errorMessage, modalOpen, loaderActive, car_type, model, license_plate, max_passengers, max_payload } = this.state;

        let saveButtonText = "Add";
        if (car_id !== null && car_id !== undefined) {
            saveButtonText = "Save"
        }

        const isEnabled =
            (fleet && fleet.trim().length > 0) &&
            (owner && owner.trim().length > 0) &&
            (model && model.trim().length > 0) &&
            (license_plate && license_plate.trim().length > 0) &&
            max_passengers != null &&
            max_payload != null
            ;

        return (
            <Modal
                open={modalOpen}
                onClose={this.handleClose}
                closeIcon
                as={Form}
            >
                <Header icon='car' content='Edit details' />

                { errorMessage && (<Modal.Content><Label basic color='red'>{ errorMessage }</Label></Modal.Content>) }

                <Modal.Content>
                    <Form.Input required label="Fleet" name='fleet' defaultValue={fleet}  onChange={this.handleChange} />
                    <Form.Input required label="Owner" name='owner' defaultValue={owner}  onChange={this.handleChange} />
                    <Form.Field required control='select' label='Type' value={car_type} name='selected_type' onChange={this.handleChangeSelect}>
                        <option value='VAN'> Van</option>
                        <option value='PICKUP'>Pickup</option>
                        <option value='TRUCK'>Truck</option>
                    </Form.Field>
                    <Form.Input required label="Model" name='model' defaultValue={model}  onChange={this.handleChange} />
                    <Form.Input required label="License plate" name='license_plate' defaultValue={license_plate}  onChange={this.handleChange} />
                    <Form.Input required label="Max passengers" name='max_passengers' value={max_passengers} onChange={this.handleNumChange} />
                    <Form.Input required label="Max payload" name='max_payload' value={max_payload}  onChange={this.handleNumChange} />

                </Modal.Content>
                <Modal.Actions>
                    <Button disabled={!isEnabled || loaderActive} loading={loaderActive} positive onClick={this.handleSubmit} icon="add square" content={saveButtonText}/>
                    <Button type='button' negative onClick={this.handleClose} icon="cancel" content="Cancel"/>
                </Modal.Actions>
            </Modal>
        )
    }

}

export default CarEditForm;