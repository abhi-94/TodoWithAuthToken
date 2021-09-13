import { useSelector } from 'react-redux'
import LoginInterfaces from '../Logintypes'
import Card from '../UI/Card'
let classes = require('./FilterTask.module.css')

const FilterTask: React.FC<{ Complete: number, Open: number }> = (props) => {
    const data = useSelector<LoginInterfaces.ReduserState, LoginInterfaces.ReduserState>(state => state)
    return (
        <Card cname={classes.main_block}>
            <section className={classes.summary}>
                <h2>Hello {data.Userdata?.firstname},</h2>
                <p>
                    Do Hard Work,
                </p>
                <p>
                    YOU CAN DO IT
                </p>
            </section>
            <div className={classes.main_sub_block}>
                <div className={classes.filter_block}>
                    <p className={classes.head}>Completed</p>
                    <p className={classes.content}>{props.Complete}</p>
                </div>
                <div className={classes.filter_block}>
                    <p className={classes.head}>Open</p>
                    <p className={classes.content}>{props.Open}</p>
                </div></div>
        </Card>
    )
}

export default FilterTask