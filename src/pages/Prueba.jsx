import React, { Component } from 'react';
import Stepper from '../components/stepper/Stepper'
import {ReactComponent as Pre} from '../assets/icons/preinscripcion.svg'


const steps = [{title: 'Stage - 1', component: <Pre/> , valid : true}, {title: 'Stage - 2', component: <Pre/>,valid : false} , {title: 'Stage - 3', component: <Pre/>,valid : false}]

export class prueba extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: 1,
        }
    }

    handleOnClickStepper = (step) => {
        this.setState({activeStep: step});
    }

    handleOnNextClick = () => {
        let nextStep = this.state.activeStep + 1;
        this.setState({activeStep: nextStep})
    }

    handleOnClickBack = () => {
        let prevStep = this.state.activeStep - 1;
        this.setState({activeStep:prevStep})
    }

    render(){
        return(
            <React.Fragment>
                <Stepper 
                    steps={steps} 
                    activeStep={this.state.activeStep}
                    onSelect={this.handleOnClickStepper}
                    showNumber={false}
                    
                    
                />
                <div style={{marginTop: '40px'}}>
                {this.state.activeStep === 1 ? <div> Hol amiguito {this.state.activeStep} </div> : 
                 this.state.activeStep === 2 ? <div> You are in Stage {this.state.activeStep} </div> :
                 <div> You are in Stage {this.state.activeStep} </div>
                }
                </div>
                <div style={{marginTop: '40px'}}>
                    <input type="button" value={this.state.activeStep === steps.length ? 'Finish' : 'Next'} 
                            onClick={this.state.activeStep === steps.length ? null : this.handleOnNextClick}/>
                    {this.state.activeStep ===1 ? '' : <input type="button" value="Back" onClick={this.handleOnClickBack} /> }
                </div>

                
            </React.Fragment>
        )
    }
}


export default prueba
