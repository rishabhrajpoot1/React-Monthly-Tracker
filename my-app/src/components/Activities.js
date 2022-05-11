import React from "react";
import Tracker from "./Tracker";

class Activities extends React.Component{
    constructor(props){
    super(props);
    }

    render(){
        return(
            <>
            <div className='container'>
                {this.props.activities.map(act=>{
                    return(
                        <>
                       
                            <Tracker  key={act.id}  act={act} handleDelete={(response)=>this.props.handleDelete(response)} handleSelectedDate={(activity, day)=>this.props.handleSelectedDate(activity, day)}/>
                            
                        </>
                    );
                })}

                
        
            </div>
            </>
        );
    }
}

export default Activities;