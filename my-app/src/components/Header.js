import React from "react";

class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
    return(
        <>
        <header>
            <h1><span>Track</span> Your Monthly Activity!</h1>
            <form className='flex justify-between align-center' onSubmit={(event)=>this.props.handleSubmit(event)}>
                <input value={this.props.enteredActivity} 
                onChange={(event)=>this.props.handleChange(event.target.value)}
                 placeholder='Enter Your Activity Here...'/>
                <button type='submit' className='btn btn-secondary'>Add Activity</button>
            </form>
        </header>
        </>
    );
    }
    }

    export default Header;