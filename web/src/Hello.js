import React from 'react';
import ReactDOM from 'react-dom';
import './Hello.css';
import axios from 'axios';

// First we create our class
class Hello extends React.Component {


    state = {
        name: '',
        greeting:'', 
	    data: [],
		users: [],
		users_list: []
	}

    // Then we add our constructor which receives our props
    constructor(props) {
        super(props);
        // Next we establish our state
        this.state = {
            name: '',
            greeting: `${this.props.time}`,
		    data: [],
			users: [],
			users_list: []
        }
        // To use the 'this' keyword, we need to bind it to our function
        this.onChange = this.onChange.bind(this);
    }

	componentDidMount(){
		axios.get('http://10.0.2.44:3000/users/').then( res => res.json()).then( (json) => {
			this.setState({data: json}).then( profileState => {
				console.log(JSON.stringify(this.state.data));
				// map users JSON data to parse in future
				this.state.users_list = profileState.data.map((user) => {
					return(
						<li key={user.name}>
							<h2>{user.name}</h2>
							<h3>{user.says}</h3>
							<h3>{user.status}</h3>
						</li>
					)
				})
			})
		});
		this.setState({users: this.state.users_list});
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
		
                <section className="section">
                    <label className="label">Name: </label>
                    <input className="input" name="name" placeholder="Enter your name..." onChange={this.onChange} />
                </section>
                <section className="section">
                    <p> Hi {this.state.name}, {this.state.greeting}</p>
                </section>
		<section>
			<p> Below values from Database!!! </p>
			<ul> {this.state.users} </ul>
		</section>
		</body>
		</header>
            </div>
        )
    }
}



//ReactDOM.render(<Hello time="did you know time is a social construct? " />, document.getElementById('hello'));
export default Hello;
