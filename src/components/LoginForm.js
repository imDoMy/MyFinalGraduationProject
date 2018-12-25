import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Card, Button, Section, TextInputt, TextInputtE, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser, emailChangedLog } from '../actions';

class LoginForm extends Component {
	state={ error: '' };
	Language() {
		if (this.props.language === 'Arabic'){
			return(
			<Card>
				<Section>
					<TextInputt
					label="البريد الإلكتروني"
						placeholder="البريد الإلكتروني"
						onChangeText={this.onEmailChange.bind(this)}
						value={this.props.emaillog}
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

				<Text style={styles.errorTextStyle}>
					{this.er()}
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
		return(
			<Card>
				<Section>
					<TextInputtE
					label="Email"
						placeholder="email@gmail.com"
						onChangeText={this.onEmailChange.bind(this)}
						value={this.props.emaillog}
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

				<Text style={styles.errorTextStyle}>
					{this.er()}
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


	er(){
		if(this.props.error2 === undefined)
		return
		if(this.props.error2 !== ''){
			console.log(this.props.error2);

		return ('wrong email or password ');
	}
	}
	onEmailChange(text) {
		this.setState({ error: '' });
	    this.props.emailChangedLog(text);
	  }

	  onPasswordChange(text) {
			this.setState({ error: '' });
	    this.props.passwordChanged(text);
	  }

	  onButtonPress() {
	    const { emaillog, password } = this.props;

			if (emaillog === '' || password === '' || emaillog === undefined || password === undefined ) {
				if (this.props.language === 'Arabic') {
					this.setState({ error: 'يجب عليك تعبئة جميع الخانات' });
			} else {
				this.setState({ error: 'you have to fill all the fields' });
			}
			} else {


	    this.props.loginUser({ emaillog, password });
		}
	  }

	  renderButton() {
	    if (this.props.loading) {
	      return <Spinner size="large" />;
	    }

     if(this.props.language === 'Arabic'){
	    return (
	      <Button whenPress={this.onButtonPress.bind(this)}>
				تسجيل الدخول!
	      </Button>
	    );
		}
		return (
			<Button whenPress={this.onButtonPress.bind(this)}>
			Login
			</Button>
		);
	  }

	  render() {

	    return (
				this.Language()
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
	  const { email, password, error2, loading, emaillog } = state.auth;
		const language = state.language.Language;

	  return { language, email, password, error2, loading, emaillog };
	};

	export default connect(mapStateToProps, {
	  emailChanged, passwordChanged, loginUser, emailChangedLog
	})(LoginForm);
