import React from "react"
import { DateRangePicker } from 'react-dates';
import moment from "moment"


class Calendar extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    startDate = null
    endDate = null

    componentWillMount() {
        this.startDate = this.props.startDate
        this.endDate = this.props.endDate  
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
                    startDate={this.startDate} 
                    startDateId="start_date_id"
                    endDate={this.endDate} 
                    endDateId="end_date_id"
                    onDatesChange={({ startDate, endDate }) => {this.startDate = startDate ; this.endDate = endDate} } 
                    focusedInput={this.state.focusedInput} 
                    onFocusChange={focusedInput => this.setState({ focusedInput })} 
                    openDirection="down"
                    orientation="vertical"
                    anchorDirection="right" 
                    numberOfMonths={1}
                    verticalHeight={350}
                    isDayBlocked={this.isDayBlocked}
                    navPosition="navPositionBottom"
                    displayFormat="MMM D"
                    onClose={() => this.props.settingDates(this.startDate, this.endDate) } 
                />
        )
    }
}

export default Calendar