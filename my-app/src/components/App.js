import React from "react";
import Header from "./Header";
import Activities from "./Activities";

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            enteredActivity: '',
            activities: [],
        }
    } ;

    componentDidMount(){
       if(localStorage.activities){
           this.setState({
               activities: JSON.parse(localStorage.activities) || [],
           })
       }
  window.addEventListener('beforeunload', this.handleUpdateLocalStorage)
    }

    componentWillUnmount(){
          window.removeEventListener('beforeunload', this.handleUpdateLocalStorage);
    }

    handleUpdateLocalStorage =()=>{
      localStorage.setItem('activities',JSON.stringify(this.state.activities));  
    };

    handleChange =(response)=>{
        this.setState({
            enteredActivity: response,
        })
    }



    handleSubmit =(response)=>{
        response.preventDefault();

        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
            ];

        if(response.target[0].value !== ''){
               let data = {
                   id: Date.now(),
                   month:   months[(new Date()).getMonth()],
                   year: (new Date()).getFullYear(),
                   name: response.target[0].value,
                   selectedDates: [],
               }

            this.setState({
                activities: this.state.activities.concat(data),
                enteredActivity: '',
            })
        }
    }

    handleDelete = (response)=>{

            let filteredArr = this.state.activities.filter(elem=>{
                      return elem.id !== response;
            });

            this.setState({
                activities: filteredArr,
            })
    }

    handleSelectedDate = (activity, day)=>{
              
        let updatedActivityInd = this.state.activities.findIndex((elem)=>{
                return  elem.id === activity;
        });

        let updatedDays ;
          if(this.state.activities[updatedActivityInd].selectedDates.includes(day)){
              let ind = this.state.activities[updatedActivityInd].selectedDates.indexOf(day)
            updatedDays = this.state.activities[updatedActivityInd].selectedDates;
            updatedDays.splice(ind, 1)
          }else{
            updatedDays =  this.state.activities[updatedActivityInd].selectedDates.concat(day);
          }
        
      
         let updatedActivity ={
            id: this.state.activities[updatedActivityInd].id,
            month:   this.state.activities[updatedActivityInd].month,
            year:  this.state.activities[updatedActivityInd].year,
            name:  this.state.activities[updatedActivityInd].name,
            selectedDates:updatedDays,
        }
   

     let newActivities  =  this.state.activities.map(elem=>{
                   if(elem.id === activity){
                      return updatedActivity;
                   }
                   return elem;
        });


        this.setState({
            activities: newActivities,
        })
    }

    render(){

        return(
            <>
            <Header  key='header' enteredActivity={this.state.enteredActivity}
             handleChange={(response)=>this.handleChange(response)}
              handleSubmit={(response)=>this.handleSubmit(response)}/>

            <Activities  key='activities' activities={this.state.activities}
             handleDelete={(response)=>this.handleDelete(response)}
             handleSelectedDate={(activity, day)=>this.handleSelectedDate(activity, day)}/>
            </>
        );
    }
}

export default App;