import React from "react"
import { DateRangePicker } from 'react-dates';
import moment from "moment"


class Calendar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            startDate: null,
            endDate: null,
        }
    }

    componentDidMount() {
        this.setState({startDate : this.props.startDate, endDate: this.props.endDate })
        console.log("im working bitch")
    }

    blockedDatesFromDb = this.props.space.dateReservedId

    blockDays = []
    
    setBlockDays = () => {
        this.blockedDatesFromDb.forEach( ({initialDate, finalDate}) => {
            const inDate = moment(initialDate,"YYYY-MM-DD")
            const finDate = moment(finalDate,"YYYY-MM-DD")
            this.blockDays.push(moment(JSON.parse(JSON.stringify(inDate))).format("YYYY-MM-DD"))
            let diffDates = finDate.diff(inDate, "days")
            diffDates = Math.abs(diffDates)
                for(let i = 0; i < diffDates; i++ ){
                    const date = inDate.add(1, "days")
                    const test = moment(JSON.parse(JSON.stringify(date))).format("YYYY-MM-DD")
                    this.blockDays.push(test)
                }
        })
    }
    

    isDayBlocked = (day) => this.blockDays.includes(moment(day).format("YYYY-MM-DD")) 

    render() {
        this.setBlockDays()
        return (
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    openDirection="down"
                    orientation="vertical"
                    anchorDirection="right" 
                    numberOfMonths={1}
                    verticalHeight={400}
                    isDayBlocked={this.isDayBlocked}
                    navPosition="navPositionBottom"
                    displayFormat="MMM D"
                    onClose={() => this.props.settingDates(this.state.startDate, this.state.endDate)}
                    />
        )
    }
}

export default Calendar