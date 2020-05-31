import React, { Component } from "react";
import { Container, FormGroup, Label, Input, Button, Form } from 'reactstrap';
import "./mfarow.css";

class MFA extends Component {

	constructor(props){
		super(props)
		this.state = {
			Registration: "",
			handshake: "",
			phone: "",
			status: "",
		};

		this.handleSMS = this.handleSMS.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleVerification = this.handleVerification.bind(this);
		this.handlePhone = this.handlePhone.bind(this);
	}

	handlePhone(event){
		this.setState({ phone: "57" + event.target.value })
	}

	handleSubmit(){}

	async handleSMS(event){
		this.setState({status: "Sending Text Message..."});
		let message = {
			number : this.state.phone,
			message : "Your code is " + this.state.Registration,
			subject : "Auth"
		};

		event.preventDefault();
		await fetch(`https://dhthfp9vze.execute-api.us-east-1.amazonaws.com/Dev`, {
			method : "POST",
			headers : {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(message)
		});
		this.setState({status: "Text Sent!"})
	}

	async handleVerification(event){
		this.setState({"status": ""});
		if(event.target.value.toString() === this.state.Registration.toString()){
			this.setState({handshake : "OK"})
		}
	}

	componentDidMount(){
		let Registration = Math.floor( 1000 + Math.random() * 9000 );
		this.setState ({Registration});
	}

	render() {
		return (
				<div>
					<Container className="col-4 offset-4 border mfarow bg-white">
						<div className="row">
							<div className="col-12">
								<Form onSubmit={this.handleSubmit}>
									<FormGroup>
										<div className="row">
											<div className="col-12">
												<Label for="phone">
													<h3 className="text-dark font-weight-bold">Enter your Phone</h3>
												</Label>
											</div>
											<div className="col-12">
												<Input
														type="phone"
														name="phone"
														id="phone"
														onChange = {this.handlePhone}
														required/>
											</div>
										</div>
									</FormGroup>
									<FormGroup>
										<div className="row">
											<div className="col-6">
												<Button
														className="btn btn-block btn-dark"
														onClick = {this.handleSMS}>
													Send Text
												</Button>
											</div>
											<div className="col-6">
												<Input
														type="Text"
														name="code"
														id="code"
														placeholder="Enter your code"
														onChange={this.handleVerification}
														required/>
											</div>
										</div>
									</FormGroup>
									<FormGroup>
										<div className="text-success">
											{
												this.state.handshake === "OK" ? "Your code is valid!" : ""
											}
										</div>
									</FormGroup>
									<h4 className="status-update">{this.state.status}</h4>
								</Form>
							</div>
						</div>
					</Container>
				</div>
		);
	}
}

export default MFA;