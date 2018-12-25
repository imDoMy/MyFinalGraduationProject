import React, { Component } from 'react';
import { TextInput, Text } from 'react-native'
import { connect } from 'react-redux';

import {
	Card,
	 Section,
	  Button,
		 TextInputt,
		  Spinner,
			TextInputtE,
			CardSection
		 } from './common';
import { emailChanged, passwordChanged, loginUser, RegisterUser, onNameChange } from '../actions';

class Register extends Component {
	state={ error: '' }
language() {
	if (this.props.language === 'Arabic'){
		return (
			<Card>
				<Section>
					<TextInputt
					label="البريد الالكتروني"
						placeholder="البريد الالكتروني"
						onChangeText={this.onEmailChange.bind(this)}
						value={this.props.email}
					/>
				</Section>

				<Section>
					<TextInputt
						secureTextEntry
						label="كلمة المرور"
						placeholder="كلمة المرور"
						onChangeText={this.onPasswordChange.bind(this)}
						value={this.props.password}
					/>
				</Section>
				<Section>
					<TextInputt
						label="الاسم الكامل"
						placeholder="الاسم الكامل "
						onChangeText={this.onNameChange.bind(this)}
						value={this.props.fullname}
					/>
				</Section>
				<Text style={styles.errorTextStyle}>
					{this.props.error}
				</Text>
				<Text style={styles.errorTextStyle}>
					{this.state.error}
				</Text>

				<Section>
					{this.renderButton()}
				</Section>
			</Card>
		);
	}
	return (
		<Card>
			<Section>
				<TextInputtE
				label="email"
					placeholder="email@gmail.com"
					onChangeText={this.onEmailChange.bind(this)}
					value={this.props.email}
				/>
			</Section>

			<Section>
				<TextInputtE
					secureTextEntry
					label="Password"
					placeholder="password"
					onChangeText={this.onPasswordChange.bind(this)}
					value={this.props.password}
				/>
			</Section>

			<Section>
				<TextInputtE
					label="Full name"
					placeholder="Full name"
					onChangeText={this.onNameChange.bind(this)}
					value={this.props.fullname}
				/>
			</Section>

			<Text style={styles.errorTextStyle}>
				{this.props.error}
			</Text>

			<Text style={styles.errorTextStyle}>
				{this.state.error}
			</Text>

			<Section>
				{this.renderButton()}
			</Section>
		</Card>
	);
}
	onEmailChange(text) {
		this.setState({ error: '' })

	this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		this.setState({ error: '' })

this.props.passwordChanged(text);
}

onNameChange(text) {
	this.setState({ error: '' })
this.props.onNameChange(text);
}

		onButtonPress() {
			const { email, password, fullname } = this.props;
			if (fullname === '' || fullname === undefined || email === '' || email === undefined || password === '' || password === undefined) {
				if (this.props.language === 'Arabic') {
					this.setState({ error: 'يجب عليك تعبئة جميع الخانات' });
			} else {
				this.setState({ error: 'you have to fill all the fields' });
			}
			} else {
				this.props.RegisterUser({ email, password, fullname });
			}
		}

	  renderButton() {
	    if (this.props.loading) {
	      return <Spinner size="large" />;
	    }

			if(this.props.language === 'Arabic'){
				return (
					<Button whenPress={this.onButtonPress.bind(this)}>
	        التسجيل
	      </Button>
			)
			}
	    return (
				<Button whenPress={this.onButtonPress.bind(this)}>
	        Register
	      </Button>
	    );
	  }

	  render() {
	    return (
     this.language()
   );
	  }
	}

	const styles = {
	  errorTextStyle: {
	    fontSize: 20,
	    alignSelf: 'center',
	    color: 'red'
	  }
	};

	const mapStateToProps = (state) => {
		const language = state.language.Language;
	  const { email, password, error, loading, fullname } = state.auth;
console.log(language);
	  return { email, password, error, loading, language, fullname };
	};

	export default connect(mapStateToProps, {
	  emailChanged, passwordChanged, loginUser, RegisterUser, onNameChange
	})(Register);
