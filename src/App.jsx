import React from 'react'
import './App.css';

class App extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            langs: ["python", "javascript", "java", "kotlin"],
            stmts: [],
            data: {},
            lang: "all",
            stmt: "",
        }
    }

    async loadData(url){
        console.log(url)
        return fetch(url)
            .then((res) => res.json())
            .then((res) => this.setState({data: res}))
    }

    handleInputChange(e) {
        const val = e.target.value
        this.setState({stmt: val})
    }

    handleSelectChange(e) {
        this.setState({lang: e.target.value})
    }

    handleSerchClick() {
        this.loadData(`http://133.242.158.143:8000/api?lang=${this.state.lang}&stmt=${this.state.stmt}`)
    }

    render(){
        return(
            <div>
                <div>
                    <select onChange={this.handleSelectChange.bind(this)}>
                        <ViewOption langs={this.state.langs}/>
                    </select>
                </div>
                <div>
                    <input type="text" value={this.state.stmt} onChange={this.handleInputChange.bind(this)}/>
                    <button onClick={this.handleSerchClick.bind(this)}>
                        serch
                    </button>
                    <button onClick={() => {console.log(this.state.data)}}>
                        check
                    </button>
                </div>
                <div>
                    {`http://133.242.158.143:8000/api?lang=${this.state.lang}&stmt=${this.state.stmt}`}
                </div>
                <div>
                    code:<pre> {this.state.data.code}</pre>
                    result:<pre> {this.state.data.result}</pre>
                    sample:<pre> {this.state.data.sample}</pre>
                </div>
            </div>
        )
    }
}

const ViewOption = (props) => {
    return props.langs.map(data => {
        return <option value={data} >{data}</option>
    })
}


export default App;
