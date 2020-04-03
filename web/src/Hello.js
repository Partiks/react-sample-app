import React from 'react';
import ReactDOM from 'react-dom';
import './Hello.css';
import axios from 'axios';

// First we create our class
class Hello extends React.Component {


    state = {
        name: '',
        greeting:'', 
		users: [],
	}

    // Then we add our constructor which receives our props
    constructor(props) {
        super(props);
        // Next we establish our state
        this.state = {
            name: '',
            greeting: `${this.props.time}`,
			users: [],
        }
        // To use the 'this' keyword, we need to bind it to our function
        this.onChange = this.onChange.bind(this);
    }

	componentDidMount(){
		axios.get('http://10.0.2.44:3000/users/').then( res =>{
			this.setState({ users: res.data }); 
		}).catch( (err) => {
			console.log(err);
		});
		console.log("USERS STATE: ", this.state.users);
	}

    // A custom function to change the name in our state to match the user input
    onChange(e) {
        this.setState({
            name: e.target.value
        })
    }
    // The render function, where we actually tell the browser what it should show
    render() {
        return (
            <div>
		<header className="Hello">
		<body className="Hello-body">
		
		<section>
			<p> Below values from Database!!! </p>
			<table>
				{
				this.state.users.map( function (user) {
					return (<div id="table-values"> 
								<tr>
									<td> Name: {user.name}</td>
								</tr>
								<tr>
									<td> Says: {user.says}</td>
								</tr>
								<tr> 
									<td>Status: {user.status}</td>
								</tr> <br />
							</div>)
				})
				}
			</table>

		</section>
                <section className="section">
                    <label className="label">Name: </label>
                    <input className="input" name="name" placeholder="Enter your name..." onChange={this.onChange} />
                </section>
                <section className="section">
                    <p> Hi {this.state.name}, {this.state.greeting}</p>
                </section>
		</body>
		</header>
            </div>
        )
    }
}



//ReactDOM.render(<Hello time="did you know time is a social construct? " />, document.getElementById('hello'));
export default Hello;
